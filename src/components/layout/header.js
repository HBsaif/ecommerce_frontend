import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"; // Correct import for WhatsApp icon
import {
  faHeart,
  faSearch,
  faShoppingCart,
  faUser,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import "../css/header.css";


const Header = () => {
  const isLoggedIn = !!localStorage.getItem('accessToken');
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
            src="https://i.postimg.cc/x8ncvFjr/logo.png" // Replace with your logo URL
            alt="Brand Logo"
            // width="150px"
            // height="50px"
            // className="d-inline-block align-top"
          />
        </Navbar.Brand>

        {/* Right Section - Search and Icons */}
        <div className="d-flex align-items-center">
          {/* Signin Icon */}
          {/* Conditional rendering for user icon */}
          {isLoggedIn ? (
                        <Nav.Link href="/profile" className="mx-2">
                            <FontAwesomeIcon
                                icon={faUserCircle}
                                size="lg"
                                style={{ color: "#000000" }}
                            />
                        </Nav.Link>
                    ) : (
                        <Nav.Link href="/login" className="mx-2">
                            <FontAwesomeIcon
                                icon={faUser}
                                size="lg"
                                style={{ color: "#000000" }}
                            />
                        </Nav.Link>
                    )}

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

  // <section id="header">
  //       <a href="#">
  //         <img src="https://i.postimg.cc/x8ncvFjr/logo.png" alt="" />
  //       </a>
  //       <div>
  //         <ul id="navbar">
  //           <li>
  //             <a href="index.html" class="active">
  //               Home
  //             </a>
  //           </li>
  //           <li>
  //             <a href="shop.html">Shop</a>
  //           </li>
  //           <li>
  //             <a href="blog.html">Blog</a>
  //           </li>
  //           <li>
  //             <a href="about.html">About</a>
  //           </li>
  //           <li>
  //             <a href="contact.html">Contact</a>
  //           </li>
  //           <li>
  //             <a href="cart.html" id="lg-bag">
  //               <FontAwesomeIcon icon={faBagShopping} />
  //             </a>
  //             <span class="quantity">0</span>
  //           </li>
  //           <li>
  //             <a href="#" id="close">
  //               <i class="far fa-times"></i>
  //             </a>
  //           </li>
  //         </ul>
  //       </div>
  //       <div id="mobile">
  //         <a href="cart.html">
  //           <i class="fal fa-shopping-bag"></i>
  //           <span class="quantity">0</span>
  //         </a>
  //         <i id="bar" class="fas fa-outdent"></i>
  //       </div>
  //     </section>
  );
};

export default Header;
