import React, { Component } from "react";
import { getAllUser } from "../../../../Actions/Admin/users";
import { getCourses } from "../../../../Actions/courses";
import { Spinner } from "reactstrap";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      allCourses: [],
      loadingUser: true,
      loadingCourse: true
    };
  }

  componentDidMount() {
    getAllUser(list => {
      this.setState({ allUsers: list, loadingUser: false });
    });
    getCourses(list => {
      this.setState({ allCourses: list, loadingCourse: false });
    });
  }

  render() {
    const { allCourses, allUsers, loadingCourse, loadingUser } = this.state;

    return (
      <div className="admin__home">
        <div className="admin__home-bg">
          <h1>BẢNG SỐ LIỆU</h1>
        </div>
        <div className="admin__home-content">
          <div className="admin__home-content-user">
            <h1>Tổng số người dùng</h1>
            {loadingUser ? (
              <div>
                <Spinner color="success" />
              </div>
            ) : (
              <p>{allUsers.length}</p>
            )}
          </div>
          <div className="admin__home-content-course">
            <h1>Tổng số khóa học</h1>
            {loadingCourse ? (
              <div>
                <Spinner color="success" />
              </div>
            ) : (
              <p>{allCourses.length}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
