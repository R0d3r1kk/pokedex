import {
  BugIc,
  DarkIc,
  DragonIc,
  ElectricIc,
  FairyIc,
  FightingIc,
  FireIc,
  FlyingIc,
  GhostIc,
  GrassIc,
  GroundIc,
  IceIc,
  NormalIc,
  PoisonIc,
  PsychicIc,
  RockIc,
  SteelIc,
  WaterIc
} from "../assets/svg/icons";

import {
  GoeFilter,
  GhostFilter,
  WaterFilter,
  PsychicFilter,
  GroundFilter,
  PoisonFilter,
  NormalFilter,
  BugFilter,
  DarkFilter,
  RockFilter,
} from "../assets/svg/filters";
import { GoeFooter } from "../components";

const colorNames = [
  "fire",
  "grass",
  "electric",
  "water",
  "ground",
  "rock",
  "poison",
  "bug",
  "dragon",
  "psychic",
  "flying",
  "fairy",
  "fighting",
  "normal",
  "ghost",
  "ice",
  "steel",
  "dark",
]


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

export const TypeIcons = {
  fire: FireIc,
  grass: GrassIc,
  electric: ElectricIc,
  water: WaterIc,
  ground: GroundIc,
  rock: RockIc,
  poison: PoisonIc,
  bug: BugIc,
  dragon: DragonIc,
  psychic: PsychicIc,
  flying: FlyingIc,
  fairy: FairyIc,
  fighting: FightingIc,
  normal: NormalIc,
  ghost: GhostIc,
  ice: IceIc,
  steel: SteelIc,
  dark: DarkIc,
}

export function getFilterIcons() {
  return colorNames.map((name, idx) => {
    return {
      type_icon: TypeIcons[name],
      type_name: name,
      type_color: Colors[name]
    }
  });
}

export const PokeUrl = {
  HybridShivam: "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/",
  PokemonDb_GO: "https://img.pokemondb.net/sprites/go/normal/",
  getUrl: (type, id, ext = ".png") => {
    let file = "";
    switch (type) {
      case "Shivam":
        if (id.toString().length === 1) {
          id = "00" + (id).toString();
        } else if (id.toString().length === 2) {
          id = "0" + (id).toString();
        }
        file = id + ext;
        return PokeUrl.HybridShivam + file;
      case "PokemonGO":
        file = id + ext;
        return PokeUrl.PokemonDb_GO + file;
    }
  }
}

export function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

export function getGoeFooterOptions(
  ftypes,
  options = {
    bubbles: 100,
    bubblecolors: [...ftypes.map((item) => Colors[item.name])],
    size: 4,
    distance: 20,
    position: 106,
    time: 4,
    delay: 0,
    filter: { type: "" },
  }) {
  const _type = ftypes[0].name;
  options.filter = { type: _type };

  switch (_type) {
    case "normal":
      options.size = 6;
      options.filter.svg = <NormalFilter />;
      break;
    case "fire":
      options.size = 6;
      options.filter.height = "1rem";
      options.filter.type = "goe";
      options.filter.svg = <GoeFilter />;
      break;
    case "water":
      options.bubblecolors.push("#fff");
      options.filter.svg = <WaterFilter />;
      break;
    case "grass":
      options;
      options.filter.svg = <></>;
      break;
    case "electric":
      options.bubbles = 20;
      options.distance = 25;
      options.filter.svg = <></>;
      break;
    case "bug":
      options.size = 6;
      options.opacity = "1";
      options.filter.svg = <BugFilter />;
      break;
    case "ground":
      options.size = 9;
      options.distance = 25;
      options.filter.svg = <GroundFilter />;
      break;
    case "rock":
      options.size = 9;
      options.distance = 25;
      options.filter.svg = <RockFilter />;
      break;
    case "poison":
      options.size = 5;
      options.opacity = "0.5";
      options.filter.svg = <PoisonFilter />;
      break;
    case "psychic":
      options.size = 5;
      options.opacity = "1";
      options.distance = 25;
      options.filter.svg = <PsychicFilter />;
      break;
    case "ghost":
      options.size = 5;
      options.opacity = "1";
      options.distance = 25;
      options.filter.svg = <GhostFilter />;
      break;
    case "dark":
      options.size = 5;
      options.opacity = "1";
      options.distance = 25;
      options.filter.svg = <DarkFilter />;
      break;
  }
  return options;
}

export function makeFooterAnimation(types, options, i) {
  return (
    <GoeFooter
      key={i}
      bubbles={options.bubbles}
      bubblecolors={options.bubblecolors}
      size={options.size}
      distance={options.distance}
      position={options.position}
      time={options.time}
      delay={options.dealy}
      filter={options.filter}
      opacity={options.opacity}
    />
  );
};