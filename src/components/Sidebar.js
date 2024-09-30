import {
    faHome,
    faListAlt,
    faShoppingCart,
    faSignOutAlt,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./css/Sidebar.css"; // Add a CSS file for styling the sidebar

const Sidebar = ({ setComponentName }) => {
  // Accept setComponentName as a prop
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  const getCname = (event) => {
    const cname = event.currentTarget.getAttribute("data-cname");
    setComponentName(cname); // Call the function passed as a prop with the cname
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li>
            <button onClick={getCname} data-cname="Welcome">
              {" "}
              {/* Update data-cname */}
              <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
              <span>Home</span>
            </button>
          </li>
          <li>
            <button onClick={getCname} data-cname="BGCategories">
              {" "}
              {/* Update data-cname */}
              <FontAwesomeIcon icon={faListAlt} className="sidebar-icon" />
              <span>Category</span>
            </button>
          </li>
          <li>
            <button onClick={getCname} data-cname="BGProducts">
              {/* Update data-cname */}
              <FontAwesomeIcon icon={faShoppingCart} className="sidebar-icon" />
              <span>Product</span>
            </button>
          </li>
          <li>
            <a href="/order">
              <FontAwesomeIcon icon={faShoppingCart} className="sidebar-icon" />
              <span>Order</span>
            </a>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <a href="/profile">
                  <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                  <span>Profile</span>
                </a>
              </li>
              <li>
                <button className="sidebar-btn" onClick={handleLogout}>
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="sidebar-icon"
                  />
                  <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <li>
              <a href="/login">
                <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                <span>Login</span>
              </a>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
