import NoteDTO from "../../../_Common/DTOs/NoteDTO";

export default interface INoteService {
  getNotes(options?: {}): Promise<NoteDTO[]>;
  createNote(note: NoteDTO): Promise<NoteDTO>;
  deleteNotes(ids: string[]): Promise<boolean>;
  updateNote(id: string, note: NoteDTO): Promise<NoteDTO>;
  swapNotesIndexes(index1: number, index2: number): Promise<NoteDTO[]>;
}
