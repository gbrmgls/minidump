import NoteDTO from "../../../_Common/DTOs/NoteDTO";

export default interface INoteDAO {
  getNotes(options?: {
    page: number;
    ammount: number;
    filter: {
      and: {
        ids: string[];
        tags: string[];
        colors: string[];
        title: string;
        content: string;
      };
      or: {
        ids: string[];
        tags: string[];
        colors: string[];
        title: string;
        content: string;
      };
    };
  }): Promise<NoteDTO[]>;
  createNote(note: NoteDTO): Promise<NoteDTO>;
  deleteNotes(ids: string[]): Promise<boolean>;
  updateNote(id: string, note: NoteDTO): Promise<NoteDTO>;
  swapNotesIndex(index1: number, index2: number): Promise<NoteDTO[]>;
}
