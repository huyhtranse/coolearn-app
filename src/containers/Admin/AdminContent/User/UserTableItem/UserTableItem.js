import React from "react";
import { Button } from "reactstrap";
import ModalUser from "../ModalUser/ModalUser";
import { Link } from "react-router-dom";

const UserTableItem = props => {
  return (
    <tr>
      <th scope="row">{props.taiKhoan}</th>
      <td className="admin__user-name">{props.hoTen}</td>
      <td>{props.soDT}</td>
      {/* <td>{props.email}</td> */}
      <td>
        <Link to={`/admin/user/${props.taiKhoan}`}>
          <Button color="info">Chi tiết</Button>
        </Link>
      </td>
      <td className="btn-inter">
        <ModalUser
          buttonLabel="Sửa"
          buttonModal="Sửa"
          titleModal="Sửa thông tin người dùng"
          isButtonAdd={false}
          taiKhoan={props.taiKhoan}
        />{" "}
        <Button
          color="danger"
          onClick={props.deleteUser}
          className="btn-inter-delete"
        >
          Xóa
        </Button>{" "}
      </td>
    </tr>
  );
};

export default UserTableItem;
