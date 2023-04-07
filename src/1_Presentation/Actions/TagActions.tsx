import TagDTO from "../../_Common/DTOs/TagDTO";
import Dispatcher from "../Dispatcher";

class TagActions {
  public refreshState() {
    Dispatcher.dispatch({
      name: "REFRESH_TAGS_STATE",
      params: {},
    });
  }
  public getTags(options?: {}) {
    Dispatcher.dispatch({
      name: "GET_TAGS",
      params: {
        options,
      },
    });
  }

  public createTag(tag?: TagDTO) {
    Dispatcher.dispatch({
      name: "CREATE_TAG",
      params: {
        tag,
      },
    });
  }

  public deleteTags(ids: string[]) {
    Dispatcher.dispatch({
      name: "DELETE_TAGS",
      params: {
        ids,
      },
    });
  }

  public updateTag(id: string, tag: TagDTO) {
    Dispatcher.dispatch({
      name: "UPDATE_TAG",
      params: {
        id,
        tag,
      },
    });
  }
}

export default new TagActions();
