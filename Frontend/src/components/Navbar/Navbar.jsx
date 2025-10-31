import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        {/* <span role="img" aria-label="gov">🏛️</span> */}
        {/* <span>Government Data Portal</span> */}
      </div>

      <nav className={styles.navLinks}>
        <Link
          to="/"
          className={`${styles.link} ${
            location.pathname === "/" ? styles.active : ""
          }`}
        >
          {/* Dashboard */}
        </Link>
        <Link
          to="/about"
          className={`${styles.link} ${
            location.pathname === "/about" ? styles.active : ""
          }`}
        >
          {/* About */}
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
