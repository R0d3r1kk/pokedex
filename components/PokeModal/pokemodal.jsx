import React from "react";
import { Modal, Button } from "react-bootstrap";
import propTypes from "prop-types";
import { capitalizeFirstLetter, get } from "../../helpers/functions";
import { useState, useEffect } from "react";

const PokeModal = (props) => {
  const [pokemon, setPokemon] = useState({
    details: { id: 0 },
    evolution: {},
    mega_evolution: {}
  });
  const [opened, setOpened] = useState(false);
  const [isFinished, setFinished] = useState(false);

  useEffect(async () => {
    if (opened && !isFinished) {
      let species = await get(
        "https://pokeapi.co/api/v2/pokemon-species/" + props.pokemon.id
      );
      if (species) {
        let evolutionChain = await get(species?.evolution_chain.url);
        let newPokemon = {}
        if (props.pokemon) {
          newPokemon.details = props.pokemon
        }
        if(evolutionChain){
          newPokemon.evolution= evolutionChain;
        }
        if(species.varieties){
          newPokemon.mega_evolution= species.varieties
        }
        setPokemon(newPokemon)
        console.log(newPokemon)
        setFinished(true);
      }
    }
  }, [opened]);
  
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
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {capitalizeFirstLetter(pokemon.details?.name)}
        </Modal.Title>
        <Button variant="dark" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Header>
      <Modal.Body bg="dark">
        <h4>Centered Modal</h4>
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
