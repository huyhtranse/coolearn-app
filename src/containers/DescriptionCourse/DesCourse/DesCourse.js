import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LeadCourse from "./LeadCourse/LeadCourse";
import LessonCourse from "./LessonCourse/LessonCourse";
import _ from "lodash";
import { isEnroll } from "../../../Actions/courses";
class DesCourse extends Component {
  componentDidMount() {
    const pathname = this.props.history.location.pathname;
    const maKhoaHoc = _.last(pathname.split("/"));

    const chiTietKhoaHocGhiDanh = JSON.parse(
      localStorage.getItem("chiTietKhoaHocGhiDanh")
    );

    this.props.isEnroll(false);
    if (chiTietKhoaHocGhiDanh) {
      for (const i of chiTietKhoaHocGhiDanh) {
        let maKhoaHocOfI = i.maKhoaHoc;

        if (maKhoaHocOfI === maKhoaHoc) {
          this.props.isEnroll(true);
        }
      }
    }
  }

  render() {
    const hoTenNguoiTao = () => {
      let hoTenNguoiTao = this.props.courseDetail.nguoiTao;
      if (hoTenNguoiTao) {
        return hoTenNguoiTao.hoTen;
      }
    };

    const { tenKhoaHoc, soLuongHocVien, moTa } = this.props.courseDetail;

    return (
      <div className="descourse__left">
        <LeadCourse
          tenKhoaHoc={tenKhoaHoc}
          moTa={moTa}
          soLuongHocVien={soLuongHocVien}
          hoTenGiangVien={hoTenNguoiTao()}
        />
        <LessonCourse />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    isEnroll: data => {
      dispatch(isEnroll(data));
    }
  };
};

const mapStateToProps = state => {
  return {
    courseDetail: state.courseDetail,
    courses: state.courses
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DesCourse));
