import PropTypes from 'prop-types'; // Import PropTypes
import React from 'react';
import Footer from './footer';
import Header from './header';
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
