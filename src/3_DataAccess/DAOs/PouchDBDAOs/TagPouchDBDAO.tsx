import ITagDAO from "../IDAOs/ITagDAO";
import TagDTO from "../../../_Common/DTOs/TagDTO";
import PouchDBClient from "../../../4_Infrastructure/PouchDBClient";

class TagPouchDBDAO implements ITagDAO {
  public async subscribe(callback: any): Promise<any> {
    return PouchDBClient.subscribe(callback);
  }

  public async getTags(options?: {
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
  }): Promise<TagDTO[]> {
    const { page = 1, ammount = 50, filter = {} } = options ?? {};
    let tagDTOList: TagDTO[] = [];

    let orList: any = [];
    let andList: any = [];

    // Build PouchDB filters
    if (Object.keys(filter).length > 0) {
      // AND filters
      if ("and" in filter) {
        let and: any = filter.and;
        // Id AND filter
        if ("ids" in and && and.ids.length > 0) {
          andList.push(
            ...and.ids.map((id: string) => {
              return {
                _id: id,
              };
            })
          );
        }

        // Name AND filter
        if ("name" in and) {
          if ("exact" in filter) {
            andList.push({
              name: and.name,
            });
          } else {
            andList.push({
              name: {
                $regex: new RegExp(and.name, "i"),
              },
            });
          }
        }
      }

      // OR filters
      if ("or" in filter) {
        let or: any = filter.or;
        // Id OR filter
        if ("ids" in or && or.ids.length > 0) {
          orList.push(
            ...or.ids.map((id: string) => {
              return {
                _id: id,
              };
            })
          );
        }

        // Name OR filter
        if ("name" in or) {
          if ("exact" in filter) {
            orList.push({
              name: or.name,
            });
          } else {
            orList.push({
              name: {
                $regex: new RegExp(or.name, "i"),
              },
            });
          }
        }
      }
    }

    // Add all to selector
    let DBSelector = {
      type: "tag",
      $or: orList,
      $and: andList,
    };

    // Delete empty filters
    Object.entries(DBSelector).map(([key, value]) => {
      if (value.length == 0) {
        delete DBSelector[key as keyof typeof DBSelector];
      }
    });

    // Run DB query
    let DBTagList = (
      await PouchDBClient.db.find({
        selector: DBSelector,
      })
    ).docs;

    DBTagList?.map(async (tag: any) =>
      tagDTOList.push(
        new TagDTO(tag._id, tag.name, tag.createdAt, tag.updatedAt)
      )
    );

    return tagDTOList;
  }

  public async createTag(tag: TagDTO): Promise<TagDTO> {
    const data = {
      _id: crypto.randomUUID(),
      type: "tag",
      name: tag?.getName() || "",
      createdAt: new Date().getTime().toString(),
      updatedAt: new Date().getTime().toString(),
    };

    PouchDBClient.setLastIndex("tags");

    let DBNewTag = await PouchDBClient.db.get(
      (
        await PouchDBClient.db.put(data)
      ).id
    );

    let newTagDTO = new TagDTO(
      DBNewTag._id,
      DBNewTag.index,
      DBNewTag.createdAt,
      DBNewTag.updatedAt
    );

    return newTagDTO;
  }

  public async deleteTags(ids: string[]): Promise<boolean> {
    let andList: any = [];

    andList.push(
      ...ids.map((id: string) => {
        return {
          _id: id,
        };
      })
    );

    // Add all to selector
    let DBSelector = {
      type: "tag",
      $or: andList,
    };

    // Run DB query
    let DBTagList = (
      await PouchDBClient.db.find({
        selector: DBSelector,
      })
    ).docs;

    await PouchDBClient.db.bulkDocs(
      DBTagList.map((DBTag: any) => {
        return { ...DBTag, _deleted: true };
      })
    )?.ok;

    return true;
  }

  public async updateTag(id: string, tag: TagDTO): Promise<TagDTO> {
    let DBOldTag = await PouchDBClient.db.get(id);

    const data = {
      _id: DBOldTag._id,
      _rev: DBOldTag._rev,
      type: DBOldTag.type,
      index: DBOldTag.index,
      name: tag.getName(),
      createdAt: DBOldTag.createdAt,
      updatedAt: new Date().getTime().toString(),
    };

    let DBUpdatedTag = await PouchDBClient.db.get(
      (
        await PouchDBClient.db.put(data)
      ).id
    );

    let updatedTagDTO = new TagDTO(
      DBUpdatedTag._id,
      DBUpdatedTag.index,
      DBUpdatedTag.createdAt,
      DBUpdatedTag.updatedAt
    );

    return updatedTagDTO;
  }
}

export default new TagPouchDBDAO();
