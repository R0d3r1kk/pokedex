import Dexie, { Table } from "dexie";

export interface IPokemonList {
  id?: number;
  date_created: string;
  count: number;
  next: number;
  previous: number;
  limit: number;
  results: object;
}

export class PokemonDb extends Dexie {
  pokemonlist: Table<IPokemonList>;

  constructor(parameters) {
    // if (!("indexedDB" in window)) {
    //   console.log("This browser doesn't support IndexedDB");
    //   return;
    // }
    super("pokemon");
    this.version(1).stores({
      pokemonlist: "++id, date_created, count, next, previous, limit, results",
    });
    this.open()
      .then(function (db) {
        console.log("Database is at version: " + db.verno);
        db.tables.forEach(function (table) {
          console.log("Found a table with name: " + table.name);
        });
      })
      .catch((Error, e) => {
        this.close();
        this.version(1).stores({
          pokemonlist:
            "++id, date_created, count, next, previous, limit, results, date_created",
        });
        console.error("Database not found", e);
      });
  }
}

export const db = new PokemonDb();
