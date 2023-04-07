import TagDTO from "../../_Common/DTOs/TagDTO";
import NoteActions from "../Actions/NoteActions";
import TagActions from "../Actions/TagActions";
import WorkspaceActions from "../Actions/WorkspaceActions";
import Dispatcher from "../Dispatcher";

class UIStore {
  // Singleton logic
  private static instance: UIStore;
  private constructor() {}

  public static getInstance() {
    if (!UIStore.instance) {
      UIStore.instance = new UIStore();
    }
    return UIStore.instance;
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

  private UIState: any = {
    overlayOpen: false,
    sidebarOpen: false,
    searchingTags: [],
    selectedNotes: [],
  };

  private actions: any = {
    OPEN_OVERLAY: async ({}) => {
      this.UIState.overlayOpen = true;
    },

    CLOSE_OVERLAY: async ({}) => {
      this.UIState.overlayOpen = false;
    },

    TOGGLE_OVERLAY: async ({}) => {
      this.UIState.overlayOpen = !this.UIState.overlayOpen;
    },

    OPEN_SIDEBAR: async ({}) => {
      this.UIState.sidebarOpen = true;
    },

    CLOSE_SIDEBAR: async ({}) => {
      this.UIState.sidebarOpen = false;
    },

    TOGGLE_SIDEBAR: async ({}) => {
      this.UIState.sidebarOpen = !this.UIState.sidebarOpen;
    },

    ADD_SEARCHING_TAG: async ({ id }: any) => {
      if (!this.UIState.searchingTags.includes(id)) {
        this.UIState.searchingTags.push(id);
      }
    },

    REMOVE_SEARCHING_TAG: async ({ id }: any) => {
      this.UIState.searchingTags = this.UIState.searchingTags.filter(
        (includedTagId: string) => includedTagId != id
      );
    },

    CLEAR_SEARCHING_TAGS: async ({}) => {
      this.UIState.selectedNotes = [];
    },

    ADD_SELECTED_NOTE: async ({ id }: any) => {
      if (!this.UIState.selectedNotes.includes(id)) {
        this.UIState.selectedNotes.push(id);
      }
    },

    REMOVE_SELECTED_NOTE: async ({ id }: any) => {
      this.UIState.selectedNotes = this.UIState.selectedNotes.filter(
        (includedNoteId: string) => includedNoteId != id
      );
    },

    CLEAR_SELECTED_NOTES: async ({}) => {
      this.UIState.selectedNotes = [];
    },
  };

  public actionHandler = async (action: any) => {
    if (Object.keys(this.actions).includes(action.name)) {
      await this.actions[action.name]({ ...action.params });

      this.subscriptions.map((subscription: any) => {
        subscription({ ...this.UIState });
      });
    }
  };
}

const uiStore = UIStore.getInstance();
Dispatcher.subscribe(uiStore.actionHandler);

export default uiStore;
