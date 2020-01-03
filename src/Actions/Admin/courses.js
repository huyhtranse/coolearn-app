import api from "../../Api/api";
import * as Types from "../../Constants/Constants";
// import { maNhom } from "../../MaNhom/MaNhom";
import swal from "sweetalert";

// doSub
export const doSub = (data, callback) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  api
    .post("/QuanLyKhoaHoc/GhiDanhKhoaHoc", data)
    .then(res => {
      swal({
        title: "Ghi danh khóa học thành công",
        icon: "success",
        button: "Đóng"
      });

      if (callback) callback(res.data);
    })
    .catch(err => {
      swal({
        title: "Ghi danh khóa học thất bại",
        icon: "error",
        button: "Đóng"
      });
    });
};

// doSub
export const doUnsub = (data, callback) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  api
    .post("/QuanLyKhoaHoc/HuyGhiDanh", data)
    .then(res => {
      swal({
        title: "Hủy ghi danh thành công",
        icon: "success",
        button: "Đóng"
      });
      if (callback) callback(res.data);
    })
    .catch(err => {
      swal({
        title: "Hủy ghi danh thất bại",
        icon: "error",
        button: "Đóng"
      });
    });
};

// add courses
export const addCourses = (data, callback) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  // const config = {
  //   headers: {
  //     "content-type": "multipart/form-data"
  //   }
  // };

  api
    .post("/QuanLyKhoaHoc/ThemKhoaHoc", data)
    .then(res => {
      swal({
        title: "Thêm khóa học thành công",
        icon: "success",
        button: "Đóng"
      });

      if (callback) callback(res.data);
    })
    .catch(err => {
      swal({
        title: "Thêm khóa học thất bại",
        icon: "error",
        button: "Đóng"
      });
    });
};

export const upImg = (data, callback) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  api
    .post("/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc", data)
    .then(res => {
      if (callback) callback(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// edit courses
export const editCourses = (data, callback) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  api
    .put("/QuanLyKhoaHoc/CapNhatKhoaHoc", data)
    .then(res => {
      swal({
        title: "Sửa khóa học thành công",
        icon: "success",
        button: "Đóng"
      });

      if (callback) callback(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// delete courses
export const deleteCourses = (maKhoaHoc, callback) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  api
    .delete(`/QuanLyKhoaHoc/XoaKhoaHoc?maKhoaHoc=${maKhoaHoc}`)
    .then(res => {
      swal({
        title: "Xóa khóa học thành công",
        icon: "success",
        button: "Đóng"
      });
      if (callback) callback(res.data);
    })
    .catch(err => {
      swal({
        title: err.response.data,
        icon: "error",
        button: "Đóng"
      });
    });
};

export const allCourses = data => {
  return {
    type: Types.ALL_COURSES,
    payload: data
  };
};

export const getCourseDetail = (maKhoaHoc, callback) => {
  api
    .get("/QuanLyKhoaHoc/LayThongTinKhoaHoc", {
      params: { maKhoaHoc }
    })
    .then(res => {
      if (callback) callback(res.data);
    })
    .catch(err => console.log(err));
};

export const courseDetailAdmin = data => {
  return {
    type: Types.COURSE_DETAIL_ADMIN,
    payload: data
  };
};

// LayDanhSachNguoiDungChuaGhiDanh

export const courseDontUser = (maKhoaHoc, callback) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  api
    .post("/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh", { maKhoaHoc })
    .then(res => {
      if (callback) callback(res.data);
    })
    .catch(err => {
      swal({
        title: "Lấy danh sách học viên chưa ghi danh thất bại",
        icon: "error",
        button: "Đóng"
      });
    });
};

// LayDanhSachHocVienKhoaHoc
export const courseHaveUser = (maKhoaHoc, callback) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  api
    .post("/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc", { maKhoaHoc })
    .then(res => {
      if (callback) callback(res.data);
    })
    .catch(err => {
      swal({
        title: "Lấy danh sách học viên khóa học thất bại",
        icon: "error",
        button: "Đóng"
      });
    });
};

// GhiDanhKhoaHoc
export const subCourseForUser = (data, callback) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  api
    .post("/QuanLyKhoaHoc/GhiDanhKhoaHoc", data)
    .then(res => {
      swal({
        title: "Ghi danh khóa học thành công",
        icon: "success",
        button: "Đóng"
      });
      if (callback) callback(res.data);
    })
    .catch(err => {
      swal({
        title: "Ghi danh khóa học thất bại",
        icon: "error",
        button: "Đóng"
      });
    });
};

// HuyGhiDanh
export const unsubCourseForUser = (data, callback) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  api
    .post("/QuanLyKhoaHoc/HuyGhiDanh", data)
    .then(res => {
      swal({
        title: "Hủy ghi danh thành công thành công",
        icon: "success",
        button: "Đóng"
      });

      if (callback) callback(res.data);
    })
    .catch(err => {
      swal({
        title: "Hủy ghi danh thất bại",
        icon: "error",
        button: "Đóng"
      });
    });
};
