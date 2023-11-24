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

export const PokeUrl = {
  HybridShivam: "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/",
  PokemonDb_GO: "https://img.pokemondb.net/sprites/go/normal/",
  ProjectPokemon_Sprite: "https://projectpokemon.org/images/normal-sprite/",
  getUrl: (type, id, ext = ".png") => {
    let file = "";
    switch(type){
      case "Shivam":
        if(id.toString().length === 1){
          id = "00" + (id).toString();
        }else if(id.toString().length === 2){
          id = "0" + (id).toString();
        }
        file = id + ext;
        return PokeUrl.HybridShivam + file;
      case "PokemonGO":
        file = id + ext;
        return PokeUrl.PokemonDb_GO + file;
      case "Sprite":
        file = id + ext;
        return PokeUrl.ProjectPokemon_Sprite + file;
    }
  }
}

