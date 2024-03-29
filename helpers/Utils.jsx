export const Colors = {
  fire: "#Ff7721",
  grass: "#51d25a",
  electric: "#E8DB38",
  water: "#57B5F9",
  ground: "#Deb15a",
  rock: "#A07010",
  poison: "#Bc6aec",
  bug: "#8FD594",
  dragon: "#A5ccf1",
  psychic: "#Fb6d97",
  flying: "#658b8e",
  fairy: "#FD96B9",
  fighting: "#FF5D5D",
  normal: "#C4c7c9",
  ghost: "#4B6780",
  ice: "#99DAFA",
  steel: "#AAC3CF",
  dark: "#3A2D44",
};

export const Pokeapi = {
  imgsBaseUrl:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
  getPokemonImg: (id) => {
    return Pokeapi.imgsBaseUrl + id + ".png";
  },
};

