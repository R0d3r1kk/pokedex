import { Colors } from "./Utils";
export const getCardFormatByType = (types) => {
  let style = {};
  let formatedTypes = [];
  let fTypes = ''
  for (let i = 0; i < types.length; i++) {
    switch (types[i].type.name) {
      case "fire":
        formatedTypes.push({
          name: "fire",
          color: Colors.fire,
        });
        break;
      case "grass":
        formatedTypes.push({
          name: "grass",
          color: Colors.grass,
        });
        break;
      case "electric":
        formatedTypes.push({
          name: "electric",
          color: Colors.electric,
        });
        break;
      case "water":
        formatedTypes.push({
          name: "water",
          color: Colors.water,
        });
        break;
      case "ground":
        formatedTypes.push({
          name: "ground",
          color: Colors.ground,
        });
        break;
      case "rock":
        formatedTypes.push({
          name: "rock",
          color: Colors.rock,
        });
        break;
      case "poison":
        formatedTypes.push({
          name: "poison",
          color: Colors.poison,
        });
        break;
      case "bug":
        formatedTypes.push({
          name: "bug",
          color: Colors.bug,
        });
        break;
      case "dragon":
        formatedTypes.push({
          name: "dragon",
          color: Colors.dragon,
        });
        break;
      case "psychic":
        formatedTypes.push({
          name: "psychic",
          color: Colors.psychic,
        });
        break;
      case "flying":
        formatedTypes.push({
          name: "flying",
          color: Colors.flying,
        });
        break;
      case "fighting":
        formatedTypes.push({
          name: "fighting",
          color: Colors.fighting,
        });
        break;
      case "normal":
        formatedTypes.push({
          name: "normal",
          color: Colors.normal,
        });
        break;
      case "fairy":
          formatedTypes.push({
            name: "fairy",
            color: Colors.fairy,
          });
          break;
      default:
        formatedTypes.push({
          name: "default",
          color: "light",
        });
        break;
    }
    if(formatedTypes && formatedTypes.length >= i && types.length > 0){
      formatedTypes[i].type = types[i].slot;
      fTypes += formatedTypes[i]?.name + " "
    }
      
  }

  style = {
    className: fTypes.trim()
  };

  return {
    style,
    formatedTypes,
  };
};

export const get = async (url) => {
  return await fetch(url)
    .then((res) => res.json())
    .then((data) => data);
};

export const getPokemon = async (id) => {
  return await fetch(baseUrl + id)
    .then((res) => res.json())
    .then((data) => data);
};

export const getPokemons = async (baseUrl, baseParams) => {
  return await fetch(
    baseUrl + baseParams
  )
    .then((res) => res.json())
    .then((data) => data);
};

// program to convert first letter of a string to uppercase
export const capitalizeFirstLetter = (str) => {
  if(str){
    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
  }
  return null;
}

export const standarizeColor = (str) => {
  let ctx = document.createElement("canvas").getContext("2d");
  ctx.fillStyle = str;
  return ctx.fillStyle;
};