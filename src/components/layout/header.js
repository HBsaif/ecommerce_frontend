import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"; // Correct import for WhatsApp icon
import {
    faHeart,
    faSearch,
    faShoppingCart,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import "../css/header.css";

const Header = () => {
  return (
    <Navbar
      bg="light"
      expand="lg"
      className="py-3 fixed-top shadow-sm"
      style={{ width: "100%" }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        {/* Left Section - Empty */}
        <div className="d-none d-lg-flex"></div>

        {/* Brand Logo - Center */}
        <Navbar.Brand href="/" className="mx-auto text-center">
          <img
            src="/images/sbl.jfif" // Replace with your logo URL
            alt="Brand Logo"
            width="150px"
            height="50px"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        {/* Right Section - Search and Icons */}
        <div className="d-flex align-items-center">
          {/* Signin Icon */}
          <Nav.Link href="/login" className="mx-2">
            <FontAwesomeIcon
              icon={faUser}
              size="lg"
              style={{ color: "#000000" }}
            />
          </Nav.Link>

          {/* Wishlist Icon */}
          <Nav.Link href="/wishlist" className="mx-2">
            <FontAwesomeIcon
              icon={faHeart}
              size="lg"
              style={{ color: "#ff4081" }}
            />
          </Nav.Link>

          {/* Cart Icon */}
          <Nav.Link href="/cart" className="mx-2">
            <FontAwesomeIcon
              icon={faShoppingCart}
              size="lg"
              style={{ color: "#007bff" }}
            />
          </Nav.Link>

          {/* WhatsApp Icon */}
          <Nav.Link
            href="https://wa.me/your-number"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            <FontAwesomeIcon
              icon={faWhatsapp}
              size="lg"
              style={{ color: "#25D366" }}
            />
          </Nav.Link>

          {/* Search Box */}
          <Form className="d-flex mx-3">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              style={{ width: "200px" }}
            />
            <Button variant="outline-success">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </Form>
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
