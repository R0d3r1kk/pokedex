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

const PokeCard = ({ pokemon }) => {
  const { id, name, sprites, types, species } = pokemon;
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

  const makeAnimation = (types, i) => {
    switch (types[0]?.name) {
      case "normal":
        return (
          <GoeFooter
            key={i}
            bubbles={100}
            bubblecolors={types.map((item) => Colors[item.name])}
            size={6}
            distance={20}
            position={106}
            time={4}
            delay={0}
            filter={{ type: "normal", svg: <NormalFilter /> }}
          />
        );
      case "fire":
        return (
          <GoeFooter
            key={i}
            bubbles={100}
            bubblecolors={types.map((item) => Colors[item.name])}
            size={6}
            distance={20}
            position={106}
            time={4}
            delay={0}
            filter={{ type: "goe", svg: <GoeFilter />, height: "1rem" }}
          />
        );
      case "water":
        return (
          <GoeFooter
            key={i}
            bubbles={100}
            bubblecolors={[...types.map((item) => Colors[item.name]), "#fff"]}
            size={4}
            distance={20}
            position={106}
            time={4}
            delay={0}
            filter={{ type: "water", svg: <WaterFilter /> }}
          />
        );
      case "grass":
        return <></>;
      case "bug":
        return (
          <GoeFooter
            key={i}
            bubbles={100}
            bubblecolors={types.map((item) => Colors[item.name])}
            size={6}
            distance={20}
            position={106}
            time={4}
            delay={0}
            filter={{ type: "bug", svg: <BugFilter /> }}
            opacity="1"
          />
        );
      case "ground":
        return (
          <GoeFooter
            key={i}
            bubbles={100}
            bubblecolors={types.map((item) => Colors[item.name])}
            size={9}
            distance={25}
            position={106}
            time={4}
            delay={0}
            filter={{ type: "ground", svg: <GroundFilter /> }}
          />
        );
      case "rock":
        return (
          <GoeFooter
            key={i}
            bubbles={100}
            bubblecolors={types.map((item) => Colors[item.name])}
            size={9}
            distance={25}
            position={106}
            time={4}
            delay={0}
            filter={{ type: "rock", svg: <RockFilter /> }}
          />
        );
      case "poison":
        return (
          <GoeFooter
            key={i}
            bubbles={100}
            bubblecolors={types.map((item) => Colors[item.name])}
            size={5}
            distance={20}
            position={106}
            time={4}
            delay={0}
            filter={{ type: "poison", svg: <PoisonFilter /> }}
            opacity="0.5"
          />
        );
      case "psychic":
        return (
          <GoeFooter
            key={i}
            bubbles={100}
            bubblecolors={types.map((item) => Colors[item.name])}
            size={5}
            distance={25}
            position={106}
            time={4}
            delay={0}
            filter={{
              type: "psychic",
              svg: <PsychicFilter />,
            }}
            opacity="1"
          />
        );
      case "ghost":
        return (
          <GoeFooter
            key={i}
            bubbles={100}
            bubblecolors={types.map((item) => Colors[item.name])}
            size={5}
            distance={25}
            position={106}
            time={4}
            delay={0}
            filter={{ type: "ghost", svg: <GhostFilter /> }}
            opacity="1"
          />
        );
      case "dark":
        return (
          <GoeFooter
            key={i}
            bubbles={100}
            bubblecolors={types.map((item) => Colors[item.name])}
            size={5}
            distance={25}
            position={106}
            time={4}
            delay={0}
            filter={{ type: "dark", svg: <DarkFilter /> }}
            opacity="1"
          />
        );
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
        {makeAnimation(cardFormat?.formatedTypes, 0)}
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
  pokemon: {},
};
export default PokeCard;
