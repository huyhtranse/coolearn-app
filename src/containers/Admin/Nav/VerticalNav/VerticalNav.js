import React, { Component } from "react";
import { ButtonGroup } from "reactstrap";
import { Link } from "react-router-dom";

class VerticalNav extends Component {
  render() {
    return (
      <div className="admin__nav-list">
        <ButtonGroup vertical className="admin__nav">
          <ul>
            <Link to="/admin" className="admin__nav-analy">
              <li>Số liệu</li>
            </Link>
            <Link to="/admin/user" className="admin__nav-user">
              <li>Quản lý người dùng</li>
            </Link>
            <Link to="/admin/courses" className="admin__nav-course">
              <li>Quản lý khóa học</li>
            </Link>

            <Link to="/">
              <li className="admin__nav-home">Trang chủ</li>
            </Link>
          </ul>
        </ButtonGroup>
      </div>
    );
  }
}

export default VerticalNav;
