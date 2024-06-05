import React, { useState, useEffect, useRef } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Dropdown,
  Container,
  Form,
  Stack,
  Collapse
} from "react-bootstrap";
import propTypes from "prop-types";
import { getFilterIcons } from "../../helpers/Utils.jsx";

const PokeNavbar = ({
  limit,
  offset,
  count,
  filter,
  onFilterSelect,
  onLimitSelect,
  onSearchChange,
}) => {
  const filterRef = useRef();
  const [search, setSearch] = useState("");
  useEffect(() => {
    let delayTimeOutFunction;

    if (!filterRef.current) {
      filterRef.current = true;
    } else {
      // componentDidMount equivalent
      delayTimeOutFunction = setTimeout(() => {
        onSearchChange(search);
      }, 500); // denounce delay
    }
    return () => clearTimeout(delayTimeOutFunction);
  }, [search]);

  return (
    <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src="/pokeball.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Pokemons"
          />{" "}
          Pokemons
        </Navbar.Brand>

        <Navbar.Brand href="/">{offset + " - " + count}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title={"Limit " + limit}
              defaultValue={limit}
              id="collasible-nav-dropdown"
              onSelect={onLimitSelect}
            >
              <Dropdown.Item eventKey="10">10</Dropdown.Item>
              <Dropdown.Item eventKey="50">50</Dropdown.Item>
              <Dropdown.Item eventKey="100">100</Dropdown.Item>
              <Dropdown.Item eventKey="300">300</Dropdown.Item>
              <Dropdown.Item eventKey="500">500</Dropdown.Item>
              <Dropdown.Item eventKey="800">800</Dropdown.Item>
              <Dropdown.Item eventKey="1000">1000</Dropdown.Item>
              <Dropdown.Item eventKey={count}>{count}</Dropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={"Filter " + filter}
              defaultValue={filter}
              id="navbarScrollingDropdown"
              onSelect={onFilterSelect}
            >
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="Type">By Type</Dropdown.Item>
              <Dropdown.Item eventKey="Generation">By Generation</Dropdown.Item>
              <Dropdown.Item eventKey="Version">By Version</Dropdown.Item>
              <Dropdown.Item eventKey="Color">By Color</Dropdown.Item>
            </NavDropdown>
            <Collapse in={filter === "Type"} >
              <Stack className="type_filter" direction="horizontal" gap={1}>
                {getFilterIcons().map((f, idx) => {
                  return <div
                    key={f.type_name + "_" + idx}
                    className="icon"
                    style={{ 
                      backgroundColor: f?.type_color || "light",
                      boxShadow: "0 0 5px " + f?.type_color
                    }}
                    onClick={(ev) => {
                      onFilterSelect("Type");
                      onSearchChange(f.type_name);
                    }}>
                    {f.type_icon &&
                      <f.type_icon onClick={(ev) => {
                        onFilterSelect("Type");
                        onSearchChange(f.type_name);
                      }} />}
                  </div>
                })}
              </Stack>
            </Collapse>
          </Nav>
          <Form className="d-flex">
            <Stack direction="horizontal" gap={3}>
              {/* <Form.Range name="limit" min={10} max={count} value={limit} onChange={(ev) => {
                onLimitSelect(ev.target.value);
              }
              } /> */}

              <Form.Control
                type="number"
                max={count}
                value={limit}
                onChange={(ev) => onLimitSelect(ev.target.value)}
              />
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Stack>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

PokeNavbar.propTypes = {
  offset: propTypes.number,
  limit: propTypes.number,
  count: propTypes.number,
  searchparam: propTypes.string,
  filter: propTypes.string,
  onFilterSelect: propTypes.func,
  onLimitSelect: propTypes.func,
  onSearchChange: propTypes.func,
};

export default PokeNavbar;
