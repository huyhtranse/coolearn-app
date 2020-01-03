import React, { Component } from "react";
import CartContent from "./CartContent/CartContent";
import CartButton from "./CartButton/CartButton";

class CartPage extends Component {
  render() {
    return (
      <div className="mycart">
        <div className="mycart__content">
          <CartContent />
          <CartButton />
        </div>
      </div>
    );
  }
}

export default CartPage;
