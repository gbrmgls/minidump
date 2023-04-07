import NoteDTO from "../../_Common/DTOs/NoteDTO";
import TagDTO from "../../_Common/DTOs/TagDTO";
import Dispatcher from "../Dispatcher";

class NoteActions {
  public refreshState() {
    Dispatcher.dispatch({
      name: "REFRESH_NOTES_STATE",
      params: {},
    });
  }

  public getNotes(options?: {}) {
    Dispatcher.dispatch({
      name: "GET_NOTES",
      params: {
        options,
      },
    });
  }

  public addTags(id: string, tagsIds: string[]) {
    Dispatcher.dispatch({
      name: "ADD_TAGS",
      params: {
        id,
        tagsIds,
      },
    });
  }

  public removeTags(id: string, tagsIds: string[]) {
    Dispatcher.dispatch({
      name: "REMOVE_TAGS",
      params: {
        id,
        tagsIds,
      },
    });
  }

  public createTagsFromNote(id: string, tags: TagDTO[]) {
    Dispatcher.dispatch({
      name: "CREATE_TAGS_FROM_NOTE",
      params: {
        id,
        tags,
      },
    });
  }

  public createNote(note?: NoteDTO) {
    Dispatcher.dispatch({
      name: "CREATE_NOTE",
      params: {
        note,
      },
    });
  }

  public deleteNotes(ids: string[]) {
    Dispatcher.dispatch({ name: "DELETE_NOTES", params: { ids } });
  }

  public updateNote(id: string, note: NoteDTO) {
    Dispatcher.dispatch({
      name: "UPDATE_NOTE",
      params: { id, note },
    });
  }

  public swapNotesIndexes(index1: number, index2: number) {
    Dispatcher.dispatch({
      name: "SWAP_NOTES_INDEXES",
      params: { index1, index2 },
    });
  }
}

export default new NoteActions();
