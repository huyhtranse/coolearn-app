import React, { Component } from "react";
import { connect } from "react-redux";
import CourseItem from "./CourseItem/CourseItem";
import { Link } from "react-router-dom";

class CoursesContent extends Component {
  render() {
    const { filterCourses } = this.props;
    const coursesItem = filterCourses.map(item => (
      <div key={item.maKhoaHoc}>
        <Link
          to={`/course-detail/${item.maKhoaHoc}`}
          style={{ textDecoration: "none" }}
        >
          <CourseItem
            maKhoaHoc={item.maKhoaHoc}
            hinhAnh={item.hinhAnh}
            tenKhoaHoc={item.tenKhoaHoc}
            moTa={item.moTa}
            luotXem={item.luotXem}
            nguoiTao={item.nguoiTao.hoTen}
            soLuongHocVien={item.soLuongHocVien}
          />
        </Link>
      </div>
    ));

    return (
      <div className="allcourses__container">
        <p>{filterCourses.length} khóa học</p>

        <div className="allcourses__container--content">{coursesItem}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filterCourses: state.filterCourses,
    courseCategories: state.courseCategories
  };
};

export default connect(mapStateToProps)(CoursesContent);
