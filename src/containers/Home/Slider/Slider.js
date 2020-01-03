import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { filterCourses } from "../../../Actions/courses";
import { courseCategories } from "../../../Actions/categories";

class Slider extends Component {
  moveCategories = () => {
    const { courses, courseCategories, filterCourses } = this.props;
    courseCategories("all");
    filterCourses(courses);
  };

  render() {
    return (
      <div className="slider">
        <div className="slider__content">
          <h1 className="slider__header">
            Tham gia ngay vào trung tâm đào tạo uy tính nhất hiện nay
          </h1>
          <p className="slider__header--sub">Uy tín, cuốn hút và hiệu quả</p>
          <Link
            to="/courses/all"
            className="slider__btn"
            onClick={this.moveCategories}
          >
            Học Ngay Hôm Nay
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    courseCategories: data => {
      dispatch(courseCategories(data));
    },

    filterCourses: data => {
      dispatch(filterCourses(data));
    }
  };
};

const mapStateToProps = state => {
  return {
    courses: state.courses
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slider);
