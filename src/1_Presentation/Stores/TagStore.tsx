import TagDTO from "../../_Common/DTOs/TagDTO";
import NoteInteractor from "../../2_Business/Interactors/NoteInteractor";
import TagInteractor from "../../2_Business/Interactors/TagInteractor";
import TagActions from "../Actions/TagActions";
import Dispatcher from "../Dispatcher";
import WorkspaceActions from "../Actions/WorkspaceActions";
import NoteActions from "../Actions/NoteActions";
import UIActions from "../Actions/UIActions";

class TagStore {
  // Singleton logic
  private static instance: TagStore;
  private constructor() {}

  public static getInstance() {
    if (!TagStore.instance) {
      TagStore.instance = new TagStore();
    }
    return TagStore.instance;
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

  private tags: TagDTO[] = [];

  private actions: any = {
    REFRESH_TAGS_STATE: async () => {
      this.tags = await TagInteractor.getTags();
    },

    GET_TAGS: async ({ options }: any) => {
      this.tags = await TagInteractor.getTags(options);
    },

    CREATE_TAG: async ({ tag }: any) => {
      let createdTag = await TagInteractor.createTag(tag);
      TagActions.refreshState();
    },

    DELETE_TAGS: async ({ ids }: any) => {
      await TagInteractor.deleteTags(ids);
      TagActions.refreshState();
      NoteActions.refreshState();
    },

    UPDATE_TAG: async ({ id, tag }: any) => {
      await TagInteractor.updateTag(id, tag);
      TagActions.refreshState();
      NoteActions.refreshState();
    },
  };

  public actionHandler = async (action: any) => {
    if (Object.keys(this.actions).includes(action.name)) {
      await this.actions[action.name]({ ...action.params });

      this.subscriptions.map((subscription: any) => {
        subscription(this.tags);
      });
    }
  };
}

const tagStore = TagStore.getInstance();
Dispatcher.subscribe(tagStore.actionHandler);
TagInteractor.subscribe(TagActions.refreshState);

export default tagStore;
