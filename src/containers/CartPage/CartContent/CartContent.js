import React, { Component } from "react";
import CartItem from "../CartItem/CartItem";
import { connect } from "react-redux";

import { cartList } from "../../../Actions/cart";
class CartContent extends Component {
  removeItemCart(maKhoaHoc) {
    const filterCart = this.props.cartListProps.filter(
      el => el.maKhoaHoc !== maKhoaHoc
    );
    this.props.cartList(filterCart);
    localStorage.setItem("cartList", JSON.stringify(filterCart));
  }

  render() {
    const { cartListProps } = this.props;

    const cartItem = cartListProps.map(el => (
      <CartItem
        key={el.maKhoaHoc}
        maKhoaHoc={el.maKhoaHoc}
        hinhAnh={el.hinhAnh}
        tenKhoaHoc={el.tenKhoaHoc}
        nguoiTao={el.nguoiTao.hoTen}
        onClick={() => this.removeItemCart(el.maKhoaHoc)}
      />
    ));

    const countCart =
      cartListProps.length > 0
        ? `${cartListProps.length} khóa học`
        : "Không có khóa học nào trong giỏ hàng";

    return (
      <div className="mycart__content-item">
        <h1>Giỏ hàng</h1>
        <p>{countCart}</p>
        <div>{cartItem}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartListProps: state.cartList
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
  mapStateToProps,
  mapDispatchToProps
)(CartContent);
