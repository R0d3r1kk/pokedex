import React from "react";
import { Modal, Button, Col } from "react-bootstrap";
import { capitalizeFirstLetter, get } from "../../helpers/functions";
import { useState, useEffect } from "react";
import { Colors } from "../../helpers/Utils";

const PokeModal = (props) => {
  const [pokemon, setPokemon] = useState({
    details: { id: 0 },
    evolution: {},
    mega_evolution: {},
  });
  const [opened, setOpened] = useState(false);
  const [isFinished, setFinished] = useState(false);
  const [gif, setGif] = useState("/pokeball.svg");
  const [color, setColor] = useState("");

  useEffect(async () => {
    if (opened && !isFinished) {
      loadGif();
      let species = await get(
        "https://pokeapi.co/api/v2/pokemon-species/" + props.pokemon.id
      );
      if (species) {
        let evolutionChain = await get(species?.evolution_chain.url);
        let newPokemon = {};
        if (props.pokemon) {
          newPokemon.details = props.pokemon;
        }
        if (evolutionChain) {
          newPokemon.evolution = evolutionChain;
        }
        if (species.varieties) {
          newPokemon.mega_evolution = species.varieties;
        }
        if (props.pokemon.types) {
          let types = props.pokemon.types;
          setColor(Colors[types[0].type.name]);
        }

        setPokemon(newPokemon);
        console.log(newPokemon);
        setFinished(true);
      }
    }
  }, [opened]);

  const loadGif = () => {
    if (opened) {
      const img = new Image();
      const src =
        "https://projectpokemon.org/images/normal-sprite/" +
        props.pokemon?.name.replace("-", "_") +
        ".gif";
      img.src = src;

      img.onload = () => {
        setGif(src);
      };
    }
  };

  return (
    <Modal
      {...props}
      className="pokemodal"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onShow={() => {
        setFinished(false);
        setOpened(true);
      }}
    >
      <Modal.Header
        ref={(node) => {
          if (node) {
            node.style.setProperty(
              "background-color",
              `${color}d6`,
              "important"
            );
          }
        }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          <img
            width="70px"
            height="70px"
            defaultValue="/pokeball.svg"
            loading="lazy"
            alt={pokemon.details?.name}
            src={gif}
          />
          {pokemon.details?.name
            ? capitalizeFirstLetter(pokemon.details?.name)
            : "Pokemon"}
          <span>{"#" + pokemon.details?.id}</span>
        </Modal.Title>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Header>
      <Modal.Body bg="dark">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default PokeModal;
