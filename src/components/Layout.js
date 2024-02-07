import { Outlet, Link } from "react-router-dom";

import Logo from "../static/logo.png";
import React from "react";

// import { RiFacebookCircleFill } from "react-icons/ri";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
// import { BsSearchHeart } from "react-icons/bs";

export default function Layout() {
  return (
    <>
      <header>
        <title>The Query</title>
        <div className="mainLogoContainer">
          <img src={Logo} alt="Logo" className="mainLogo" />
        </div>
        <nav>
          <Link to="/">Home</Link>

          <Link to="/about">About</Link>

          <Link to="/contact">Contact</Link>

          <Link to="/resources">Resources</Link>

          <Link to="/videos">Videos</Link>

          <Link to="/photos">Photos</Link>

          <div className="socials">
            {/* <a href="https://facebook.com">
              <RiFacebookCircleFill size={30} />
            </a> */}
            <a href="https://twitter.com">
              <AiFillTwitterCircle size={30} />
            </a>
            <a href="https://instagram.com">
              <AiFillInstagram size={30} />
            </a>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <div className="footerContainer">
          <div className="footerLeft">
            <p>
              Kogi actually helvetica cred keytar occupy single-origin coffee
              asymmetrical gastropub cloud bread man bun messenger bag coloring
              book umami. Air plant distillery ennui, tbh mumblecore readymade
              fingerstache flexitarian pug try-hard ramps tacos bitters grailed.
              Beard listicle lo-fi lumbersexual.
            </p>
            <div className="subscribe">
              <input type="email" placeholder="Subscribe to receive updates" />
              <button type="submit" className="submit">
                Submit
              </button>
            </div>
            <p align="center">
              <em>The Query &copy; 2023</em>
            </p>
          </div>
          <div className="footerRight">
            <img src={Logo} alt="Logo" className="footerLogo" />
            <ul>
              <li>
                <a href="#">Staff Directory</a>
              </li>
              <li>
                <a href="#">Site Map</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
