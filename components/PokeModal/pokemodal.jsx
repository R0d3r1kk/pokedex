import React from "react";
import { Modal, Button } from "react-bootstrap";
import { capitalizeFirstLetter } from "../../helpers/Functions";
import { useState, useEffect } from "react";
import { Colors, PokeUrl } from "../../helpers/Utils";
import PokeTabs from "../PokeTabs/poketabs";
import GoeFooter from "../anim/GoeFooter/goefooter";

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

  useEffect(() => {
    if (opened && !isFinished) {
      loadGif();

      if (props.pokemon.species) {
        if (props.pokemon.types) {
          let types = props.pokemon.types;
          setColor(Colors[types[0].type.name]);
        }

        setPokemon(props.pokemon);
        console.log(props.pokemon);

        setFinished(true);
      }
    }

    // return () => {
    //   if (filter) props.animoptions.filter = filter;
    // };
  }, [opened, isFinished]);

  const loadGif = () => {
    if (opened) {
      const img = new Image();
      const src = PokeUrl.getUrl("PokemonGO", props.pokemon?.name.replace("-", "_"), ".png")
      img.src = src;

      img.onload = (data) => {
        setGif(src);
      };
      img.onerror = (ex) => {
        console.log(ex);
      }
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
            {pokemon?.name ? capitalizeFirstLetter(pokemon?.name) : "Pokemon"}
            <span>{"#" + pokemon?.id}</span>
          </div>
          <div className="chipsContainer">
            {pokemon?.types?.map((el) => {
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
        <GoeFooter {...props?.animoptions}></GoeFooter>
      </Modal.Header>

      <PokeTabs
        className={
          pokemon?.types ? pokemon?.types[0]?.type.name + "-header" : ""
        }
        bgcolor={color}
        pokemon={pokemon}
        initTabs={opened}
      />
    </Modal>
  );
};

export default PokeModal;
