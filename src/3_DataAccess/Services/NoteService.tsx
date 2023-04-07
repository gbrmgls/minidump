import NotePouchDBDAO from "../DAOs/PouchDBDAOs/NotePouchDBDAO";
import INoteService from "./IServices/INoteService";
import NoteDTO from "../../_Common/DTOs/NoteDTO";
import config from "../../../envconfig.json";

class NoteService implements INoteService {
  // Use selected DAO to interact with the database

  private NoteDAOs: any = {
    POUCHDB: NotePouchDBDAO,
  };

  private noteDAO = this.NoteDAOs[config.DB_TYPE];

  async subscribe(callback: any): Promise<any> {
    return await this.noteDAO.subscribe(callback);
  }

  public async getNotes(options?: {}): Promise<NoteDTO[]> {
    return await this.noteDAO.getNotes(options);
  }

  public async createNote(note: NoteDTO): Promise<NoteDTO> {
    return await this.noteDAO.createNote(note);
  }

  public async deleteNotes(ids: string[]): Promise<boolean> {
    return this.noteDAO.deleteNotes(ids);
  }

  public async updateNote(id: string, note: NoteDTO): Promise<NoteDTO> {
    return await this.noteDAO.updateNote(id, note);
  }

  public async swapNotesIndexes(
    index1: number,
    index2: number
  ): Promise<NoteDTO[]> {
    return await this.noteDAO.swapNotesIndex(index1, index2);
  }
}

export default new NoteService();
