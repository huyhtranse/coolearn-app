import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import { setCurrentUser } from "../../../Actions/users";
import { cartList } from "../../../Actions/cart";

import { NavItem } from "reactstrap";

// auth
import Auth from "../../../Auth/Auth";
import swal from "sweetalert";

class HeaderButton extends Component {
  logOut = e => {
    e.preventDefault();

    this.props.setCurrentUser({});

    localStorage.removeItem("currentUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("chiTietKhoaHocGhiDanh");

    localStorage.setItem("cartList", JSON.stringify([]));
    this.props.cartList([]);

    Auth.logout();

    this.props.history.push("/signin");
    swal({
      title: "Đăng xuất thành công",
      icon: "success",
      button: "Đóng"
    });
  };

  render() {
    return (
      <React.Fragment>
        {_.isEmpty(this.props.currentUser) ? (
          <>
            <NavItem>
              <Link to="/signin" className="header__signin">
                Đăng nhập
              </Link>

              <Link to="/signup" className="header__signup">
                Đăng ký
              </Link>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem className="btn-pro">
              <Link
                to={`/profile/${this.props.currentUser.taiKhoan}`}
                className="btn-profile"
              >
                {this.props.currentUser.taiKhoan}
              </Link>
              <button className="btn-logout" onClick={this.logOut}>
                đăng xuất
              </button>
            </NavItem>
          </>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: user => {
      dispatch(setCurrentUser(user));
    },
    cartList: data => {
      dispatch(cartList(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HeaderButton));
