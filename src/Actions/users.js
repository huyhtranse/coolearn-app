import api from "../Api/api";
import * as Types from "../Constants/Constants";
import Auth from "../Auth/Auth";

import swal from "sweetalert";

export const signup = (data, callback) => {
  api
    .post("/QuanLyNguoiDung/DangKy", data)
    .then(res => {
      swal({
        title: "Đăng ký thành công",
        icon: "success",
        button: "Đóng"
      });
      callback();
    })
    .catch(error => {
      swal({
        title: error.response.data,
        icon: "error",
        button: "Đóng"
      });
    });
};

export const signin = (data, callback) => {
  api
    .post("/QuanLyNguoiDung/DangNhap", data)
    .then(res => {
      localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));

      Auth.signin();
      swal({
        title: "Đăng nhập thành công",
        icon: "success",
        button: "Đóng"
      });
      if (callback) callback(res.data);
    })
    .catch(error => {
      swal({
        title: error.response.data,
        icon: "error",
        button: "Đóng"
      });
    });
};

export const getUserDetail = (taiKhoan, callback) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  api
    .post("/QuanLyNguoiDung/ThongTinTaiKhoan", { taiKhoan })
    .then(res => {
      const {
        taiKhoan,
        hoTen,
        email,
        soDT,
        maLoaiNguoiDung,
        maNhom,
        chiTietKhoaHocGhiDanh
      } = res.data;

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          taiKhoan,
          hoTen,
          email,
          soDT,
          maLoaiNguoiDung,
          maNhom
        })
      );

      localStorage.setItem(
        "chiTietKhoaHocGhiDanh",
        JSON.stringify(chiTietKhoaHocGhiDanh)
      );

      if (callback) callback(res.data);
    })
    .catch(err => console.log(err));
};

export const editUser = (data, callback) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  api
    .put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data)
    .then(res => {
      const {
        taiKhoan,
        hoTen,
        email,
        soDt,
        maLoaiNguoiDung,
        maNhom
      } = res.data;

      const soDT = soDt;

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          taiKhoan,
          hoTen,
          email,
          soDT,
          maLoaiNguoiDung,
          maNhom
        })
      );

      if (callback) callback(res.data);
    })
    .catch(err => {
      console.log(err);
      swal({
        title: "Đổi thông tin tài khoản thất bại",
        icon: "error",
        button: "Đóng"
      });
    });
};

export const setCurrentUser = data => {
  return {
    type: Types.SET_CURRENT_USER,
    payload: data
  };
};
