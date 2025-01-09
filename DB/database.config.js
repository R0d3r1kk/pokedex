import Dexie, { Table } from "dexie";

const db = new Dexie("pokemon");
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
    db.version(1).stores({
      pokemonlist: "++id, date_created, count, next, previous, limit, results",
    });
    console.error("Database not found", e);
  });

const exportDB = (data) => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = "db.json";

  link.click();
}

export default db;
export {
  exportDB
}