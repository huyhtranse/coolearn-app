import React, { Component } from "react";
import { connect } from "react-redux";
import { getCourses } from "../../../../Actions/courses";
import { allCourses } from "../../../../Actions/Admin/courses";
import { InputGroup, Input } from "reactstrap";
import CoursesTableContent from "./CoursesTableContent/CoursesTableContent";
import ModalCourses from "./ModalCourses/ModalCourses";
import { ReactComponent as Search } from "../../../../assets/SVG/search.svg";

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCourses: "",
      listCourses: []
    };
  }

  componentDidMount() {
    const { allCourses } = this.props;

    getCourses(listCourses => {
      this.setState({ listCourses: listCourses });
      allCourses(listCourses);
    });
  }

  onChange = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        const { searchCourses, listCourses } = this.state;
        let list = [...listCourses];
        if (searchCourses.length > 0) {
          let key = searchCourses.toLowerCase().trim();
          list = list.filter(item => {
            let tenKhoaHoc = item.tenKhoaHoc;
            tenKhoaHoc = tenKhoaHoc.toLowerCase();
            return tenKhoaHoc.includes(key);
          });
        }
        this.props.allCourses(list);
      }
    );
  };

  render() {
    return (
      <div className="admin__courses">
        <div className="admin__courses--bg">
          <h1>Quản lý khóa học</h1>
        </div>
        <div className="admin__courses--content">
          <div className="admin__courses--container">
            <div className="admin__courses--container--filter">
              <ModalCourses
                buttonLabel="Thêm khóa học"
                titleModal="Thêm khóa học"
                buttonModal="Thêm"
                isButtonAdd={true}
              />
              <InputGroup>
                <Input
                  placeholder="Tim kiếm khóa học"
                  name="searchCourses"
                  onChange={this.onChange}
                  className="admin__courses-input-search"
                />
                <div className="admin__courses-logo">
                  <Search />
                </div>
              </InputGroup>
            </div>

            <CoursesTableContent />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    allCourses: data => {
      dispatch(allCourses(data));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Courses);
