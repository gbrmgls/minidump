import TagDTO from "../../_Common/DTOs/TagDTO";
import ITagInteractor from "./IInteractors/ITagInteractor";
import TagService from "../../3_DataAccess/Services/TagService";
import NoteInteractor from "./NoteInteractor";
import NoteEntity from "../Entities/NoteEntity";
import NoteDTO from "../../_Common/DTOs/NoteDTO";

class TagInteractor implements ITagInteractor {
  async subscribe(callback: any): Promise<any> {
    return await TagService.subscribe(callback);
  }

  async getTags(options?: {}): Promise<TagDTO[]> {
    return await TagService.getTags(options);
  }

  async createTag(tag: TagDTO): Promise<TagDTO> {
    if (tag.getName() === "") {
      throw new Error("Tag name cannot be empty");
    } else if (tag.getName().split(" ").length > 1) {
      throw new Error("Tag name cannot contain spaces");
    } else if (tag.getName().length > 15) {
      throw new Error("Tag name cannot have more than 15 characters");
    }

    // Checking for duplicate tag
    let tagsWithSameName = await this.getTags({
      filter: { or: { name: tag.getName() }, exact: true },
    });

    return tagsWithSameName.length > 0
      ? tagsWithSameName[0]
      : await TagService.createTag(tag);
  }

  async deleteTags(ids: string[]): Promise<boolean> {
    let notesWithTag = await NoteInteractor.getNotes({
      filter: { or: { tags: ids } },
    });

    if (notesWithTag.length > 0) {
      notesWithTag.map((note: NoteDTO) => {
        let noteEntity = NoteEntity.fromDTO(note);
        noteEntity.removeTags(ids);
        NoteInteractor.updateNote(noteEntity.getId(), noteEntity.toDTO());
      });
    }

    return await TagService.deleteTags(ids);
  }

  async updateTag(id: string, tag: TagDTO): Promise<TagDTO> {
    if (tag.getName() === "") {
      throw new Error("Tag name cannot be empty");
    } else if (tag.getName().split(" ").length > 1) {
      throw new Error("Tag name cannot contain spaces");
    } else if (tag.getName().length > 15) {
      throw new Error("Tag name cannot have more than 15 characters");
    }

    return await TagService.updateTag(id, tag);
  }
}

export default new TagInteractor();
