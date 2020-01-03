import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { listMyCourse } from "../../../../Actions/courses";

import { NavItem } from "reactstrap";

class ButtonMyCourse extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.courses !== this.props.courses) {
      this.initialMyCourses();
    }
  }

  onClick = () => {
    this.initialMyCourses();
  };

  initialMyCourses = () => {
    const khoaHocGhiDanh = JSON.parse(
      localStorage.getItem("chiTietKhoaHocGhiDanh")
    );

    const dsMakhoaHocGhiDanh = khoaHocGhiDanh.map(el => el.maKhoaHoc);

    const chiTietKhoaHocGhiDanh = this.props.courses.filter(el =>
      dsMakhoaHocGhiDanh.includes(el.maKhoaHoc)
    );

    this.props.listMyCourse(chiTietKhoaHocGhiDanh);
  };

  render() {
    return (
      <NavItem className="link-header">
        <Link to={`/my-course`} onClick={this.onClick}>
          Khóa học của tôi
        </Link>
      </NavItem>
    );
  }
}
const mapStateToProps = state => {
  return {
    courses: state.courses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listMyCourse: data => {
      dispatch(listMyCourse(data));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonMyCourse);
