import WorkspaceDTO from "../../_Common/DTOs/WorkspaceDTO";
import WorkspaceEntity from "../Entities/WorkspaceEntity";
import IWorkspaceInteractor from "./IInteractors/IWorkspaceInteractor";
import WorkspaceService from "../../3_DataAccess/Services/WorkspaceService";

class WorkspaceInteractor implements IWorkspaceInteractor {
  async subscribe(callback: any): Promise<any> {
    return await WorkspaceService.subscribe(callback);
  }

  async getWorkspaces(options?: {}): Promise<WorkspaceDTO[]> {
    return await WorkspaceService.getWorkspaces(options);
  }

  async createWorkspace(workspace: WorkspaceDTO): Promise<WorkspaceDTO> {
    return await WorkspaceService.createWorkspace(
      workspace ?? new WorkspaceEntity().toDTO()
    );
  }

  async deleteWorkspace(id: string): Promise<boolean> {
    return await WorkspaceService.deleteWorkspace(id);
  }

  async updateWorkspace(
    id: string,
    workspace: WorkspaceDTO
  ): Promise<WorkspaceDTO> {
    if (workspace.getName().split(" ").length > 1) {
      throw new Error("Workspace name cannot contain spaces");
    } else if (workspace.getName().length > 15) {
      throw new Error("Workspace name cannot have more than 15 characters");
    }
    return await WorkspaceService.updateWorkspace(id, workspace);
  }

  async swapWorkspacesIndexes(
    index1: number,
    index2: number
  ): Promise<WorkspaceDTO[]> {
    return await WorkspaceService.swapWorkspacesIndexes(index1, index2);
  }

  async openNotes(
    notesIds: string[],
    workspaceId?: string
  ): Promise<WorkspaceDTO> {
    let workspace: any = {};

    // If workspaceId exists, fetch note workspace with workspaceId and open the note in it
    if (workspaceId) {
      workspace = WorkspaceEntity.fromDTO(
        (
          await this.getWorkspaces({
            filter: { or: { ids: [workspaceId] } },
          })
        )[0]
      );
    } else {
      // If there is no note workspace with workspaceId, fetch all open workspaces
      let openWorkspaces = (
        await this.getWorkspaces({ filter: { or: { open: true } } })
      ).map((workspace) => WorkspaceEntity.fromDTO(workspace));

      // If there is any open note workspace, use the first one
      if (openWorkspaces.length > 0) {
        workspace = openWorkspaces[0];
      } else {
        // If there is no open note workspace, get any note workspace
        let workspaces = (await this.getWorkspaces()).map((workspace) =>
          WorkspaceEntity.fromDTO(workspace)
        );

        // If there is any note workspace, use the first one
        if (workspaces.length > 0) {
          workspace = workspaces[0];
        }

        // If there is no note workspace, create a new one
        if (openWorkspaces.length == 0 && workspaces.length == 0) {
          workspace = WorkspaceEntity.fromDTO(
            await this.createWorkspace(new WorkspaceEntity().toDTO())
          );
        }
      }
    }

    // Open note in note workspace if not open already
    let newNotes = notesIds.filter(
      (noteId: string) => !workspace.getNotes().includes(noteId)
    );

    workspace.setNotes([...workspace.getNotes(), ...newNotes]);
    workspace.setFocusedNote(notesIds[0]);
    workspace.setOpen(true);

    return await this.updateWorkspace(workspace.getId(), workspace);
  }

  async openNotesInNewWorkspace(notesIds: string[]): Promise<WorkspaceDTO> {
    let workspace: any = WorkspaceEntity.fromDTO(
      await this.createWorkspace(new WorkspaceEntity().toDTO())
    );

    // Open note in note workspace if not open already
    let newNotes = notesIds.filter(
      (noteId: string) => !workspace.getNotes().includes(noteId)
    );

    workspace.setNotes([...workspace.getNotes(), ...newNotes]);
    workspace.setFocusedNote(notesIds[0]);
    workspace.setOpen(true);

    return await this.updateWorkspace(workspace.getId(), workspace);
  }

  async closeNotes(notesIds: string[], workspaceId?: string): Promise<boolean> {
    let closedWorkspaceSuccessfully: boolean = false;

    if (workspaceId) {
      // If workspaceId exists, close noteId in note workspace with workspaceId
      let workspaceWithId = WorkspaceEntity.fromDTO(
        (
          await this.getWorkspaces({
            filter: { or: { ids: [workspaceId] } },
          })
        )[0]
      );

      workspaceWithId.removeNotes(notesIds);

      if (workspaceWithId.getNotes().length == 0) {
        // If note workspace has no notes, delete it

        closedWorkspaceSuccessfully = await this.deleteWorkspace(
          workspaceWithId.getId()
        );
      } else {
        // If note workspace has notes and focused note was deleted, change focused note and update it
        if (notesIds.includes(workspaceWithId.getFocusedNote())) {
          workspaceWithId.setFocusedNote(workspaceWithId.getNotes()[0]);
        }

        let workspaceWithoutNote = await this.updateWorkspace(
          workspaceWithId.getId(),
          workspaceWithId.toDTO()
        );

        if (workspaceWithoutNote) {
          closedWorkspaceSuccessfully = true;
        }
      }
    } else {
      // If workspaceId doesnt exist, close note in all note workspaces that contains noteId
      let workspacesWithNoteOpen = (
        await this.getWorkspaces({
          filter: { or: { notes: notesIds } },
        })
      ).map((workspace) => WorkspaceEntity.fromDTO(workspace));
      await Promise.all(
        // For all note workspaces that contains noteId, close noteId
        workspacesWithNoteOpen.map(async (workspace: any) => {
          workspace.removeNotes(notesIds);

          if (workspace.getNotes().length == 0) {
            // If note workspace has no notes, delete it
            closedWorkspaceSuccessfully = await this.deleteWorkspace(
              workspace.getId()
            );
          } else {
            // If note workspace has notes and focused note was deleted, change focused note and update it
            if (notesIds.includes(workspace.getFocusedNote())) {
              workspace.setFocusedNote(workspace.getNotes()[0]);
            }

            let workspaceWithoutNote = await this.updateWorkspace(
              workspace.getId(),
              workspace
            );

            if (workspaceWithoutNote) {
              closedWorkspaceSuccessfully = true;
            } else {
              closedWorkspaceSuccessfully = false;
            }
          }
        })
      );
    }

    return closedWorkspaceSuccessfully;
  }

  async focusOnNote(
    noteId: string,
    workspaceId: string
  ): Promise<WorkspaceDTO> {
    let workspace: WorkspaceEntity = WorkspaceEntity.fromDTO(
      (
        await this.getWorkspaces({
          filter: { or: { ids: [workspaceId] } },
        })
      )[0]
    );

    if (!(workspace.getFocusedNote() == noteId)) {
      workspace.setFocusedNote(noteId);
    }

    return await this.updateWorkspace(workspace.getId(), workspace.toDTO());
  }

  async openWorkspaces(ids: string[]): Promise<WorkspaceDTO[]> {
    let workspaceList: WorkspaceEntity[] = (
      await this.getWorkspaces({ filter: { or: { ids: ids } } })
    ).map((workspace) => WorkspaceEntity.fromDTO(workspace));

    workspaceList.map((workspace) => workspace.setOpen(true));

    return await Promise.all(
      workspaceList.map(
        async (workspace) =>
          await this.updateWorkspace(workspace.getId(), workspace.toDTO())
      )
    );
  }

  async closeWorkspaces(ids: string[]): Promise<WorkspaceDTO[]> {
    let workspaces: WorkspaceEntity[] = (
      await this.getWorkspaces({ filter: { or: { ids: ids } } })
    ).map((workspace) => WorkspaceEntity.fromDTO(workspace));

    workspaces.map((workspace) => workspace.setOpen(false));

    let closedWorkspaceDTOList: WorkspaceDTO[] = [];

    for (let workspaceIndex in workspaces) {
      closedWorkspaceDTOList.push(
        await this.updateWorkspace(
          workspaces[workspaceIndex].getId(),
          workspaces[workspaceIndex].toDTO()
        )
      );
    }

    return closedWorkspaceDTOList;
  }
}

export default new WorkspaceInteractor();
