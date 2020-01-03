import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form
} from "reactstrap";
import FormUser from "../FormUser/FormUser";
import { connect } from "react-redux";

import { maNhom } from "../../../../../MaNhom/MaNhom";
import {
  getAllUser,
  allUser,
  addUser,
  searchUser,
  editUser
} from "../../../../../Actions/Admin/users";

class ModalUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true,

      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      email: "",
      maLoaiNguoiDung: "",
      maNhom: maNhom
    };

    this.toggle = this.toggle.bind(this);
    this.changeBackdrop = this.changeBackdrop.bind(this);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onAdd = () => {
    const {
      taiKhoan,
      hoTen,
      matKhau,
      email,
      soDT,
      maLoaiNguoiDung,
      maNhom
    } = this.state;

    const user = {
      taiKhoan,
      matKhau,
      email,
      hoTen,
      soDT,
      maLoaiNguoiDung,
      maNhom
    };

    const { allUser } = this.props;

    addUser(user, user => {
      getAllUser(listUser => {
        allUser(listUser);
      });
      this.toggle();
    });
  };

  onEdit = () => {
    const {
      taiKhoan,
      hoTen,
      matKhau,
      email,
      soDT,
      maLoaiNguoiDung,
      maNhom
    } = this.state;

    const user = {
      taiKhoan,
      matKhau,
      email,
      hoTen,
      soDT,
      maLoaiNguoiDung,
      maNhom
    };

    const { allUser } = this.props;

    editUser(user, user => {
      getAllUser(listUser => {
        allUser(listUser);
      });
      this.toggle();
    });
  };

  openEditModal = () => {
    const { taiKhoan } = this.props;
    searchUser({ taiKhoan }, user => {
      this.setState({
        taiKhoan: user.taiKhoan,
        hoTen: user.hoTen,
        soDT: user.soDT,
        email: user.email,
        matKhau: user.matKhau,
        maLoaiNguoiDung: user.maLoaiNguoiDung
      });
    });
  };

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  changeBackdrop(e) {
    let value = e.target.value;
    if (value !== "static") {
      value = JSON.parse(value);
    }
    this.setState({ backdrop: value });
  }

  onClickEdit = () => {
    this.toggle();
    this.openEditModal();
  };

  render() {
    const {
      taiKhoan,
      hoTen,
      matKhau,
      email,
      soDT,
      maLoaiNguoiDung
    } = this.state;
    return (
      <div>
        <Form inline onSubmit={e => e.preventDefault()}>
          {this.props.isButtonAdd ? (
            <Button color="primary" onClick={this.toggle}>
              {this.props.buttonLabel}
            </Button>
          ) : (
            <Button color="primary" onClick={this.onClickEdit}>
              {this.props.buttonLabel}
            </Button>
          )}
        </Form>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          backdrop={this.state.backdrop}
        >
          <ModalHeader toggle={this.toggle}>
            {this.props.titleModal}
          </ModalHeader>
          <ModalBody>
            <FormUser
              onChange={() => this.onChange}
              isDisabled={!this.props.isButtonAdd}
              taiKhoan={taiKhoan}
              hoTen={hoTen}
              matKhau={matKhau}
              email={email}
              soDT={soDT}
              maLoaiNguoiDung={maLoaiNguoiDung}
            />
          </ModalBody>
          <ModalFooter>
            {this.props.isButtonAdd ? (
              <Button color="primary" onClick={this.onAdd}>
                {this.props.buttonModal}
              </Button>
            ) : (
              <Button color="primary" onClick={this.onEdit}>
                {this.props.buttonModal}
              </Button>
            )}

            <Button color="secondary" onClick={this.toggle}>
              Đóng
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    allUser: data => {
      dispatch(allUser(data));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ModalUser);
