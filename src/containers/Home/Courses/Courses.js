import React, { Component } from "react";

import { connect } from "react-redux";
import CourseList from "./CourseList/CourseList";
import { Link } from "react-router-dom";
import { filterCourses } from "../../../Actions/courses";
import { courseCategories } from "../../../Actions/categories";

class Courses extends Component {
  moveCategories = () => {
    const { courses, courseCategories, filterCourses } = this.props;
    courseCategories("all");
    filterCourses(courses);
  };

  render() {
    return (
      <div className="courses">
        <div className="courses__content">
          <h2 className="courses__heading">Các khóa học Online</h2>
          <CourseList />
          <div className="courses__viewall">
            <Link to="/courses/all" onClick={this.moveCategories}>
              Xem Tất Cả Khóa Học
            </Link>
          </div>
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
)(Courses);
