import React, { Component } from "react";
import FormContent from "./FormContent/FormContent";

class FormUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taiKhoan: "",
      hoTen: "",
      soDT: "",
      email: "",
      maLoaiNguoiDung: ""
    };
  }

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const { taiKhoan, hoTen, soDT, email, maLoaiNguoiDung } = currentUser;
    this.setState({
      taiKhoan: taiKhoan,
      hoTen: hoTen,
      soDT: soDT,
      email: email,
      maLoaiNguoiDung: maLoaiNguoiDung
    });
  }

  render() {
    const { taiKhoan, hoTen, soDT, maLoaiNguoiDung, email } = this.state;

    return (
      <FormContent
        taiKhoan={taiKhoan}
        hoTen={hoTen}
        soDT={soDT}
        maLoaiNguoiDung={maLoaiNguoiDung}
        email={email}
      />
    );
  }
}

export default FormUser;
