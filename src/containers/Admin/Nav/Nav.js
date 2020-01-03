import React from "react";
import CardAdmin from "./CardAdmin/CardAdmin";
import VerticalNav from "./VerticalNav/VerticalNav";

const Nav = () => {
  return (
    <div className="admin__left">
      <CardAdmin />
      <VerticalNav />
    </div>
  );
};

export default Nav;
