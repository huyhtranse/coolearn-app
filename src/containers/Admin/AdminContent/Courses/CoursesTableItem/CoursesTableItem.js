import React from "react";
import { Button } from "reactstrap";
import ModalCourses from "../ModalCourses/ModalCourses";
import { Link } from "react-router-dom";
import ImgReplace from "../../../../../assets/img/img_replace.PNG";
const CoursesTableItem = props => {
  const addDefaultSrc = ev => {
    ev.target.src = ImgReplace;
  };

  return (
    <tr className="admin__courses--table--item">
      <th scope="row">
        <img
          src={props.hinhAnh}
          alt={`hinh ${props.hinhAnh}`}
          onError={addDefaultSrc}
          className="admin__courses--img"
        />
      </th>
      <td className="admin__courses--name">{props.tenKhoaHoc}</td>
      <td>{props.nguoiTao}</td>

      <td>
        <Link to={`/admin/course/${props.maKhoaHoc}`}>
          <Button color="info">Chi tiết</Button>
        </Link>
      </td>
      <td className="btn-inter">
        <ModalCourses
          buttonLabel="Sửa"
          buttonModal="Sửa"
          titleModal="Sửa thông tin khóa học"
          isButtonAdd={false}
          maKhoaHoc={props.maKhoaHoc}
        />{" "}
        <Button
          color="danger"
          onClick={props.deleteCourse}
          className="btn-inter-delete"
        >
          Xóa
        </Button>{" "}
      </td>
    </tr>
  );
};

export default CoursesTableItem;
