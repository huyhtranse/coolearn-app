import api from "../Api/api";
import * as Types from "../Constants/Constants";
import { maNhom } from "../MaNhom/MaNhom";
// api

import swal from "sweetalert";

export const getCourses = callback => {
  api
    .get(`/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${maNhom}`)
    .then(res => {
      if (callback) callback(res.data);
    })
    .catch(err => console.log(err));
};

// redux courses
export const courses = data => {
  return {
    type: Types.GET_COURSES,
    payload: data
  };
};

// lay chi thong tin chi tiet cua mot khoa hoc
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

export const courseDetail = data => {
  return {
    type: Types.GET_COURSES_DETAIL,
    payload: data
  };
};

export const enrollCourse = (data, callback) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  api
    .post("/QuanLyKhoaHoc/DangKyKhoaHoc", data)
    .then(res => {
      if (callback) callback();
    })
    .catch(err => {
      console.log(err);
    });
};

export const unsubCoures = (data, callback) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  api
    .post("/QuanLyKhoaHoc/HuyGhiDanh", data)
    .then(res => {
      // swal({
      //   title: "Hủy đăng ký khóa học thành công",
      //   icon: "success",
      //   button: "Đóng"
      // });

      if (callback) callback(res.data);
    })
    .catch(err => {
      swal({
        title: "Hủy đăng ký khóa học thất bại",
        icon: "error",
        button: "Đóng"
      });
      console.log(err);
    });
};

export const getListCourses = callback => {
  api
    .get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc")
    .then(res => {
      localStorage.setItem("listCourses", JSON.stringify(res.data));

      if (callback) callback(res.data);
    })
    .catch(err => console.log(err));
};

export const listCourses = data => {
  return {
    type: Types.GET_LIST_COURSES,
    payload: data
  };
};

export const getListCoursesSpecific = (maDanhMuc, callback) => {
  api
    .get(
      `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=${maNhom}`
    )
    .then(res => {
      if (callback) callback(res.data);
    })
    .catch(err => console.log(err));
};

export const isEnroll = data => {
  return {
    type: Types.IS_ENROLL,
    payload: data
  };
};

export const filterCourses = data => {
  return {
    type: Types.FILTER_COURSES,
    payload: data
  };
};

export const listMyCourse = data => {
  return {
    type: Types.LIST_MY_COURSE,
    payload: data
  };
};
