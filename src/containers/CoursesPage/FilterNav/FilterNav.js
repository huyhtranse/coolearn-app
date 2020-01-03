import React, { Component } from "react";
import { connect } from "react-redux";

import { ReactComponent as SearchIcon } from "../../../assets/SVG/search.svg";
import { filterCourses } from "../../../Actions/courses";
import { courseCategories } from "../../../Actions/categories";
import _ from "lodash";
import { withRouter } from "react-router-dom";
// import { FormGroup, Label, Input } from "reactstrap";

class FilterNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCourse: "",
      selectedCourse: "all"
    };
  }

  componentDidMount() {
    this.getPathname(maDanhMuc => {
      this.props.courseCategories(maDanhMuc);
      this.setState({ selectedCourse: maDanhMuc });
    });
  }

  componentDidUpdate(prevProps) {
    const { courseCategoriesProps, filterCourses, courses } = this.props;

    if (
      prevProps.courses !== courses ||
      prevProps.courseCategoriesProps !== courseCategoriesProps
    ) {
      if (courseCategoriesProps !== "all") {
        const coursesFilter = courses.filter(
          item => item.danhMucKhoaHoc.maDanhMucKhoahoc === courseCategoriesProps
        );
        filterCourses(coursesFilter);
      } else {
        filterCourses(courses);
      }
    }
  }

  getPathname(callback) {
    const pathname = this.props.history.location.pathname;
    const maDanhMuc = _.last(pathname.split("/"));

    if (callback) callback(maDanhMuc);
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    const { courseCategoriesProps, filterCourses, courses } = this.props;

    const keySearch = event.target.value;
    let tempCourses = [...courses];

    if (courseCategoriesProps !== "all") {
      tempCourses = tempCourses.filter(
        item => item.danhMucKhoaHoc.maDanhMucKhoahoc === courseCategoriesProps
      );
    }

    if (keySearch.length > 0) {
      let tempKeySearch = keySearch.toLowerCase().trim();
      tempCourses = tempCourses.filter(item => {
        let tempTitle = item.tenKhoaHoc.toLowerCase();
        return tempTitle.includes(tempKeySearch);
      });
    }
    filterCourses(tempCourses);
  };

  onSelect = event => {
    this.changePathname(event.target.value);
    this.setState({ searchCourse: "" });
  };

  changePathname = maDanhMuc => {
    const { history, courseCategories } = this.props;

    courseCategories(maDanhMuc);

    history.replace({
      pathname: `${maDanhMuc}`
    });
  };

  render() {
    // option tag
    let filterFieldCourses = new Set();
    filterFieldCourses.add({ maDanhMuc: "all", tenDanhMuc: "Tất cả" });
    this.props.listCourses.forEach(listCourse =>
      filterFieldCourses.add(listCourse)
    );
    filterFieldCourses = [...filterFieldCourses];

    return (
      <div className="allcourses__nav-filter">
        <div className="allcourses__filter">
          <label htmlFor="selectedCourse" className="allcourses__filter-label">
            Bộ lọc:{" "}
          </label>
          <select
            name="selectedCourse"
            id="selectedCourse"
            onChange={this.onSelect}
            className="allcourses__select"
          >
            {filterFieldCourses.map((course, index) => {
              return (
                <option
                  key={index}
                  value={course.maDanhMuc}
                  selected={
                    this.props.courseCategoriesProps === course.maDanhMuc
                      ? true
                      : false
                  }
                >
                  {course.tenDanhMuc}
                </option>
              );
            })}
          </select>
        </div>

        <div className="allcourses__search">
          <input
            className="allcourses__search-input"
            type="text"
            name="searchCourse"
            placeholder="Tìm khóa học..."
            onChange={this.onChange}
            value={this.state.searchCourse}
          />
          <div className="allcourses__search-button">
            <SearchIcon className="allcourses__search-icon" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listCourses: state.listCourses,
    courses: state.courses,
    courseCategoriesProps: state.courseCategories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    filterCourses: data => {
      dispatch(filterCourses(data));
    },
    courseCategories: data => {
      dispatch(courseCategories(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FilterNav));
