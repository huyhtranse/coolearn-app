import React, { useState, useEffect } from "react";
import { ReactComponent as Up } from "../../assets/SVG/up.svg";

const ButtonToTop = () => {
  const [point, setPoint] = useState(false);

  const handleScrollToStats = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const isTop = window.scrollY < 300;
      if (isTop !== true) {
        setPoint(true);
      } else {
        setPoint(false);
      }
    });
  });

  return (
    <div
      id="button__to__top"
      className={point ? "show" : null}
      onClick={handleScrollToStats}
    >
      <Up />
    </div>
  );
};

export default ButtonToTop;
