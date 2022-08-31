import React, { useState, useEffect, useRef } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Dropdown,
  Container,
  Form,
} from "react-bootstrap";
import propTypes from "prop-types";
import debounce from "lodash.debounce";

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
              <Dropdown.Item eventKey="30">30</Dropdown.Item>
              <Dropdown.Item eventKey="50">50</Dropdown.Item>
              <Dropdown.Item eventKey="100">100</Dropdown.Item>
              <Dropdown.Item eventKey="500">500</Dropdown.Item>
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
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
