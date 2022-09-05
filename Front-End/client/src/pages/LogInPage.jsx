import React from "react";
import FooterLogo from "../components/FooterLogo";
import { Link } from "react-router-dom";
import BtnGoogle from "../components/BtnGoogle";
import { Divider, Button, TextField } from "@mui/material";

function LogInPage() {
  return (
    <>
      <div className="left-side">
      </div>

      <div className="right-side"> 
        <div className="bar"></div>
        <h1 className="hero-phrase">
          El ojo de halcón en la
          <br />
          palma de tu mano.
        </h1>
      </div>
    </>
  );
}

export default LogInPage;
