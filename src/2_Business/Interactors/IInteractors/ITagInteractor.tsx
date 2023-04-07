import TagDTO from "../../../_Common/DTOs/TagDTO";

export default interface ITagInteractor {
  getTags(options?: {}): Promise<TagDTO[]>;
  createTag(tag: TagDTO): Promise<TagDTO>;
  deleteTags(ids: string[]): Promise<boolean>;
  updateTag(id: string, tag: TagDTO): Promise<TagDTO>;
}
