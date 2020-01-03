import React, { Component } from "react";

import FormPassworkContent from "./FormPasswordContent/FormPassworkContent";

class FromPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taiKhoan: "",
      hoTen: "",
      soDT: "",
      email: "",
      maLoaiNguoiDung: "",
    };
  }

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const { taiKhoan, hoTen, soDT, email, maLoaiNguoiDung } = currentUser;

    this.setState({
      taiKhoan: taiKhoan,
      hoTen: hoTen,
      soDT: soDT,
      maLoaiNguoiDung: maLoaiNguoiDung,
      email: email
    });
  }

  // onSubmit = e => {

  //   if (this.state.matKhau === this.state.nhapLaiMatKhau) {
  //     const {
  //       taiKhoan,
  //       hoTen,
  //       soDT,
  //       maLoaiNguoiDung,
  //       maNhom,
  //       email,
  //       matKhau
  //     } = this.state;

  //     editUser(
  //       { taiKhoan, hoTen, soDT, maLoaiNguoiDung, email, maNhom, matKhau },
  //       () => {
  //         this.setState({ loading: false });
  //         swal({
  //           title: "Đổi mật khẩu thành công",
  //           icon: "success",
  //           button: "Đóng"
  //         });

  //         this.props.setCurrentUser({});

  //         localStorage.removeItem("currentUser");
  //         localStorage.removeItem("accessToken");
  //         localStorage.removeItem("chiTietKhoaHocGhiDanh");

  //         this.props.history.push("/signin");
  //       }
  //     );
  //   } else {
  //     swal({
  //       title: "Nhập lại mật khẩu không đúng",
  //       icon: "error",
  //       button: "Đóng"
  //     });
  //   }
  // };

  render() {
    const { taiKhoan, hoTen, soDT, maLoaiNguoiDung, email } = this.state;
    return (
      <FormPassworkContent
        taiKhoan={taiKhoan}
        hoTen={hoTen}
        soDT={soDT}
        maLoaiNguoiDung={maLoaiNguoiDung}
        email={email}
      />
    );
  }
}

export default FromPassword;
