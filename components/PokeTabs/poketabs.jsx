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
import { capitalizeFirstLetter } from "../../helpers/functions";

const PokeTabs = ({ bgcolor, pokemon, initTabs }) => {
  const [tabKey, setTabKey] = useState("about");
  const [tabColor, setTabColor] = useState();
  const [evos, setEvos] = useState([]);
  const [hasMega, setHasMega] = useState(false);

  useEffect(async () => {
    if (initTabs) {
      let evolutions = getEvolutions();
      setEvos(evolutions);

      let evoname = `${evolutions[evolutions.length - 1].name}-mega`;
      await fetchImage(evoname);
    }
  }, [pokemon.evolution, hasMega]);

  const TNav = ({ keyValue, color }) => {
    return (
      <Nav.Item>
        <Nav.Link
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
      <Stack direction="horizontal" gap={3}>
        <h5>{name}</h5>
        <ProgressBar variant="info" now={stat} label={`${stat}%`} />
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

  const getEvolutions = () => {
    let finished = false;
    let evolutions = [];
    const chain = pokemon.evolution?.chain;
    if (chain) {
      while (!finished) {
        const { evolves_to, species } = chain;

        let mTrigger = null;

        if (chain?.evolution_details?.length > 0) {
          const { trigger, min_level } = chain.evolution_details[0];
          mTrigger = {
            name: trigger.name,
            min_level,
          };
        }

        const evo = {
          name: species.name,
          url: species.url,
          trigger: mTrigger,
        };

        evolutions.push(evo);

        if (evolves_to.length > 0) chain = evolves_to[0];
        else finished = true;
      }

      return evolutions;
    }
  };
  return (
    <Navbar className="tabsContainer" expand="lg" bg="none" variant="dark">
      <Tab.Container
        defaultActiveKey={tabKey}
        mountOnEnter
        unmountOnExit
        onSelect={(key) => {
          setTabColor(bgcolor);
          setTabKey(key);
        }}
      >
        <Stack gap={3}>
          <Row className="tabsnav" sm={2}>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav variant="pills" className="me-auto">
                <TNav keyValue="about" color={tabColor || bgcolor} />
                <TNav keyValue="stats" color={tabColor || bgcolor} />
                <TNav keyValue="evolution" color={tabColor || bgcolor} />
                <TNav keyValue="moves" color={tabColor || bgcolor} />
              </Nav>
            </Navbar.Collapse>
          </Row>
          <Row className="tabsbody" sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="about">About</Tab.Pane>
              <Tab.Pane className="pokestats" eventKey="stats">
                <ListGroup>
                  {pokemon?.details?.stats?.map((item) => (
                    <Stat
                      key={item.stat.url}
                      name={item.stat.name}
                      stat={item.base_stat}
                    />
                  ))}
                </ListGroup>
              </Tab.Pane>
              <Tab.Pane className="pokevolution" eventKey="evolution">
                <Row gap={2}>
                  {evos?.map((item, i) => {
                    return (
                      <Col key={item.url + i}>
                        <Row>
                          <Col className="triggerContainer">
                            {item.trigger && (
                              <div
                                className="row trigger"
                                style={{ color: `${tabColor}86` }}
                              >
                                <span>{item.trigger.name}</span>
                                <span>{item.trigger.min_level}</span>
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
                              number={item.url.split("/")[6]}
                              trigger={item.trigger}
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
                        evos[evos.length - 1].name +
                        "-mega.gif"
                      }
                      name={evos[evos.length - 1].name + "-mega"}
                      number={""}
                    />
                  )}
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="moves">Moves</Tab.Pane>
            </Tab.Content>
          </Row>
        </Stack>
      </Tab.Container>
    </Navbar>
  );
};

PokeTabs.propTypes = {
  bgcolor: propTypes.string.isRequired,
  pokemon: propTypes.object.isRequired,
  initTabs: propTypes.bool,
};

PokeTabs.defaultProps = {
  bgcolor: "#fff",
  pokemon: {
    details: { id: 0 },
    evolution: {},
    mega_evolution: {},
  },
  initTabs: false,
};

export default PokeTabs;
