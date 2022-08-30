import React from "react";

const GoeFooter = (props) => {
  function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);

    return parseFloat(str);
  }

  return (
    <div
      className="goefooter"
      style={{ opacity: props.opacity ? props.opacity : "0.6" }}
    >
      <div
        className="bubbles"
        style={{
          "--footer-background": props?.bubblecolors[0],
          height: props.filter.height ? props.filter.height || "1rem" : "0",
          filter: props?.filter
            ? `url('#${props.filter.type}filter_svg__blob')`
            : "url('#blob')",
        }}
      >
        {Array.apply(null, { length: props?.bubbles }).map((item, idx) => (
          <div
            key={idx}
            className="bubble"
            style={{
              "--footer-bubble-background": `${
                props?.bubblecolors[
                  getRandomFloat(0, props?.bubblecolors?.length, 0)
                ]
              }`,
              "--size": `${getRandomFloat(0, props?.size || 4, 12)}rem`,
              "--distance": `${getRandomFloat(
                0,
                props?.distance || 10,
                12
              )}rem`,
              "--position": `${getRandomFloat(
                -3,
                props?.position || 106,
                12
              )}%`,
              "--time": `${getRandomFloat(1, props?.time || 4, 12)}s`,
              "--delay": `${getRandomFloat(-3, props?.delay || 0, 12)}s`,
            }}
          ></div>
        ))}
      </div>
      {props?.filter.svg}
    </div>
  );
};
export default GoeFooter;
