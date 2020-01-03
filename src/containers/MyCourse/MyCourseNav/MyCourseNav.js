import React, { Component } from "react";
import { connect } from "react-redux";
import { listMyCourse } from "../../../Actions/courses";
import { ReactComponent as SearchIcon } from "../../../assets/SVG/search.svg";
class MyCourseNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchMyCourse: "",
      selectedMyCourse: "all"
    };
  }

  onChange = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        this.sortCourses();
      }
    );
  };

  sortCourses = () => {
    const { searchMyCourse, selectedMyCourse } = this.state;
    const { courses, listMyCourse } = this.props;

    const khoaHocGhiDanh = JSON.parse(
      localStorage.getItem("chiTietKhoaHocGhiDanh")
    );

    const dsMakhoaHocGhiDanh = khoaHocGhiDanh.map(el => el.maKhoaHoc);

    const chiTietKhoaHocGhiDanh = courses.filter(el =>
      dsMakhoaHocGhiDanh.includes(el.maKhoaHoc)
    );

    let tempMyCourses = chiTietKhoaHocGhiDanh;

    if (selectedMyCourse !== "all") {
      tempMyCourses = tempMyCourses.filter(
        item => item.danhMucKhoaHoc.maDanhMucKhoahoc === selectedMyCourse
      );
    }

    if (searchMyCourse.length > 0) {
      let tempKeySearch = searchMyCourse.toLowerCase().trim();
      tempMyCourses = tempMyCourses.filter(item => {
        let tempTitle = item.tenKhoaHoc.toLowerCase();
        return tempTitle.includes(tempKeySearch);
      });
    }
    listMyCourse(tempMyCourses);
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
      <div className="mycourse__nav-filter">
        <div className="mycourse__filter">
          <label htmlFor="selectedMyCourse" className="mycourse__filter-label">
            Bộ lọc:{" "}
          </label>
          <select
            name="selectedMyCourse"
            id="selectedMyCourse"
            onChange={this.onChange}
            className="mycourse__select"
          >
            {filterFieldCourses.map((course, index) => {
              return (
                <option key={index} value={course.maDanhMuc}>
                  {course.tenDanhMuc}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mycourse__search">
          <input
            className="mycourse__search-input"
            type="text"
            name="searchMyCourse"
            placeholder="Tìm khóa học..."
            onChange={this.onChange}
          />
          <div className="mycourse__search-button">
            <SearchIcon className="mycourse__search-icon" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: state.courses,
    listCourses: state.listCourses
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
)(MyCourseNav);
