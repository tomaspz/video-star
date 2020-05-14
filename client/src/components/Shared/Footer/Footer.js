import React from "react";
import "./Footer.css";
import MovieDBLogo from "../../../img/moviedb-logo.png";

function Footer() {
  return (
    <footer className="page-footer font-small fixed-bottom pt-4">
      <div className="footer-copyright text-center py-3">
      <img className="mr-3" src={MovieDBLogo} alt="moviedb-logo" style={{ width: 204 }}/>
        © Copyright VideoStar 2020
      </div>
    </footer>
  );
}

export default Footer;
