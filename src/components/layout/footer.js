import React from "react";

const Footer = () => {
  return (
    // <footer className="bg-light py-4 mt-auto shadow-sm">
    //   <Container>
    //     <Row className="align-items-center">
    //       {/* Copyright Message */}
    //       <Col md={6} className="text-center text-md-left mb-3 mb-md-0">
    //         <p className="mb-0">&copy; {new Date().getFullYear()} Your Brand Name. All Rights Reserved.</p>
    //       </Col>

    //       {/* Social Icons */}
    //       <Col md={6} className="text-center text-md-right">
    //         <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2" aria-label="Facebook">
    //           <FontAwesomeIcon icon={faFacebook} size="lg" style={{ color: "#3b5998" }} />
    //         </a>
    //         <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mx-2" aria-label="Twitter">
    //           <FontAwesomeIcon icon={faTwitter} size="lg" style={{ color: "#00acee" }} />
    //         </a>
    //         <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2" aria-label="Instagram">
    //           <FontAwesomeIcon icon={faInstagram} size="lg" style={{ color: "#C13584" }} />
    //         </a>
    //         <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="mx-2" aria-label="LinkedIn">
    //           <FontAwesomeIcon icon={faLinkedin} size="lg" style={{ color: "#0e76a8" }} />
    //         </a>
    //       </Col>
    //     </Row>
    //   </Container>
    // </footer>

    <footer class="section-p1">
        <div class="col">
          <a href="#">
            <img class="logo" src="https://i.postimg.cc/x8ncvFjr/logo.png" />
          </a>
          <h4>Contact</h4>
          <p>
            <strong>Address:</strong>349, Olorilogbon street, Onigbogbo Lagos
          </p>
          <p>
            <strong>Phone:</strong>+23456876199, +23458903120
          </p>
          <p>
            <strong>Hours:</strong>10.00 - 18.00, Mon - Sat
          </p>
          <div class="follow">
            <h4>Follow Us</h4>
            <div class="icon">
              <i class="fab fa-facebook-f"></i>
              <i class="fab fa-instagram"></i>
              <i class="fab fa-twitter"></i>
              <i class="fab fa-youtube"></i>
              <i class="fab fa-pinterest-p"></i>
            </div>
          </div>
        </div>

        <div class="sec">
          <div class="col">
            <h4>About</h4>
            <a href="#">About Us</a>
            <a href="#">Delivery Information</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms and Condition</a>
            <a href="#">Contact Us</a>
          </div>

          <div class="col">
            <h4>My Account</h4>
            <a href="#">Sign In</a>
            <a href="#">View Cart</a>
            <a href="#">My Account</a>
            <a href="#">My Wishlist</a>
            <a href="#">Track my Order</a>
            <a href="#">Help</a>
          </div>

          <div class="col install">
            <h4>Install App</h4>
            <p>From App Store or Google Play</p>

            <div class="row">
              <img src="https://i.postimg.cc/Y2s5mLdR/app.jpg" alt="" />
              <img src="https://i.postimg.cc/7YvyWTS6/play.jpg" alt="" />
            </div>
            <p>Secured Payment Gateways</p>
            <img src="https://i.postimg.cc/kgfzqVRW/pay.png" alt="" />
          </div>
        </div>

        <div class="coypright">
          <p> © 2023 All rights reserved! made by Tunrayo </p>
        </div>
      </footer>
  );
};

export default Footer;
