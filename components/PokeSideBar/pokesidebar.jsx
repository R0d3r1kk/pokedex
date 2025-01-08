import React, { useRef } from "react";
import { Colors, hexToRGB } from "../../helpers/Utils";
import { animated } from '@react-spring/web';
import { CloseButton } from "react-bootstrap";

const PokeSideBar = props => {
  const { isOpen, close, currentPokemon, animOptions, footer, springs } = props;
  const sidebarRef = useRef(null);
  const getPokemonColor = () => {
    return hexToRGB(Colors[currentPokemon?.types[0]?.type?.name], .3)
  }

  return (
    <animated.div
      className={isOpen ? "sidebar open" : "sidebar"}
      style={{ ...springs }}
      ref={sidebarRef}
    >
      <svg xmlns="http://www.w3.org/2000/svg">
        <filter id="svgGradientMap">
          <fecolormatrix type="saturate" values="0" />
          <feComponentTransfer colorInterpolationFilters="sRGB">
            <feFuncR type="table" tableValues="1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1" />
            <feFuncG type="table" tableValues="1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1" />
            <feFuncB type="table" tableValues="1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1" />
          </feComponentTransfer>
        </filter>
      </svg>
      {footer}
      <CloseButton
        variant="white"
        onClick={(ev) => {
          ev.preventDefault();
          close(currentPokemon, animOptions, footer, sidebarRef);
        }} />
    </animated.div>
  );
};
export default PokeSideBar;
