import api from "../../Api/api";
import * as Types from "../../Constants/Constants";
import { maNhom } from "../../MaNhom/MaNhom";
import swal from "sweetalert";

export const getAllUser = callback => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  api
    .get(`/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}`)
    .then(res => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const listUser = res.data.filter(
        item => item.taiKhoan !== currentUser.taiKhoan
      );

      if (callback) callback(listUser);
    })
    .catch(err => console.log(err));
};

export const allUser = data => {
  return {
    type: Types.ALL_USER,
    payload: data
  };
};

// deleteUser
export const deleteUser = (taiKhoan, callback) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  api
    .delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    .then(res => {
      console.log(res.data);
      swal({
        title: `Xóa ${taiKhoan} thành công`,
        icon: "success",
        button: "Đóng"
      });

      if (callback) callback();
    })
    .catch(err => {
      console.log(err);
      console.log(err.response.data);

      swal({
        title: err.response.data,
        icon: "error",
        button: "Đóng"
      });
    });
};

// add user
export const addUser = (user, callback) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  api
    .post(`/QuanLyNguoiDung/ThemNguoiDung`, user)
    .then(res => {
      console.log(res.data);

      swal({
        title: "Thêm người dùng thành công!",
        icon: "success",
        button: "Đóng"
      });
      if (callback) callback(res.data);
    })
    .catch(err => {
      console.log(err);
      swal({
        title: "Thêm người dùng thất bại!",
        icon: "error",
        button: "Đóng"
      });
    });
};

// search user
export const searchUser = (taiKhoan, callback) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  api
    .post("/QuanLyNguoiDung/ThongTinTaiKhoan", taiKhoan)
    .then(res => {
      console.log(res.data);

      if (callback) callback(res.data);
    })
    .catch(err => {
      console.log(err);
      swal({
        title: "Không tìm thấy người dùng nào!",
        icon: "error",
        button: "Đóng"
      });
    });
};

// edit user
export const editUser = (data, callback) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  api
    .put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data)
    .then(res => {
      console.log(res.data);

      swal({
        title: "Cập nhật thông tin người dùng thành công!",
        icon: "success",
        button: "Đóng"
      });
      if (callback) callback(res.data);
    })
    .catch(err => {
      console.log(err);
      swal({
        title: "Cập nhật thông tin người dùng thất bại!",
        icon: "error",
        button: "Đóng"
      });
    });
};

// user do not haves courses

export const userDontCourse = (taiKhoan, callback) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  api
    .post("/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh", { taiKhoan })
    .then(res => {
      console.log(res.data);

      if (callback) callback(res.data);
    })
    .catch(err => {
      console.log(err);

      swal({
        title: "Lấy danh sách người dùng chưa ghi danh thất bại",
        icon: "error",
        button: "Đóng"
      });
    });
};

export const listSub = data => {
  return {
    type: Types.LIST_SUB,
    payload: data
  };
};

export const userHaveCourse = (taiKhoan, callback) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  api
    .post("/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet", { taiKhoan })
    .then(res => {
      console.log(res.data);

      if (callback) callback(res.data);
    })
    .catch(err => {
      console.log(err);

      swal({
        title: "Lấy danh sách khóa học đã ghi danh thất bại thất bại",
        icon: "error",
        button: "Đóng"
      });
    });
};

export const listUnsub = data => {
  return {
    type: Types.LIST_UNSUB,
    payload: data
  };
};
