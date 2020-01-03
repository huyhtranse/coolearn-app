import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";

import FromUser from "./FormUser/FromUser";
import FromPassword from "./FormPassword/FromPassword";

class ProfileUser extends Component {
  state = {
    taiKhoan: "",
    maLoaiNguoiDung: "",
    hoTen: ""
  };

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const maLoaiNguoiDung =
      currentUser.maLoaiNguoiDung === "HV" ? "USER" : "ADMIN";

    this.setState({
      taiKhoan: currentUser.taiKhoan,
      maLoaiNguoiDung: maLoaiNguoiDung,
      hoTen: currentUser.hoTen
    });
  }
  render() {
    const { taiKhoan, maLoaiNguoiDung, hoTen } = this.state;
    const styleUser =
      maLoaiNguoiDung === "ADMIN"
        ? { color: "#d62d20", backgroundColor: "rgba(255, 55, 0, 0.2)" }
        : null;

    const manager =
      maLoaiNguoiDung === "ADMIN" ? (
        <li className="profile__item">
          <Link
            to="/admin"
            style={{ textDecoration: "none" }}
            className="profile__link manager"
          >
            Quản lý khóa học
          </Link>
        </li>
      ) : null;

    return (
      <div className="profile">
        <div className="profile__container">
          <div className="profile__content">
            <div className="profile__content--main">
              <h4>
                Xin chào, <span style={styleUser}>{maLoaiNguoiDung}</span>{" "}
              </h4>
              <h3>{hoTen}</h3>
            </div>
            <div className="profile__content--list">
              <ul className="profile__list">
                <Link
                  to={`/profile/${taiKhoan}`}
                  style={{ textDecoration: "none" }}
                >
                  <li className="profile__item">
                    <span className="profile__link">Thông tin cá nhân</span>
                  </li>
                </Link>

                <Link
                  to={`/profile/password/${taiKhoan}`}
                  style={{ textDecoration: "none" }}
                >
                  <li className="profile__item">
                    <span className="profile__link">Mật khẩu</span>
                  </li>
                </Link>

                {manager}
              </ul>
            </div>
          </div>

          <div className="profile__heading">
            <h3>THÔNG TIN NGƯỜI DÙNG</h3>
          </div>

          <Route path="/profile/:taiKhoan" exact component={FromUser} />
          <Route />

          <Route path="/profile/password/:taikhoan" component={FromPassword} />
          <Route />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(ProfileUser);
