import React from "react";
import { Modal, Button } from "react-bootstrap";
import { capitalizeFirstLetter, get } from "../../helpers/functions";
import { useState, useEffect } from "react";
import { Colors } from "../../helpers/Utils";
import PokeTabs from "../PokeTabs/poketabs";

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
      let species = undefined;
      if (props.pokemon.species.data === undefined)
        species = await get(
          "https://pokeapi.co/api/v2/pokemon-species/" + props.pokemon.id
        );
      else species = props.pokemon.species.data;
      if (species) {
        let evolutionChain = await get(species?.evolution_chain.url);
        let newPokemon = {};
        if (props.pokemon) {
          props.pokemon.species.data = species;
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
          <div>
            {pokemon.details?.name
              ? capitalizeFirstLetter(pokemon.details?.name)
              : "Pokemon"}
            <span>{"#" + pokemon.details?.id}</span>
          </div>
          <div className="chipsContainer">
            {pokemon?.details?.types?.map((el) => {
              return (
                <div
                  className="chip"
                  key={el.slot}
                  style={{ backgroundColor: "rgba(255,255,255,.5)" }}
                >
                  {el?.type?.name}
                </div>
              );
            })}
          </div>
        </Modal.Title>
        <div
          ref={(node) => {
            if (node) {
              node.style.setProperty(
                "background-image",
                `url(${gif})`,
                "important"
              );
            }
          }}
          className="pokeGif"
        />
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Header>
      <Modal.Body bg="dark">
        <PokeTabs bgcolor={color} pokemon={pokemon} initTabs={opened} />
      </Modal.Body>
      <Modal.Footer
        className={
          pokemon?.details.types
            ? pokemon?.details?.types[0]?.type.name + "-header"
            : ""
        }
      ></Modal.Footer>
    </Modal>
  );
};

export default PokeModal;
