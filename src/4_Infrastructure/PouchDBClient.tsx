import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
import config from "../../envconfig.json";
import IDBClient from "./IDBClient";

PouchDB.plugin(PouchDBFind);

class PouchDBClient implements IDBClient {
  private static instance: PouchDBClient;

  public db: any;
  private subscribers: any[] = [];

  private constructor() {}

  public static getInstance() {
    if (!PouchDBClient.instance) {
      PouchDBClient.instance = new PouchDBClient();
      if (!PouchDBClient.instance.db) {
        PouchDBClient.instance.db = new PouchDB(config.POUCHDB.DB_NAME);
      }
      PouchDBClient.instance.watchPersistence();
    }
    return PouchDBClient.instance;
  }

  public async getLastIndex(collectionName = ""): Promise<number> {
    const pouchDB = PouchDBClient.getInstance();
    let lastIndex = 0;

    let sequence = await pouchDB.db.find({
      selector: {
        type: "sequence",
        collection: collectionName,
      },
    });

    if (sequence.docs.length == 0) {
      await pouchDB.setLastIndex(collectionName);
      lastIndex = (
        await pouchDB.db.find({
          selector: {
            type: "sequence",
            collection: collectionName,
          },
        })
      ).docs[0].lastIndex;
    } else {
      lastIndex = sequence.docs[0].lastIndex;
    }

    return lastIndex;
  }

  public async setLastIndex(
    collectionName = "",
    type = "+",
    quantity = 1
  ): Promise<void> {
    const pouchDB = PouchDBClient.getInstance();
    quantity = type == "+" ? quantity : -quantity;

    // Check note sequence existence
    let noteSequence =
      (
        await pouchDB.db.find({
          selector: {
            type: "sequence",
            collection: collectionName,
          },
        })
      ).docs[0] || false;

    if (!noteSequence) {
      // if doesnt exist, create it
      const data = {
        _id: crypto.randomUUID(),
        type: "sequence",
        collection: collectionName,
        lastIndex: 0,
      };

      noteSequence = await pouchDB.db.get((await pouchDB.db.put(data)).id);
      quantity = 0;
    }

    noteSequence.lastIndex += quantity;

    await pouchDB.db.put(noteSequence);
  }

  public async watchPersistence() {
    const pouchDB = PouchDBClient.getInstance();
    var remoteDB = new PouchDB(config.POUCHDB.REMOTE.HOST, {
      auth: {
        username: config.POUCHDB.REMOTE.USERNAME,
        password: config.POUCHDB.REMOTE.PASSWORD,
      },
    });
    pouchDB.db
      .sync(remoteDB, {
        live: true,
      })
      .on("change", (change: any) => {
        if (change.direction == "pull") {
          pouchDB.subscribers.map((subscriber) => {
            subscriber(change);
          });
        }
      });
  }

  public async subscribe(callback: any) {
    const pouchDB = PouchDBClient.getInstance();
    pouchDB.subscribers.push(callback);
  }
}

export default PouchDBClient.getInstance();
