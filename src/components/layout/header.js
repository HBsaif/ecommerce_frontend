import React, { useEffect, useState } from "react";
import { Badge, Button, Dropdown, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import "../css/header.css";

import searchIcon from "../assets/icons/search.svg";
import cartIcon from "../assets/icons/shopping-cart.svg";
import userCircleIcon from "../assets/icons/user-circle.svg";
import userIcon from "../assets/icons/user.svg";
import whatsappIcon from "../assets/icons/whatsapp.svg";
import heartIcon from "../assets/icons/wishlist.svg";

const Header = () => {
  const [cartItems, setCartItems] = useState(0);

  const isLoggedIn = !!localStorage.getItem("accessToken");

  // Fetch cartItems from localStorage
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(parseInt(storedCartItems, 10)); // Update cartItems state
    }
  }, []);

  return (
    <Navbar bg="light" expand="lg" className="py-3 fixed-top shadow-sm" style={{ width: "100%" }}>
      <div className="container d-flex justify-content-between align-items-center">

        <Navbar.Brand href="/" className="mx-auto text-center">
          <img src="https://i.postimg.cc/x8ncvFjr/logo.png" alt="Brand Logo" />
        </Navbar.Brand>

        <div className="d-flex align-items-center">
          <Nav.Link href="/wishlist" className="mx-2">
            <img src={heartIcon} alt="Wishlist" style={{ width: "24px", height: "24px", color: "#ff4081" }} />
          </Nav.Link>

          <Nav.Link href="/cart" className="mx-2 position-relative">
            <img src={cartIcon} alt="Cart" style={{ width: "24px", height: "24px", color: "#007bff" }} />
            {cartItems > 0 && (
              <Badge pill bg="danger" style={{ position: "absolute", top: "-5px", right: "-10px", fontSize: "0.75rem" }}>
                {cartItems}
              </Badge>
            )}
          </Nav.Link>

          <Nav.Link
            href="https://wa.me/your-number"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            <img src={whatsappIcon} alt="WhatsApp" style={{ width: "24px", height: "24px", color: "#25D366" }} />
          </Nav.Link>

          <Form className="d-flex mx-3">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              style={{ width: "200px" }}
            />
            <Button variant="outline-success">
              <img src={searchIcon} alt="Search" style={{ width: "16px", height: "16px" }} />
            </Button>
          </Form>

          {isLoggedIn ? (
            <Dropdown>
              <Dropdown.Toggle id="userDropdown" className="mx-2" variant="link">
                <img src={userCircleIcon} alt="User" style={{ width: "24px", height: "24px" }} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/profile">View Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Nav.Link href="/login" className="mx-2">
              <img src={userIcon} alt="Login" style={{ width: "24px", height: "24px" }} />
            </Nav.Link>
          )}
        </div>
      </div>
    </Navbar>
  );
};

const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("cartItems"); // Clear cartItems on logout
  window.location.href = "/login";
};

export default Header;
