import { Colors } from "./Utils";
export const getCardFormatByType = (types) => {
  let style = {};
  let formatedTypes = [];
  let fTypes = "";
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
      case "ghost":
        formatedTypes.push({
          name: "ghost",
          color: Colors.ghost,
        });
        break;
      case "ice":
        formatedTypes.push({
          name: "ice",
          color: Colors.ice,
        });
        break;
      case "steel":
        formatedTypes.push({
          name: "steel",
          color: Colors.steel,
        });
        break;
      case "dark":
        formatedTypes.push({
          name: "dark",
          color: Colors.dark,
        });
        break;
      default:
        formatedTypes.push({
          name: "default",
          color: "light",
        });
        break;
    }
    if (formatedTypes && formatedTypes.length >= i && types.length > 0) {
      formatedTypes[i].type = types[i].slot;
      fTypes = formatedTypes[0]?.name + " ";
    }
  }

  style = {
    className: fTypes.trim(),
  };

  return {
    style,
    formatedTypes,
  };
};

export const formatPokemonName = (str) => {
  let name = str;
  let params = [
    "plant",
    "standard",
    "altered",
    "land",
    "normal",
    "incarnate",
    "ordinary",
    "aria",
    "male",
    "shield",
    "average",
    "midday",
    "solo",
    "amped",
    "full",
    "single",
    "striped",
    "black",
    "white",
    "blade",
    "small",
    "large",
    "super",
  ];
  let correctParams = ["koko", "lele", "bulu", "fini"];
  let split = name.split("-");
  if (split.length > 1) {
    for (let i = 0; i < split.length; i++) {
      if (params.includes(split[i])) {
        name = split[0];
      } else if (correctParams.includes(split[i])) {
        break;
      }
    }
  }
  console.log(name);
  return name;
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
  return await fetch(baseUrl + baseParams)
    .then((res) => res.json())
    .then((data) => data);
};

// program to convert first letter of a string to uppercase
export const capitalizeFirstLetter = (str) => {
  if (str) {
    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
  }
  return null;
};

export const standarizeColor = (str) => {
  let ctx = document.createElement("canvas").getContext("2d");
  ctx.fillStyle = str;
  return ctx.fillStyle;
};

export function is_numeric(str) {
  return /^\d+$/.test(str);
}

export function roman_to_Int(str1) {
  if (str1 == null) return -1;
  var num = char_to_int(str1.charAt(0));
  var pre, curr;

  for (var i = 1; i < str1.length; i++) {
    curr = char_to_int(str1.charAt(i));
    pre = char_to_int(str1.charAt(i - 1));
    if (curr <= pre) {
      num += curr;
    } else {
      num = num - pre * 2 + curr;
    }
  }

  return num;
}

function char_to_int(c) {
  switch (c) {
    case "I":
      return 1;
    case "V":
      return 5;
    case "X":
      return 10;
    case "L":
      return 50;
    case "C":
      return 100;
    case "D":
      return 500;
    case "M":
      return 1000;
    default:
      return -1;
  }
}

export function DeepEqual(object1, object2) {
  if (!object1) return false;
  if (!object2) return false;

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
}
