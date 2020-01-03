import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

import {
  deleteCourses,
  allCourses
} from "../../../../../Actions/Admin/courses";
import { getCourses } from "../../../../../Actions/courses";
import CoursesTableItem from "../CoursesTableItem/CoursesTableItem";

import swal from "sweetalert";

class CoursesTableContent extends Component {
  onDeleteCourses = maKhoaHoc => {
    swal({
      title: "Bạn thật sự muốn xóa khóa học này?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        deleteCourses(maKhoaHoc, () => {
          getCourses(courses => {
            this.props.allCourses(courses);
          });
        });
      }
    });
  };

  render() {
    const { allCoursesProps } = this.props;
    const coursesItem = allCoursesProps.map(item => (
      <CoursesTableItem
        key={item.maKhoaHoc}
        maKhoaHoc={item.maKhoaHoc}
        tenKhoaHoc={item.tenKhoaHoc}
        hinhAnh={item.hinhAnh}
        nguoiTao={item.nguoiTao.hoTen}
        deleteCourse={() => this.onDeleteCourses(item.maKhoaHoc)}
      />
    ));
    return (
      <Table hover printable="true">
        <col style={{ width: "14%" }} />
        <col style={{ width: "28%" }} />
        <col style={{ width: "20%" }} />

        <thead>
          <tr>
            <th>Hình ảnh</th>
            <th>Tên khóa học</th>
            <th>Người tạo</th>
            <th>Người dùng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>{coursesItem}</tbody>
      </Table>
    );
  }
}

const mapStateToProps = state => {
  return {
    allCoursesProps: state.allCourses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    allCourses: data => {
      dispatch(allCourses(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesTableContent);
