import TagDTO from "../../../_Common/DTOs/TagDTO";

export default interface ITagDAO {
  getTags(options?: {
    page: number;
    ammount: number;
    filter: {
      and: {
        ids: string[];
        name: string;
      };
      or: {
        ids: string[];
        name: string;
      };
      exact: boolean;
    };
  }): Promise<TagDTO[]>;

  createTag(tag: TagDTO): Promise<TagDTO>;
  deleteTags(ids: string[]): Promise<boolean>;
  updateTag(id: string, tag: TagDTO): Promise<TagDTO>;
}
