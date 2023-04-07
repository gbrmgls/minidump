import WorkspaceDTO from "../../_Common/DTOs/WorkspaceDTO";
import WorkspaceInteractor from "../../2_Business/Interactors/WorkspaceInteractor";
import UIActions from "../Actions/UIActions";
import WorkspaceActions from "../Actions/WorkspaceActions";
import Dispatcher from "../Dispatcher";
import NoteStore from "./NoteStore";
import NoteActions from "../Actions/NoteActions";
import TagActions from "../Actions/TagActions";

class WorkspaceStore {
  // Singleton pattern logic
  private static instance: WorkspaceStore;
  private constructor() {}

  public static getInstance() {
    if (!WorkspaceStore.instance) {
      WorkspaceStore.instance = new WorkspaceStore();
    }
    return WorkspaceStore.instance;
  }
  // ----------

  // Observer pattern logic
  private subscriptions: any = [];

  public subscribe(subscriber: any) {
    this.subscriptions.push(subscriber);
  }

  public unsubscribe(subscriber: any) {
    this.subscriptions = this.subscriptions.filter(
      (subscription: any) => subscription !== subscriber
    );
  }

  public dispatch(action: any) {
    this.subscriptions.map((subscription: any) => {
      subscription(action);
    });
  }
  // ----------

  private workspaces: WorkspaceDTO[] = [];

  private actions: any = {
    REFRESH_WORKSPACES_STATE: async () => {
      this.workspaces = await WorkspaceInteractor.getWorkspaces();
      if (
        this.workspaces.filter((workspace) => workspace.getOpen()).length == 0
      ) {
        UIActions.closeOverlay();
      } else {
        UIActions.openOverlay();
      }
    },

    GET_WORKSPACES: async ({ options }: any) => {
      this.workspaces = await WorkspaceInteractor.getWorkspaces(options);
    },

    CREATE_WORKSPACE: async ({ workspace }: any) => {
      await WorkspaceInteractor.createWorkspace(workspace);
      WorkspaceActions.refreshState();
    },

    DELETE_WORKSPACE: async ({ id }: any) => {
      await WorkspaceInteractor.deleteWorkspace(id);
      this.workspaces = await WorkspaceInteractor.getWorkspaces();
      WorkspaceActions.refreshState();
    },

    UPDATE_WORKSPACE: async ({ id, workspace }: any) => {
      await WorkspaceInteractor.updateWorkspace(id, workspace);
      WorkspaceActions.refreshState();
    },

    SWAP_WORKSPACES_INDEXES: async ({ index1, index2 }: any) => {
      await WorkspaceInteractor.swapWorkspacesIndexes(index1, index2);
      WorkspaceActions.refreshState();
    },

    OPEN_NOTES: async ({ notesIds, workspaceId }: any) => {
      await WorkspaceInteractor.openNotes(notesIds, workspaceId);
      WorkspaceActions.refreshState();
    },

    OPEN_NOTES_IN_NEW_WORKSPACE: async ({ notesIds }: any) => {
      await WorkspaceInteractor.openNotesInNewWorkspace(notesIds);
      WorkspaceActions.refreshState();
    },

    CLOSE_NOTES: async ({ notesIds, workspaceId }: any) => {
      await WorkspaceInteractor.closeNotes(notesIds, workspaceId);
      this.workspaces = await WorkspaceInteractor.getWorkspaces();

      WorkspaceActions.refreshState();
    },

    FOCUS_ON_NOTE: async ({ noteId, workspaceId }: any) => {
      await WorkspaceInteractor.focusOnNote(noteId, workspaceId);
      WorkspaceActions.refreshState();
    },

    OPEN_WORKSPACES: async ({ ids }: any) => {
      await WorkspaceInteractor.openWorkspaces(ids);
      NoteActions.refreshState();
      WorkspaceActions.refreshState();
    },

    CLOSE_WORKSPACES: async ({ ids }: any) => {
      await WorkspaceInteractor.closeWorkspaces(ids);
      this.workspaces = await WorkspaceInteractor.getWorkspaces();
      WorkspaceActions.refreshState();
    },
  };

  public actionHandler = async (action: any) => {
    if (Object.keys(this.actions).includes(action.name)) {
      await this.actions[action.name]({ ...action.params });

      this.subscriptions.map((subscription: any) => {
        subscription([...this.workspaces]);
      });
    }
  };
}

const workspaceStore = WorkspaceStore.getInstance();
Dispatcher.subscribe(workspaceStore.actionHandler);
WorkspaceInteractor.subscribe(WorkspaceActions.refreshState);

export default workspaceStore;
