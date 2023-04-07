import WorkspaceDTO from "../../_Common/DTOs/WorkspaceDTO";
import Dispatcher from "../Dispatcher";

class Workspace {
  public refreshState() {
    Dispatcher.dispatch({
      name: "REFRESH_WORKSPACES_STATE",
      params: {},
    });
  }

  public getWorkspaces(options?: {}) {
    Dispatcher.dispatch({
      name: "GET_WORKSPACES",
      params: {
        options,
      },
    });
  }

  public createWorkspace(workspace?: WorkspaceDTO) {
    Dispatcher.dispatch({
      name: "CREATE_WORKSPACE",
      params: {
        workspace,
      },
    });
  }

  public deleteWorkspace(id: string) {
    Dispatcher.dispatch({
      name: "DELETE_WORKSPACE",
      params: {
        id: id,
      },
    });
  }

  public updateWorkspace(id: string, workspace: WorkspaceDTO) {
    Dispatcher.dispatch({
      name: "UPDATE_WORKSPACE",
      params: {
        id: id,
        workspace,
      },
    });
  }

  public swapWorkspacesIndexes(index1: number, index2: number) {
    Dispatcher.dispatch({
      name: "SWAP_WORKSPACES_INDEXES",
      params: {
        index1,
        index2,
      },
    });
  }

  public openNotes(notesIds: string[], workspaceId?: string) {
    Dispatcher.dispatch({
      name: "OPEN_NOTES",
      params: {
        notesIds,
        workspaceId,
      },
    });
  }

  public openNotesInNewWorkspace(notesIds: string[]) {
    Dispatcher.dispatch({
      name: "OPEN_NOTES_IN_NEW_WORKSPACE",
      params: {
        notesIds,
      },
    });
  }

  public closeNotes(notesIds: string[], workspaceId?: string) {
    Dispatcher.dispatch({
      name: "CLOSE_NOTES",
      params: {
        notesIds,
        workspaceId,
      },
    });
  }

  public focusOnNote(noteId: string, workspaceId: string) {
    Dispatcher.dispatch({
      name: "FOCUS_ON_NOTE",
      params: {
        noteId,
        workspaceId,
      },
    });
  }

  public openWorkspaces(ids: string[]) {
    Dispatcher.dispatch({
      name: "OPEN_WORKSPACES",
      params: {
        ids,
      },
    });
  }

  public closeWorkspaces(ids: string[]) {
    Dispatcher.dispatch({
      name: "CLOSE_WORKSPACES",
      params: {
        ids,
      },
    });
  }
}

export default new Workspace();
