import { Card, Badge } from "react-bootstrap";
import { getCardFormatByType, capitalizeFirstLetter } from "../../helpers/functions";
import { useEffect, useState } from "react";
import propTypes from "prop-types";
import PokeModal from "../PokeModal/pokemodal";

const PokeCard = ({ pokemon }) => {
  const { id, name, sprites, types } = pokemon;
  const [modalShow, setModalShow] = useState(false);
  const [cardFormat, setCardFormat] = useState({
    formatedTypes: [
      {
        color: "#000",
      },
    ],
  });

  useEffect(() => {
    if (types) setCardFormat(getCardFormatByType(types));
  }, [pokemon]);

  const makeAnimation = (type, i) => {
    switch (type?.name) {
      case "fire":
        return (
          <div key={i} class="burn">
            <div class="flame"></div>
            <div class="flame"></div>
            <div class="flame"></div>
            <div class="flame"></div>
            <div class="flame"></div>
            <div class="flame"></div>
            <div class="flame"></div>
            <div class="flame"></div>
            <div class="flame"></div>
            <div class="flame"></div>
          </div>
        );
      case "water":
        return <div class="watereffect"></div>;
      case "poison":
        return <div class="poisoneffect"></div>;
    }
  };

  const PkCard = () => {
    return (
      <Card
        key={id}
        className={"pokecard " + cardFormat?.style?.className || ""}
        onClick={() => setModalShow(true)}
      >
        <Card.Header>
          {capitalizeFirstLetter(name)}
          <Badge pill bg="danger">
            {"#" + id}
          </Badge>
        </Card.Header>
        <div className="img-wrapper">
          <Card.Img
            variant="top"
            src={sprites.other["official-artwork"].front_default}
          />
        </div>
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        </Card.Body>
        <div className="content">
          {cardFormat?.formatedTypes?.map((poketype) => {
            return (
              <Badge
                key={name + "_" + poketype?.name + "_" + poketype.type}
                bg="none"
                style={{ backgroundColor: poketype?.color || "light" }}
              >
                {poketype?.name}
              </Badge>
            );
          })}
        </div>
        {cardFormat?.formatedTypes?.map((poketype, i) =>
          makeAnimation(poketype, i)
        )}
      </Card>
    );
  };

  return (
    <>
      <PkCard />
      <PokeModal
        show={modalShow}
        fullscreen={true}
        onHide={() => setModalShow(false)}
        pokemon={pokemon}
      />
    </>
  );
};

PokeCard.propTypes = {
  pokemon: propTypes.object.isRequired,
};

PokeCard.defaultProps = {
  pokemon: {
    abilities: [
      {
        ability: {
          name: "overgrow",
          url: "https://pokeapi.co/api/v2/ability/65/",
        },
        is_hidden: false,
        slot: 1,
      },
      {
        ability: {
          name: "chlorophyll",
          url: "https://pokeapi.co/api/v2/ability/34/",
        },
        is_hidden: true,
        slot: 3,
      },
    ],
    base_experience: 64,
    forms: [
      {
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon-form/1/",
      },
    ],
    height: 7,
    held_items: [],
    id: 1,
    is_default: true,
    location_area_encounters: "https://pokeapi.co/api/v2/pokemon/1/encounters",
    name: "bulbasaur",
    order: 1,
    sprites: {
      back_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
      back_female: null,
      back_shiny:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
      back_shiny_female: null,
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      front_female: null,
      front_shiny:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
      front_shiny_female: null,
      other: {
        dream_world: {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
          front_female: null,
        },
        home: {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
          front_female: null,
          front_shiny:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/1.png",
          front_shiny_female: null,
        },
        "official-artwork": {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        },
      },
      versions: {
        "generation-i": {
          "red-blue": {
            back_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/back/1.png",
            back_gray:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/back/gray/1.png",
            back_transparent:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/back/1.png",
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/1.png",
            front_gray:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/gray/1.png",
            front_transparent:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/1.png",
          },
          yellow: {
            back_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/back/1.png",
            back_gray:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/back/gray/1.png",
            back_transparent:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/transparent/back/1.png",
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/1.png",
            front_gray:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/gray/1.png",
            front_transparent:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/transparent/1.png",
          },
        },
        "generation-ii": {
          crystal: {
            back_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/back/1.png",
            back_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/back/shiny/1.png",
            back_shiny_transparent:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/back/shiny/1.png",
            back_transparent:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/back/1.png",
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/1.png",
            front_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/shiny/1.png",
            front_shiny_transparent:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/shiny/1.png",
            front_transparent:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/1.png",
          },
          gold: {
            back_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/gold/back/1.png",
            back_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/gold/back/shiny/1.png",
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/gold/1.png",
            front_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/gold/shiny/1.png",
            front_transparent:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/gold/transparent/1.png",
          },
          silver: {
            back_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/silver/back/1.png",
            back_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/silver/back/shiny/1.png",
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/silver/1.png",
            front_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/silver/shiny/1.png",
            front_transparent:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/silver/transparent/1.png",
          },
        },
        "generation-iii": {
          emerald: {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/1.png",
            front_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/shiny/1.png",
          },
          "firered-leafgreen": {
            back_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/back/1.png",
            back_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/back/shiny/1.png",
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/1.png",
            front_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/shiny/1.png",
          },
          "ruby-sapphire": {
            back_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire/back/1.png",
            back_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire/back/shiny/1.png",
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire/1.png",
            front_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire/shiny/1.png",
          },
        },
        "generation-iv": {
          "diamond-pearl": {
            back_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/back/1.png",
            back_female: null,
            back_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/back/shiny/1.png",
            back_shiny_female: null,
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/1.png",
            front_female: null,
            front_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/shiny/1.png",
            front_shiny_female: null,
          },
          "heartgold-soulsilver": {
            back_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/back/1.png",
            back_female: null,
            back_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/back/shiny/1.png",
            back_shiny_female: null,
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/1.png",
            front_female: null,
            front_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/shiny/1.png",
            front_shiny_female: null,
          },
          platinum: {
            back_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/back/1.png",
            back_female: null,
            back_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/back/shiny/1.png",
            back_shiny_female: null,
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/1.png",
            front_female: null,
            front_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/shiny/1.png",
            front_shiny_female: null,
          },
        },
        "generation-v": {
          "black-white": {
            animated: {
              back_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/1.gif",
              back_female: null,
              back_shiny:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/shiny/1.gif",
              back_shiny_female: null,
              front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif",
              front_female: null,
              front_shiny:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/1.gif",
              front_shiny_female: null,
            },
            back_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/back/1.png",
            back_female: null,
            back_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/back/shiny/1.png",
            back_shiny_female: null,
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/1.png",
            front_female: null,
            front_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/shiny/1.png",
            front_shiny_female: null,
          },
        },
        "generation-vi": {
          "omegaruby-alphasapphire": {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/omegaruby-alphasapphire/1.png",
            front_female: null,
            front_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/omegaruby-alphasapphire/shiny/1.png",
            front_shiny_female: null,
          },
          "x-y": {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/1.png",
            front_female: null,
            front_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/shiny/1.png",
            front_shiny_female: null,
          },
        },
        "generation-vii": {
          icons: {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/1.png",
            front_female: null,
          },
          "ultra-sun-ultra-moon": {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/1.png",
            front_female: null,
            front_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/shiny/1.png",
            front_shiny_female: null,
          },
        },
        "generation-viii": {
          icons: {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/1.png",
            front_female: null,
          },
        },
      },
    },
    stats: [
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: "hp",
          url: "https://pokeapi.co/api/v2/stat/1/",
        },
      },
      {
        base_stat: 49,
        effort: 0,
        stat: {
          name: "attack",
          url: "https://pokeapi.co/api/v2/stat/2/",
        },
      },
      {
        base_stat: 49,
        effort: 0,
        stat: {
          name: "defense",
          url: "https://pokeapi.co/api/v2/stat/3/",
        },
      },
      {
        base_stat: 65,
        effort: 1,
        stat: {
          name: "special-attack",
          url: "https://pokeapi.co/api/v2/stat/4/",
        },
      },
      {
        base_stat: 65,
        effort: 0,
        stat: {
          name: "special-defense",
          url: "https://pokeapi.co/api/v2/stat/5/",
        },
      },
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: "speed",
          url: "https://pokeapi.co/api/v2/stat/6/",
        },
      },
    ],
    types: [
      {
        slot: 1,
        type: {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/",
        },
      },
      {
        slot: 2,
        type: {
          name: "poison",
          url: "https://pokeapi.co/api/v2/type/4/",
        },
      },
    ],
    weight: 69,
  },
};
export default PokeCard;
