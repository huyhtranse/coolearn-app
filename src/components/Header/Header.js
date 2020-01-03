import React, { Component } from "react";
import Logo from "./Logo/Logo";
import { withRouter } from "react-router-dom";

import Categories from "./Categories/Categories";
import HeaderButton from "./HeaderButton/HeaderButton";
import Cart from "./Cart/Cart";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";
import Slider from "../../containers/Home/Slider/Slider";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      scrolled: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {
    window.addEventListener("scroll", () => {
      const isTop = window.scrollY < 100;
    

      if (isTop !== true) {
        this.setState({ scrolled: true });
      } else {
        this.setState({ scrolled: false });
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll");
  }

  render() {
    const { location } = this.props;

    const pathnameAdmin = location.pathname.substring(1, 6);

    const display = pathnameAdmin === "admin" ? "none" : "block";

    const img = location.pathname !== "/" ? "url()" : null;
    const showSlider = location.pathname === "/" ? <Slider /> : null;
    return (
      <div
        className={`header ${this.state.isOpen ? "header__is-open" : ""}`}
        style={{ backgroundImage: img, display: display }}
      >
        {/* start navbar */}
        <div className="header__height"></div>
        <Navbar
          expand="md"
          className={
            this.state.scrolled
              ? "header__content header__sticky"
              : "header__content"
          }
        >
          <div className="header__content--main">
            <NavbarBrand href="/">
              {/* logo */}
              <Logo />
              {/* logo end */}
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse
              isOpen={this.state.isOpen}
              navbar
              className="header__navbar"
            >
              <Nav className="ml-auto header__nav" navbar>
                {/* // categories */}
                <Categories />
                {/* // categories end */}

                <Cart />

                <HeaderButton />
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        {/* end navbar */}

        {showSlider}
      </div>
    );
  }
}

export default withRouter(Header);
