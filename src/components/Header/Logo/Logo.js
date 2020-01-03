import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as BrandLogo } from "../../../assets/SVG/brightness_highbrightness_7.svg";

const Logo = () => {
  const [theta, setTheta] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setTheta((window.scrollY / 10) % Math.PI);
    });
  });

  return (
    <React.Fragment>
      <Link to="/" className="header__brand">
        <span>CO</span>
        <BrandLogo
          className="header__brand-logo"
          style={{ transform: `rotate(${theta}rad)` }}
        />
        <span>LEARN</span>
      </Link>
    </React.Fragment>
  );
};

export default Logo;
