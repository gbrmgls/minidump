import NoteDTO from "../../_Common/DTOs/NoteDTO";
import NoteEntity from "../Entities/NoteEntity";
import INoteInteractor from "./IInteractors/INoteInteractor";
import WorkspaceInteractor from "./WorkspaceInteractor";
import NoteService from "../../3_DataAccess/Services/NoteService";
import TagInteractor from "./TagInteractor";
import TagDTO from "../../_Common/DTOs/TagDTO";

class NoteInteractor implements INoteInteractor {
  async subscribe(callback: any): Promise<any> {
    return await NoteService.subscribe(callback);
  }

  async getNotes(options?: {}): Promise<NoteDTO[]> {
    return await NoteService.getNotes(options);
  }

  async addTags(id: string, tagsIds: string[]): Promise<NoteDTO> {
    let noteEntity = NoteEntity.fromDTO(
      (await this.getNotes({ filter: { or: { ids: [id] } } }))[0]
    );

    noteEntity.addTags(tagsIds);

    return await this.updateNote(id, noteEntity.toDTO());
  }

  async removeTags(id: string, tagsIds: string[]): Promise<NoteDTO> {
    let noteEntity = NoteEntity.fromDTO(
      (await this.getNotes({ filter: { or: { ids: [id] } } }))[0]
    );

    noteEntity.removeTags(tagsIds);

    return await this.updateNote(id, noteEntity.toDTO());
  }

  async createTagsFromNote(id: string, tags: TagDTO[]): Promise<NoteDTO> {
    let noteEntity = NoteEntity.fromDTO(
      (await this.getNotes({ filter: { or: { ids: [id] } } }))[0]
    );

    let newTags = await Promise.all(
      tags.map(async (tag) => await TagInteractor.createTag(tag))
    );

    noteEntity.addTags(newTags.map((tag) => tag.getId()));

    return await this.updateNote(id, noteEntity.toDTO());
  }

  async createNote(note?: NoteDTO): Promise<NoteDTO> {
    return await NoteService.createNote(note ?? new NoteEntity().toDTO());
  }

  async deleteNotes(ids: string[]): Promise<boolean> {
    let noteEntities = (
      await this.getNotes({ filter: { or: { ids: ids } } })
    ).map((noteDTO: NoteDTO) => NoteEntity.fromDTO(noteDTO));

    let deletedTags: any = [];

    noteEntities.map(async (noteEntity: NoteEntity) => {
      noteEntity.getTags().map(async (tagId) => {
        this.getNotes({ filter: { or: { tags: [tagId] } } }).then(
          async (notes) => {
            notes = notes.filter((note) => note.getId() != noteEntity.getId());
            if (
              notes.length == 0 ||
              notes.find((note) => ids.includes(note.getId()))
            ) {
              if (!deletedTags.includes(tagId)) {
                await TagInteractor.deleteTags([tagId]);
              }
              deletedTags.push(tagId);
            }
          }
        );
      });
    });

    await WorkspaceInteractor.closeNotes(ids);
    return await NoteService.deleteNotes(ids);
  }

  async updateNote(id: string, note: NoteDTO): Promise<NoteDTO> {
    return await NoteService.updateNote(id, note);
  }

  async swapNotesIndexes(index1: number, index2: number): Promise<NoteDTO[]> {
    return await NoteService.swapNotesIndexes(index1, index2);
  }
}

export default new NoteInteractor();
