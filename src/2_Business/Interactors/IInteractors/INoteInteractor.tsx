import NoteDTO from "../../../_Common/DTOs/NoteDTO";
import TagDTO from "../../../_Common/DTOs/TagDTO";

export default interface INoteInteractor {
  getNotes(options?: {}): Promise<NoteDTO[]>;
  addTags(noteId: string, tagsIds: string[]): Promise<NoteDTO>;
  removeTags(noteId: string, tagsIds: string[]): Promise<NoteDTO>;
  createTagsFromNote(id: string, tags: TagDTO[]): Promise<NoteDTO>;
  createNote(note: NoteDTO): Promise<NoteDTO>;
  deleteNotes(ids: string[]): Promise<boolean>;
  updateNote(id: string, note: NoteDTO): Promise<NoteDTO>;
  swapNotesIndexes(index1: number, index2: number): Promise<NoteDTO[]>;
}
