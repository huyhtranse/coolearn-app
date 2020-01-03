import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import action
import { getListCourses } from "../../../Actions/courses";
import { listCourses, filterCourses } from "../../../Actions/courses";
import { courseCategories } from "../../../Actions/categories";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  onMouseEnter() {
    this.setState({ dropdownOpen: true });
  }

  onMouseLeave() {
    this.setState({ dropdownOpen: false });
  }

  componentDidMount() {
    getListCourses(result => {
      this.props.listCourses(result);
    });
  }

  moveCategories = () => {
    const { courses, courseCategories, filterCourses } = this.props;
    courseCategories("all");
    filterCourses(courses);
  };

  selectCategories = maDanhMuc => {
    const { courses, courseCategories, filterCourses } = this.props;

    let tempCourses = [...courses];
    tempCourses = tempCourses.filter(
      item => item.danhMucKhoaHoc.maDanhMucKhoahoc === maDanhMuc
    );

    courseCategories(maDanhMuc);
    filterCourses(tempCourses);
  };

  render() {
    const listCategories = this.props.listCoursesCategories.map(el => {
      return (
        <Link
          to={`/courses/${el.maDanhMuc}`}
          key={el.maDanhMuc}
          onClick={() => this.selectCategories(el.maDanhMuc)}
          className="header__link"
        >
          <DropdownItem>
            <span>{el.tenDanhMuc}</span>
          </DropdownItem>
        </Link>
      );
    });

    return (
      <UncontrolledDropdown
        nav
        inNavbar
        onMouseOver={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
        className="header__categories"
      >
        <DropdownToggle nav className="link-header">
          <Link to={`/courses/all`} onClick={this.moveCategories}>
            Khóa học
          </Link>
        </DropdownToggle>

        <DropdownMenu>{listCategories}</DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    courseCategories: data => {
      dispatch(courseCategories(data));
    },
    listCourses: data => {
      dispatch(listCourses(data));
    },
    filterCourses: data => {
      dispatch(filterCourses(data));
    }
  };
};

const mapStateToProps = state => {
  return {
    listCoursesCategories: state.listCourses,
    courses: state.courses
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
