import INoteDAO from "../IDAOs/INoteDAO";
import PouchDBClient from "../../../4_Infrastructure/PouchDBClient";
import NoteDTO from "../../../_Common/DTOs/NoteDTO";

class NotePouchDBDAO implements INoteDAO {
  public async subscribe(callback: any): Promise<any> {
    return PouchDBClient.subscribe(callback);
  }

  public async getNotes(options?: {
    page: number;
    ammount: number;
    filter: {
      and: {
        ids: string[];
        tags: string[];
        colors: string[];
        title: string;
        content: string;
        text: string;
      };
      or: {
        ids: string[];
        tags: string[];
        colors: string[];
        title: string;
        content: string;
        text: string;
      };
    };
  }): Promise<NoteDTO[]> {
    const { page = 1, ammount = 50, filter = {} } = options ?? {};
    let noteDTOList: NoteDTO[] = [];

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

        // Tag AND filter
        if ("tags" in and && and.tags.length > 0) {
          andList.push({
            tags: {
              $in: and.tags,
            },
          });
        }

        // Color AND filter
        if ("color" in and) {
          andList.push(
            ...and.colors.map((color: string) => {
              return {
                color: color,
              };
            })
          );
        }

        // Title AND filter
        if ("title" in and) {
          andList.push({
            title: {
              $regex: new RegExp(and.title, "i"),
            },
          });
        }

        // Content AND filter
        if ("content" in and) {
          andList.push({
            content: {
              $regex: new RegExp(and.content, "i"),
            },
          });
        }

        // Text AND filter
        if ("text" in and) {
          andList.push({
            $or: [
              {
                title: {
                  $regex: new RegExp(and.text, "i"),
                },
              },
              {
                content: {
                  $regex: new RegExp(and.text, "i"),
                },
              },
            ],
          });
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

        // Tag OR filter
        if ("tags" in or && or.tags.length > 0) {
          orList.push({
            tags: {
              $in: or.tags,
            },
          });
        }

        // Color OR filter
        if ("color" in or) {
          orList.push(
            ...or.colors.map((color: string) => {
              return {
                color: color,
              };
            })
          );
        }

        // Title OR filter
        if ("title" in or) {
          orList.push({
            title: {
              $regex: new RegExp(or.title, "i"),
            },
          });
        }

        // Content OR filter
        if ("content" in filter) {
          orList.push({
            content: {
              $regex: new RegExp(or.content, "i"),
            },
          });
        }

        // Text OR filter
        if ("text" in or) {
          orList.push({
            $or: [
              {
                title: {
                  $regex: new RegExp(or.text, "i"),
                },
              },
              {
                content: {
                  $regex: new RegExp(or.text, "i"),
                },
              },
            ],
          });
        }
      }
    }

    // Add all to selector
    let DBSelector = {
      type: "note",
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
    let DBNoteList = (
      await PouchDBClient.db.find({
        selector: DBSelector,
      })
    ).docs;

    DBNoteList?.map(async (note: any) =>
      noteDTOList.push(
        new NoteDTO(
          note._id,
          note.index,
          note.title,
          note.content,
          note.color,
          note.tags,
          note.createdAt,
          note.updatedAt
        )
      )
    );

    noteDTOList.sort((a: NoteDTO, b: NoteDTO) => a.getIndex() - b.getIndex());

    return noteDTOList;
  }

  async createNote(note: NoteDTO): Promise<NoteDTO> {
    const data = {
      _id: crypto.randomUUID(),
      type: "note",
      index: (await PouchDBClient.getLastIndex("notes")) + 1,
      title: note.getTitle(),
      color: note.getColor(),
      content: note.getContent(),
      tags: note.getTags(),
      createdAt: new Date().getTime().toString(),
      updatedAt: new Date().getTime().toString(),
    };

    PouchDBClient.setLastIndex("notes");

    let DBNewNote = await PouchDBClient.db.get(
      (
        await PouchDBClient.db.put(data)
      ).id
    );

    let newNoteDTO = new NoteDTO(
      DBNewNote._id,
      DBNewNote.index,
      DBNewNote.title,
      DBNewNote.content,
      DBNewNote.color,
      DBNewNote.tags,
      DBNewNote.createdAt,
      DBNewNote.updatedAt
    );

    return newNoteDTO;
  }

  public async deleteNotes(ids: string[]): Promise<boolean> {
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
      type: "note",
      $or: andList,
    };

    // Run DB query
    let DBNoteList = (
      await PouchDBClient.db.find({
        selector: DBSelector,
      })
    ).docs;

    await PouchDBClient.db.bulkDocs(
      DBNoteList.map((DBNote: any) => {
        return { ...DBNote, _deleted: true };
      })
    )?.ok;

    return true;
  }

  public async updateNote(id: string, note: NoteDTO): Promise<NoteDTO> {
    let DBOldNote = await PouchDBClient.db.get(id);

    const data = {
      _id: DBOldNote._id,
      _rev: DBOldNote._rev,
      type: DBOldNote.type,
      index: DBOldNote.index,
      title: note.getTitle(),
      color: note.getColor(),
      content: note.getContent(),
      tags: note.getTags(),
      createdAt: DBOldNote.createdAt,
      updatedAt: new Date().getTime().toString(),
    };

    let DBUpdatedNote = await PouchDBClient.db.get(
      (
        await PouchDBClient.db.put(data)
      ).id
    );

    let updatedNoteDTO = new NoteDTO(
      DBUpdatedNote._id,
      DBUpdatedNote.index,
      DBUpdatedNote.title,
      DBUpdatedNote.content,
      DBUpdatedNote.color,
      DBUpdatedNote.tags,
      DBUpdatedNote.createdAt,
      DBUpdatedNote.updatedAt
    );

    return updatedNoteDTO;
  }

  public async swapNotesIndex(
    index1: number,
    index2: number
  ): Promise<NoteDTO[]> {
    let DBNoteWithIndex1 = (
      await PouchDBClient.db.find({
        selector: {
          type: "note",
          index: index1,
        },
      })
    ).docs[0];

    let DBNoteWithIndex2 = (
      await PouchDBClient.db.find({
        selector: {
          type: "note",
          index: index2,
        },
      })
    ).docs[0];

    DBNoteWithIndex1.index = index2;
    DBNoteWithIndex2.index = index1;

    let DBUpdatedNoteWithIndex1 = await PouchDBClient.db.get(
      (
        await PouchDBClient.db.put(DBNoteWithIndex1)
      ).id
    );

    let DBUpdatedNoteWithIndex2 = await PouchDBClient.db.get(
      (
        await PouchDBClient.db.put(DBNoteWithIndex2)
      ).id
    );

    return [DBUpdatedNoteWithIndex1, DBUpdatedNoteWithIndex2];
  }
}

export default new NotePouchDBDAO();
