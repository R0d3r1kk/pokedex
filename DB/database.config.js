import Dexie, { Table } from "dexie";

export const db = new Dexie("pokemon");
db.version(1).stores({
  pokemonlist: "++id, date_created, count, next, previous, limit, results",
});
db.open()
  .then(function (db) {
    console.log("Database is at version: " + db.verno);
    db.tables.forEach(function (table) {
      console.log("Found a table with name: " + table.name);
    });
  })
  .catch((Error, e) => {
    db.close();
    db.version(1).stores({
      pokemonlist:
        "++id, date_created, count, next, previous, limit, results, date_created",
    });
    console.error("Database not found", e);
  });
