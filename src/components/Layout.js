import { Outlet, Link } from "react-router-dom";

import Logo from "../static/logo.png";
import sanityClient from "../Client";
import React, { useState, useEffect } from "react";

import { IoMdMenu } from "react-icons/io";

import { RiFacebookCircleFill } from "react-icons/ri";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";

export default function Layout() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const [categoryLinks, setCategoryLinks] = useState([]);

  useEffect(() => {
    const fetchCategoryLinks = async () => {
      try {
        const data = await sanityClient.fetch(`
          *[_type == 'category'] | order(title asc) {
            title,
            slug,
          }
        `);
        setCategoryLinks(data);
      } catch (error) {
        console.error("Error fetching featured blog posts:", error);
      }
    };

    fetchCategoryLinks();
  }, []);

  return (
    <>
      <header>
        <title>The Query</title>
        <div className="mainLogoContainer">
          <img src={Logo} alt="Logo" className="mainLogo" />
        </div>
        <nav>
          <div className={`navLinks ${isMobileMenuOpen ? "active" : ""}`}>
            <Link to="/" onClick={closeMobileMenu}>
              Home
            </Link>

            <Link to="/archive" onClick={closeMobileMenu}>
              Archive
            </Link>

            <Link to="/about" onClick={closeMobileMenu}>
              About
            </Link>

            <Link to="/resources" onClick={closeMobileMenu}>
              Resources
            </Link>

            {categoryLinks.map((cat) => (
              <Link to={`/${cat.slug.current}`} onClick={closeMobileMenu}>
                {cat.title}
              </Link>
            ))}

            {/* <div className="socials">
              <a href="https://facebook.com">
                <RiFacebookCircleFill size={30} />
              </a>
              <a href="https://twitter.com">
                <AiFillTwitterCircle size={30} />
              </a>
              <a href="https://instagram.com">
                <AiFillInstagram size={30} />
              </a>
            </div> */}
          </div>
          <div className="menuToggle" onClick={toggleMobileMenu}>
            <IoMdMenu />
          </div>
        </nav>
      </header>

      <main>
        <div className="mainContent">
          <Outlet />
        </div>
      </main>

      <footer>
        <div className="footerContainer">
          <div className="footerLeft">
            {/* <p align="center">
              Kogi actually helvetica cred keytar occupy single-origin coffee
              asymmetrical gastropub cloud bread man bun messenger bag coloring
              book umami. Air plant distillery ennui, tbh mumblecore readymade
              fingerstache flexitarian pug try-hard ramps tacos bitters grailed.
              Beard listicle lo-fi lumbersexual.
            </p> */}
            {/* <div className="subscribe">
              <input type="email" placeholder="Subscribe to receive updates" />
              <button type="submit" className="submit">
                Submit
              </button>
            </div> */}
            <p align="center">
              <em>The Query &copy; 2024</em>
            </p>
          </div>
          <div className="footerRight">
            <img src={Logo} alt="Logo" className="footerLogo" />
            <ul>
              <li>
                <Link to="/staff">Staff Directory</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
