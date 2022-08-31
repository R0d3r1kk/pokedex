import { Card, Badge } from "react-bootstrap";
import {
  getCardFormatByType,
  capitalizeFirstLetter,
} from "../../helpers/functions";
import { useEffect, useState } from "react";
import propTypes from "prop-types";
import PokeModal from "../PokeModal/pokemodal";
import GoeFooter from "../anim/GoeFooter/goefooter";
import { Colors } from "../../helpers/Utils";
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
} from "../../assets/svg/filters";

const PokeCard = ({ pokemon, modalshowevent }) => {
  const { id, name, sprites, types, species } = pokemon;
  const [modalShow, setModalShow] = useState(false);
  const [animOptions, setAnimOptions] = useState();
  const [cardFormat, setCardFormat] = useState({
    formatedTypes: [
      {
        color: "#000",
      },
    ],
  });

  useEffect(() => {
    if (types) {
      const format = getCardFormatByType(types);
      setCardFormat(format);
      const ftypes = format.formatedTypes;
      getOptions(ftypes);
    }
  }, [pokemon]);

  const getOptions = (ftypes) => {
    const _type = ftypes[0].name;
    const options = {
      bubbles: 100,
      bubblecolors: [...ftypes.map((item) => Colors[item.name])],
      size: 4,
      distance: 20,
      position: 106,
      time: 4,
      delay: 0,
      filter: { type: _type },
    };

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

    setAnimOptions(options);
  };

  const makeAnimation = (types, options, i) => {
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

  const formatForModal = () => {
    const opts = animOptions;

    opts.filter.type = "goe";
    opts.filter.svg = <GoeFilter />;
    opts.filter.height = "3rem";
    opts.bubbles = 150;
    opts.size = 6;
    return opts;
  };

  const PkCard = () => {
    return (
      <Card
        key={id}
        className={"pokecard " + cardFormat?.style?.className || ""}
        onClick={() => {
          setModalShow(true);
          modalshowevent(true);
        }}
      >
        <Card.Header>
          {capitalizeFirstLetter(name)}
          <Badge bg="danger">{"#" + id}</Badge>
        </Card.Header>
        <div className="img-wrapper">
          <Card.Img
            variant="top"
            src={
              JSON.parse(sprites[0].sprites).other["official-artwork"]
                .front_default
            }
          />
        </div>
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        </Card.Body>
        <div className="content">
          <div>
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
          <div className="pokecolor" style={{ color: species.color.name }}>
            {species.color.name}
          </div>
        </div>
        {animOptions &&
          makeAnimation(cardFormat?.formatedTypes, animOptions, 0)}
      </Card>
    );
  };

  return (
    <>
      <PkCard />
      {animOptions && (
        <PokeModal
          show={modalShow}
          fullscreen={true}
          onHide={() => {
            getOptions(cardFormat?.formatedTypes);
            setModalShow(false);
            modalshowevent(false);
          }}
          pokemon={pokemon}
          animoptions={modalShow ? formatForModal(animOptions) : animOptions}
        />
      )}
    </>
  );
};

PokeCard.propTypes = {
  pokemon: propTypes.object.isRequired,
  modalshowevent: propTypes.func,
};

PokeCard.defaultProps = {
  pokemon: {},
};
export default PokeCard;
