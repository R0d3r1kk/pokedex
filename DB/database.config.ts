import Dexie from "dexie";

const database = new Dexie("pokemon");
database.version(1).stores({
  pokemonlist: "++id, count, next, previous, results",
});

export interface IPokemonList {
  id?: number;
  count: number;
  next: number;
  previous: number;
  results: object;
}

export const PokemonTable = database.table("pokemonlist");

export default database;
