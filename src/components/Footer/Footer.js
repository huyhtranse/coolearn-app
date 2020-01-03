import React, { Component } from "react";
import FooterMain from "./FooterMain/FooterMain";
import FooterBottom from "./FooterBottom/FooterBottom";
import { withRouter } from "react-router-dom";

class Footer extends Component {
  render() {
    const { location } = this.props;
    const pathnameAdmin = location.pathname.substring(1, 6);
    const display = pathnameAdmin === "admin" ? "none" : "block";

    return (
      <div className="footer" style={{ display: display }}>
        <div className="footer__logan">
          <p>Uy Tín. Cuốn Hút. Hiệu Quả</p>
        </div>
        <FooterMain />

        <FooterBottom />
      </div>
    );
  }
}

export default withRouter(Footer);
