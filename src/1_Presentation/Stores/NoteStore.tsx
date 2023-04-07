import NoteDTO from "../../_Common/DTOs/NoteDTO";
import Dispatcher from "../Dispatcher";
import NoteInteractor from "../../2_Business/Interactors/NoteInteractor";
import WorkspaceActions from "../Actions/WorkspaceActions";
import NoteActions from "../Actions/NoteActions";
import TagInteractor from "../../2_Business/Interactors/TagInteractor";
import TagActions from "../Actions/TagActions";
import UIActions from "../Actions/UIActions";

class NoteStore {
  // Singleton pattern logic
  private static instance: NoteStore;
  private constructor() {}

  public static getInstance() {
    if (!NoteStore.instance) {
      NoteStore.instance = new NoteStore();
    }
    return NoteStore.instance;
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

  private notes: NoteDTO[] = [];

  private actions: any = {
    REFRESH_NOTES_STATE: async () => {
      this.notes = await NoteInteractor.getNotes();
    },

    GET_NOTES: async ({ options }: any) => {
      this.notes = await NoteInteractor.getNotes(options);
    },

    ADD_TAGS: async ({ id, tagsIds }: any) => {
      await NoteInteractor.addTags(id, tagsIds);
      NoteActions.refreshState();
    },

    REMOVE_TAGS: async ({ id, tagsIds }: any) => {
      await NoteInteractor.removeTags(id, tagsIds);
      NoteActions.refreshState();
    },

    CREATE_TAGS_FROM_NOTE: async ({ id, tags }: any) => {
      await NoteInteractor.createTagsFromNote(id, tags);
      NoteActions.refreshState();
      TagActions.refreshState();
    },

    CREATE_NOTE: async ({ note }: any) => {
      let createdNote = await NoteInteractor.createNote(note);
      WorkspaceActions.openNotes([createdNote.getId()]);
      NoteActions.refreshState();
    },

    DELETE_NOTES: async ({ ids }: any) => {
      await NoteInteractor.deleteNotes(ids);

      WorkspaceActions.refreshState();
      NoteActions.refreshState();
      TagActions.refreshState();
    },

    UPDATE_NOTE: async ({ id, note }: any) => {
      await NoteInteractor.updateNote(id, note);
      NoteActions.refreshState();
    },

    SWAP_NOTES_INDEXES: async ({ index1, index2 }: any) => {
      await NoteInteractor.swapNotesIndexes(index1, index2);
      NoteActions.refreshState();
    },
  };

  public getState() {
    return this.notes;
  }

  public actionHandler = async (action: any) => {
    if (Object.keys(this.actions).includes(action.name)) {
      await this.actions[action.name]({ ...action.params });

      this.subscriptions.map((subscription: any) => {
        subscription(this.notes);
      });
    }
  };
}

const noteStore = NoteStore.getInstance();
Dispatcher.subscribe(noteStore.actionHandler);
NoteInteractor.subscribe(NoteActions.refreshState);

export default noteStore;
