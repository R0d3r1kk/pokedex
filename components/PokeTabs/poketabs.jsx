import React, { useState, useEffect } from "react";
import {
  Tab,
  Row,
  Col,
  Navbar,
  Nav,
  ListGroup,
  ProgressBar,
  Stack,
  Card,
} from "react-bootstrap";
import propTypes from "prop-types";
import { capitalizeFirstLetter } from "../../helpers/Functions";
import { Colors } from "../../helpers/Utils";

const PokeTabs = ({ bgcolor, pokemon, initTabs, className }) => {
  const [tabKey, setTabKey] = useState("about");
  const [tabColor, setTabColor] = useState();
  const [hasMega, setHasMega] = useState(false);
  const [megaName, setMegaName] = useState();

  useEffect(async () => {
    if (initTabs) {
      let megaName = `${pokemon?.species?.evolution_chain?.chain[2]?.name}-mega`;
      setTabColor(Colors[pokemon?.types[0]?.type.name]);
      setMegaName(megaName);
      await fetchImage(megaName);
    }
  }, [pokemon.evolution, hasMega]);

  const TNav = ({ keyValue, color }) => {
    return (
      <Nav.Item>
        <Nav.Link
          onClick={() => setTabKey(keyValue.toLowerCase())}
          eventKey={keyValue?.toLowerCase()}
          ref={(node) => {
            if (node) {
              node.style.setProperty(
                "background-color",
                `${color}d6`,
                tabKey == keyValue ? "important" : ""
              );
            }
          }}
        >
          {capitalizeFirstLetter(keyValue)}
        </Nav.Link>
      </Nav.Item>
    );
  };

  const Stat = ({ name, stat = 0 }) => {
    return (
      <Stack direction="horizontal" gap={1}>
        <h5>{name}</h5>
        <ProgressBar now={stat} label={`${stat}%`} />
      </Stack>
    );
  };
  const EvoCard = (props) => {
    return (
      <Card
        {...props}
        className={props.name.includes("mega") ? "evocard mega" : "evocard"}
      >
        <Card.Img variant="top" src={props.url} />
        <Card.Body>
          <Card.Title style={{ color: tabColor }}>
            {capitalizeFirstLetter(props.name)}
          </Card.Title>
          <Card.Subtitle
            className={pokemon?.details?.name == props.name ? "active" : ""}
          >
            {`#${props.number}`}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    );
  };
  const fetchImage = async (name, prefix = "normal") => {
    const imageUrl =
      "https://projectpokemon.org/images/" +
      prefix +
      "-sprite/" +
      name +
      ".gif";
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      if (prefix === "normal") {
        setHasMega(true);
      }
    };

    img.onerror = () => {
      if (prefix === "normal") {
        setHasMega(false);
      }
    };
  };

  return (
    <div
      className={`tabsContainer ${className}`}
      expand="lg"
      bg="none"
      variant="dark"
    >
      <Stack gap={1}>
        <Navbar className="tabsnav" collapseOnSelect expand="lg" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav variant="pills" className="me-auto">
              <TNav keyValue="about" color={tabColor || bgcolor} />
              <TNav keyValue="stats" color={tabColor || bgcolor} />
              <TNav keyValue="evolution" color={tabColor || bgcolor} />
              <TNav keyValue="moves" color={tabColor || bgcolor} />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Row className="tabsbody">
          <Tab.Content>
            <Tab.Pane
              active={tabKey == "about"}
              className="about"
              eventKey="about"
            >
              {pokemon?.abilities?.map((item) => (
                <Row key={item.slot}>
                  <h4>{item.ability.name}</h4>{" "}
                  <p>{item.ability.effect[1].effect}</p>
                </Row>
              ))}
            </Tab.Pane>
            <Tab.Pane
              active={tabKey == "stats"}
              className="pokestats"
              eventKey="stats"
            >
              <ListGroup>
                {pokemon?.stats?.map((item) => (
                  <Stat
                    key={item.stat.id}
                    name={item.stat.name}
                    stat={item.base_stat}
                  />
                ))}
              </ListGroup>
            </Tab.Pane>
            <Tab.Pane
              active={tabKey == "evolution"}
              className="pokevolution"
              eventKey="evolution"
            >
              <Row gap={2}>
                {pokemon?.species?.evolution_chain?.chain?.map((item, i) => {
                  return (
                    <Col key={item.id + i}>
                      <Row>
                        <Col className="triggerContainer">
                          {item?.evolution_details.length > 0 && (
                            <div
                              className="row trigger"
                              style={{ color: `${tabColor}86` }}
                            >
                              <span>
                                {item.evolution_details[0].trigger.name}
                              </span>
                              <span>{item.evolution_details[0].min_level}</span>
                            </div>
                          )}
                        </Col>
                        <Col className="evocardContainer">
                          <EvoCard
                            url={
                              "https://projectpokemon.org/images/normal-sprite/" +
                              item.name +
                              ".gif"
                            }
                            name={item.name}
                            number={item.id}
                            trigger={item?.evolution_details[0]?.trigger}
                          />
                        </Col>
                      </Row>
                    </Col>
                  );
                })}
              </Row>
              <Row>
                {hasMega && (
                  <EvoCard
                    url={
                      "https://projectpokemon.org/images/normal-sprite/" +
                      megaName +
                      ".gif"
                    }
                    name={megaName}
                    number={pokemon?.species?.evolution_chain?.chain[2]?.id}
                    trigger={
                      pokemon?.species?.evolution_chain?.chain[2]
                        ?.evolution_details[0]?.trigger
                    }
                  />
                )}
              </Row>
            </Tab.Pane>
            <Tab.Pane active={tabKey == "moves"} eventKey="moves">
              Moves
            </Tab.Pane>
          </Tab.Content>
        </Row>
      </Stack>
    </div>
  );
};

PokeTabs.propTypes = {
  bgcolor: propTypes.string.isRequired,
  pokemon: propTypes.object.isRequired,
  initTabs: propTypes.bool,
  className: propTypes.string,
};

PokeTabs.defaultProps = {
  bgcolor: "#fff",
  pokemon: {
    details: { id: 0 },
    evolution: {},
    mega_evolution: {},
  },
  initTabs: false,
  className: "",
};

export default PokeTabs;
