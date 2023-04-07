import TagDTO from "../../_Common/DTOs/TagDTO";
import ITagService from "./IServices/ITagService";
import config from "../../../envconfig.json";
import TagPouchDBDAO from "../DAOs/PouchDBDAOs/TagPouchDBDAO";

class TagService implements ITagService {
  // Use selected DAO to interact with the database
  private TagDAOs: any = {
    POUCHDB: TagPouchDBDAO,
  };

  private tagDAO = this.TagDAOs[config.DB_TYPE];

  async subscribe(callback: any): Promise<any> {
    return await this.tagDAO.subscribe(callback);
  }

  async getTags(options?: {}): Promise<TagDTO[]> {
    return await this.tagDAO.getTags(options);
  }
  async createTag(tag: TagDTO): Promise<TagDTO> {
    return await this.tagDAO.createTag(tag);
  }

  async deleteTags(ids: string[]): Promise<boolean> {
    return await this.tagDAO.deleteTags(ids);
  }

  async updateTag(id: string, tag: TagDTO): Promise<TagDTO> {
    return await this.tagDAO.updateTag(id, tag);
  }
}

export default new TagService();
