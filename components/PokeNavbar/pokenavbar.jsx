import React from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  DropdownButton,
  Dropdown,
  Container,
} from "react-bootstrap";

const PokeNavbar = (props) => {
  return (
    <Navbar {...props} fixed="top" bg="dark" variant="dark" expand="lg">
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

        <Navbar.Brand href="/">
          {props.offset + " - " + props.count}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title={"Limit " + props.limit}
              id="collasible-nav-dropdown"
              onSelect={props.onSelect}
            >
              <Dropdown.Item eventKey="10">10</Dropdown.Item>
              <Dropdown.Item eventKey="30">30</Dropdown.Item>
              <Dropdown.Item eventKey="50">50</Dropdown.Item>
              <Dropdown.Item eventKey="100">100</Dropdown.Item>
              <Dropdown.Item eventKey="500">500</Dropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PokeNavbar;
