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
          <div key={i} className="burn">
            <div className="flame"></div>
            <div className="flame"></div>
            <div className="flame"></div>
            <div className="flame"></div>
            <div className="flame"></div>
            <div className="flame"></div>
            <div className="flame"></div>
            <div className="flame"></div>
            <div className="flame"></div>
            <div className="flame"></div>
          </div>
        );
      case "water":
        return <div key={i} className="watereffect"></div>;
      case "poison":
        return <div key={i} className="poisoneffect"></div>;
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
  pokemon: {},
};
export default PokeCard;
