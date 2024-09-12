import PropTypes from "prop-types"; // Import PropTypes
import React from "react";
import Footer from "./footer";
import Header from "./header";
function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow-1">
        {/* Your main content goes here */}
        {/* If there is no content, the footer will stick to the bottom. */}
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Define prop types for the Layout component
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
