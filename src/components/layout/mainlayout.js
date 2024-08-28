import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Header from './header';
import Footer from './footer';
function Layout({ children }) {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}

// Define prop types for the Layout component
Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
