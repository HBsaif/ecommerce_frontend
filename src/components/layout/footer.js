import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light py-4 mt-auto shadow-sm">
      <Container>
        <Row className="align-items-center">
          {/* Copyright Message */}
          <Col md={6} className="text-center text-md-left mb-3 mb-md-0">
            <p className="mb-0">&copy; {new Date().getFullYear()} Your Brand Name. All Rights Reserved.</p>
          </Col>

          {/* Social Icons */}
          <Col md={6} className="text-center text-md-right">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} size="lg" style={{ color: "#3b5998" }} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mx-2" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} size="lg" style={{ color: "#00acee" }} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} size="lg" style={{ color: "#C13584" }} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="mx-2" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} size="lg" style={{ color: "#0e76a8" }} />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
