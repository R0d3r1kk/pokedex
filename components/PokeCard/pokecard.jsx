import { Card, Badge, Stack } from "react-bootstrap";
import {
  getCardFormatByType,
  capitalizeFirstLetter,
} from "../../helpers/Functions";
import { useEffect, useRef, useState } from "react";
import { Colors, getGoeFooterOptions, makeFooterAnimation } from "../../helpers/Utils";

import { PokeUrl } from "../../helpers/Utils";

const PokeCard = ({ isOpen, pokemon, selected, onClick }) => {
  const { id, name, sprites, types, species } = pokemon;
  const [animOptions, setAnimOptions] = useState();
  const [cardFooter, setCardFooter] = useState();
  const [cardFormat, setCardFormat] = useState({
    formatedTypes: [
      {
        name: "",
        type: null,
        color: "#000",
      },
    ],
  });
  const cardRef = useRef(null);

  useEffect(() => {
    if (types) {
      const format = getCardFormatByType(types);

      setCardFormat(format);
      if (animOptions === undefined) {
        getOptions(format.formatedTypes);
      }
    }
  }, [pokemon]);

  const getOptions = (ftypes) => {
    
    let options = getGoeFooterOptions(ftypes);
    setAnimOptions(options);
    let footer = makeFooterAnimation(cardFormat?.formatedTypes, options, 0);
    setCardFooter(footer);
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
        ref={cardRef}
        id={name}
        className={"pokecard inactive " + cardFormat?.style?.className || ""}
        style={{
          "--shadow-bg":cardFormat?.formatedTypes[0].color
        }}
        onClick={(ev) => {
          ev.preventDefault();
          onClick(pokemon, animOptions, cardFooter)
        }}
      >
        <Card.Header>
          <Badge bg="" style={{ backgroundColor: species.color.name || "light" }}>{"#" + id}</Badge>
        </Card.Header>
        <div className="img-wrapper">
          <Card.Img variant="top" src={PokeUrl.getUrl("Shivam", id, ".png")} />
        </div>
        <Card.Body>
          <Card.Title>{capitalizeFirstLetter(name)}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
          <Stack direction="horizontal" gap={1}>
            {cardFormat?.formatedTypes?.map((poketype, idx) => {
              return (
                <div
                  key={poketype.name + "_" + idx}
                  className="icon"
                  style={{
                    backgroundColor: poketype?.color || "light",
                    boxShadow: "0 0 5px " + poketype?.color
                  }}>
                  {poketype.type_icon && <poketype.type_icon />}
                </div>
              );
            })}
          </Stack>
          </Card.Subtitle>
        </Card.Body>
        {animOptions &&
          cardFooter}
      </Card>
    );
  };

  return <PkCard />;
};

// PokeCard.propTypes = {
//   pokemon: propTypes.object.isRequired,
//   modalshowevent: propTypes.func,
// };

// PokeCard.defaultProps = {
//   pokemon: {},
// };
export default PokeCard;
