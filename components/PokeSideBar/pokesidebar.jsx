import React from "react";
import GoeFooter from "../anim/GoeFooter/goefooter";
import { Colors, hexToRGB } from "../../helpers/Utils";
import { animated } from '@react-spring/web';

const PokeSideBar = props => {
  const { isOpen, currentPokemon, animOptions, footer, springs } = props;

  return (
    <animated.div
      className={isOpen ? "sidebar open" : "sidebar"}
      style={{ backgroundColor: currentPokemon ? hexToRGB(Colors[currentPokemon?.types[0]?.type?.name], 0.44) : "black", ...springs }}>
      {animOptions && <GoeFooter {...animOptions}></GoeFooter>}
    </animated.div>
  );
};
export default PokeSideBar;
