import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import UserTableItem from "../UserTableItem/UserTableItem";

import {
  deleteUser,
  getAllUser,
  allUser
} from "../../../../../Actions/Admin/users";

import swal from "sweetalert";

class UserTableContent extends Component {
  onDeleteUser = taiKhoan => {
    swal({
      title: "Bạn thật sự muốn xóa học viên này?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        deleteUser(taiKhoan, () => {
          getAllUser(users => {
            this.props.allUser(users);
          });
        });
      }
    });
  };

  render() {
    const { allUserProps } = this.props;
    const userItem = allUserProps.map(item => (
      <UserTableItem
        key={item.taiKhoan}
        taiKhoan={item.taiKhoan}
        hoTen={item.hoTen}
        soDT={item.soDt}
        email={item.email}
        deleteUser={() => this.onDeleteUser(item.taiKhoan)}
      />
    ));

    return (
      <Table
        hover
        // bodyStyle={{ overflow: "overlay" }}
        printable="true"
      >
        <col style={{ width: "7%" }} />
        <col style={{ width: "21%" }} />
        <col style={{ width: "20%" }} />

        <thead>
          <tr>
            <th>Tài khoản</th>
            <th>Tên người dùng</th>
            <th>Số điện thoại</th>
            {/* <th>Email</th> */}
            <th>Các khóa học</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>{userItem}</tbody>
      </Table>
    );
  }
}
const mapStateToProps = state => {
  return {
    allUserProps: state.allUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    allUser: data => {
      dispatch(allUser(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTableContent);
