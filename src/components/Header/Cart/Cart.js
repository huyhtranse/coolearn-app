import React, { Component } from "react";
import { connect } from "react-redux";
import { ReactComponent as CartLogo } from "../../../assets/SVG/local_grocery_storeshopping_cart.svg";

import { cartList } from "../../../Actions/cart";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { NavItem } from "reactstrap";
import _ from "lodash";
import ButtonMyCourse from "../HeaderButton/ButtonMyCourse/ButtonMyCourse";
import ImgReplace from "../../../assets/img/img_replace.PNG";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartNumber: this.props.cartListProps.length
    };
  }

  addDefaultSrc = ev => {
    ev.target.src = ImgReplace;
  };

  componentDidMount() {
    const cartListStorage = JSON.parse(localStorage.getItem("cartList"));
    if (cartListStorage) {
      this.props.cartList(cartListStorage);
      this.setState({ cartNumber: cartListStorage.length });
    } else {
      localStorage.setItem(
        "cartList",
        JSON.stringify(this.props.cartListProps)
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartListProps !== this.props.cartListProps) {
      this.setState({
        cartNumber: this.props.cartListProps.length
      });
    }
  }

  render() {
    const cartList = this.props.cartListProps.map(el => (
      <div key={el.maKhoaHoc} className="cart__item">
        <img
          src={el.hinhAnh}
          alt={`hinh khóa học`}
          className="cart__img"
          onError={this.addDefaultSrc}
        />
        <p>{el.tenKhoaHoc}</p>
      </div>
    ));

    return (
      <>
        {_.isEmpty(this.props.currentUser) ? (
          <Link to="/cart" className="cart-1">
            <NavItem className="cart">
              <CartLogo className="cart-logo" />
              <span className="cart-number">{this.state.cartNumber}</span>
              <div className="cart-content">{cartList}</div>
            </NavItem>
          </Link>
        ) : (
          <>
            <ButtonMyCourse />
            <Link to="/cart" className="cart-1">
              <NavItem className="cart">
                <CartLogo className="cart-logo" />
                <span className="cart-number">{this.state.cartNumber}</span>
                <div className="cart-content">{cartList}</div>
              </NavItem>
            </Link>
          </>
        )}
      </>
    );
  }
}

const mapStateFromProps = state => {
  return {
    cartListProps: state.cartList,
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cartList: data => {
      dispatch(cartList(data));
    }
  };
};

export default connect(
  mapStateFromProps,
  mapDispatchToProps
)(withRouter(Cart));
