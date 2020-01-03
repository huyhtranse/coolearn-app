import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { filterCourses } from "../../Actions/courses";
import { courseCategories } from "../../Actions/categories";
class NotFound extends Component {
  moveCategories = () => {
    const { courses, courseCategories, filterCourses } = this.props;
    courseCategories("all");
    filterCourses(courses);
  };

  render() {
    return (
      <div className="notfound">
        <div className="notfound__content">
          <div className="notfound__content-text">
            <h1>404</h1>
            <p>Không tìm thấy trang</p>
          </div>
          <div className="notfound__content-list">
            <ul>
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>
                <Link to="/courses/all" onClick={this.moveCategories}>
                  Khóa học
                </Link>
              </li>
            </ul>
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
)(NotFound);
