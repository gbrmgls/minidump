import IWorkspaceDAO from "../IDAOs/IWorkspaceDAO";
import PouchDBClient from "../../../4_Infrastructure/PouchDBClient";
import WorkspaceDTO from "../../../_Common/DTOs/WorkspaceDTO";

class WorkspacePouchDBDAO implements IWorkspaceDAO {
  public async subscribe(callback: any): Promise<any> {
    return PouchDBClient.subscribe(callback);
  }

  public async getWorkspaces(options?: {
    page: number;
    ammount: number;
    filter: {
      and: {
        ids: string[];
        name: string;
        open: boolean;
        notes: string[];
      };
      or: {
        ids: string[];
        name: string;
        open: boolean;
        notes: string[];
      };
    };
  }): Promise<WorkspaceDTO[]> {
    const { page = 1, ammount = 50, filter = {} } = options ?? {};
    let workspaceDTOList: WorkspaceDTO[] = [];

    let orList: any = [];
    let andList: any = [];

    // Build PouchDB filters
    if (Object.keys(filter).length > 0) {
      // AND filters
      if ("and" in filter) {
        let and: any = filter.and;
        // Id AND filter
        if ("ids" in and && and.ids.length > 0) {
          andList.push(
            ...and.ids.map((id: string) => {
              return {
                _id: id,
              };
            })
          );
        }

        // Tag AND filter
        if ("notes" in and && and.notes.length > 0) {
          andList.push({
            notes: {
              $in: and.notes,
            },
          });
        }

        // Name AND filter
        if ("name" in and) {
          andList.push({
            name: {
              $regex: new RegExp(and.name, "i"),
            },
          });
        }

        // Open AND filter
        if ("open" in and) {
          andList.push({
            open: and.open,
          });
        }
      }

      // OR filters
      if ("or" in filter) {
        let or: any = filter.or;
        // Id OR filter
        if ("ids" in or && or.ids.length > 0) {
          orList.push(
            ...or.ids.map((id: string) => {
              return {
                _id: id,
              };
            })
          );
        }

        // Tag OR filter
        if ("notes" in or && or.notes.length > 0) {
          orList.push({
            notes: {
              $in: or.notes,
            },
          });
        }

        // Name OR filter
        if ("name" in or) {
          orList.push({
            name: {
              $regex: new RegExp(or.name, "i"),
            },
          });
        }

        // Open OR filter
        if ("open" in or) {
          orList.push({
            open: or.open,
          });
        }
      }
    }

    // Add all to selector
    let DBSelector = {
      type: "workspace",
      $or: orList,
      $and: andList,
    };

    // Delete empty filters
    Object.entries(DBSelector).map(([key, value]) => {
      if (value.length == 0) {
        delete DBSelector[key as keyof typeof DBSelector];
      }
    });

    // Run DB query
    let DBWorkspaceList = (
      await PouchDBClient.db.find({
        selector: DBSelector,
      })
    ).docs;

    DBWorkspaceList?.map(async (workspace: any) =>
      workspaceDTOList.push(
        new WorkspaceDTO(
          workspace._id,
          workspace.index,
          workspace.name,
          workspace.notes,
          workspace.focusedNote,
          workspace.open,
          workspace.createdAt,
          workspace.updatedAt
        )
      )
    );

    return workspaceDTOList;
  }

  public async createWorkspace(workspace: WorkspaceDTO): Promise<WorkspaceDTO> {
    const data = {
      _id: crypto.randomUUID(),
      type: "workspace",
      index: (await PouchDBClient.getLastIndex("workspaces")) + 1,
      name: workspace.getName(),
      notes: workspace.getNotes(),
      focusedNote: workspace.getFocusedNote(),
      open: workspace.getOpen(),
      createdAt: new Date().getTime().toString(),
      updatedAt: new Date().getTime().toString(),
    };

    PouchDBClient.setLastIndex("workspaces");

    let DBNewWorkspace = await PouchDBClient.db.get(
      (
        await PouchDBClient.db.put(data)
      ).id
    );

    let newWorkspaceDTO = new WorkspaceDTO(
      DBNewWorkspace._id,
      DBNewWorkspace.index,
      DBNewWorkspace.name,
      DBNewWorkspace.notes,
      DBNewWorkspace.focusedNote,
      DBNewWorkspace.open,
      DBNewWorkspace.createdAt,
      DBNewWorkspace.updatedAt
    );

    return newWorkspaceDTO;
  }

  public async deleteWorkspace(id: string): Promise<boolean> {
    let deletedSuccessfully = false;
    deletedSuccessfully = await PouchDBClient.db.remove(
      await PouchDBClient.db.get(id)
    )?.ok;

    return deletedSuccessfully;
  }

  public async updateWorkspace(
    id: string,
    workspace: WorkspaceDTO
  ): Promise<WorkspaceDTO> {
    let DBOldWorkspace = await PouchDBClient.db.get(id);

    const data = {
      _id: DBOldWorkspace._id,
      _rev: DBOldWorkspace._rev,
      type: "workspace",
      index: DBOldWorkspace.index,
      name: workspace.getName(),
      notes: workspace.getNotes(),
      focusedNote: workspace.getFocusedNote(),
      open: workspace.getOpen(),
      createdAt: DBOldWorkspace.createdAt,
      updatedAt: new Date().getTime().toString(),
    };

    let DBUpdatedWorkspace = await PouchDBClient.db.get(
      (
        await PouchDBClient.db.put(data)
      ).id
    );

    let updatedWorkspaceDTO = new WorkspaceDTO(
      DBUpdatedWorkspace._id,
      DBUpdatedWorkspace.index,
      DBUpdatedWorkspace.name,
      DBUpdatedWorkspace.notes,
      DBUpdatedWorkspace.focusedNote,
      DBUpdatedWorkspace.open,
      DBUpdatedWorkspace.createdAt,
      DBUpdatedWorkspace.updatedAt
    );

    return updatedWorkspaceDTO;
  }

  public async swapWorkspacesIndex(
    index1: number,
    index2: number
  ): Promise<WorkspaceDTO[]> {
    throw new Error("Method not implemented.");
  }
}

export default new WorkspacePouchDBDAO();
