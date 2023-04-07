import TagDTO from "../../_Common/DTOs/TagDTO";
import Dispatcher from "../Dispatcher";

class UIActions {
  public openOverlay() {
    Dispatcher.dispatch({
      name: "OPEN_OVERLAY",
      params: {},
    });
  }

  public closeOverlay() {
    Dispatcher.dispatch({
      name: "CLOSE_OVERLAY",
      params: {},
    });
  }

  public toggleOverlay() {
    Dispatcher.dispatch({
      name: "GET_TAGS_BY_NAME",
      params: {},
    });
  }

  public openSidebar() {
    Dispatcher.dispatch({
      name: "OPEN_SIDEBAR",
      params: {},
    });
  }

  public closeSidebar() {
    Dispatcher.dispatch({
      name: "CLOSE_SIDEBAR",
      params: {},
    });
  }

  public toggleSidebar() {
    Dispatcher.dispatch({
      name: "TOGGLE_SIDEBAR",
      params: {},
    });
  }

  public addSearchingTag(id: string) {
    Dispatcher.dispatch({
      name: "ADD_SEARCHING_TAG",
      params: { id },
    });
  }

  public removeSearchingTag(id: string) {
    Dispatcher.dispatch({
      name: "REMOVE_SEARCHING_TAG",
      params: { id },
    });
  }

  public clearSearchingTags() {
    Dispatcher.dispatch({
      name: "CLEAR_SEARCHING_TAGS",
      params: {},
    });
  }

  public addSelectedNote(id: string) {
    Dispatcher.dispatch({
      name: "ADD_SELECTED_NOTE",
      params: { id },
    });
  }

  public removeSelectedNote(id: string) {
    Dispatcher.dispatch({
      name: "REMOVE_SELECTED_NOTE",
      params: { id },
    });
  }

  public clearSelectedNotes() {
    Dispatcher.dispatch({
      name: "CLEAR_SELECTED_NOTES",
      params: {},
    });
  }
}

export default new UIActions();
