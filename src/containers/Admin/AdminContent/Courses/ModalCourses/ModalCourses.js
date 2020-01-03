import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form
} from "reactstrap";
import { maNhom } from "../../../../../MaNhom/MaNhom";
import {
  allCourses,
  addCourses,
  editCourses,
  upImg
} from "../../../../../Actions/Admin/courses";
import { getCourseDetail } from "../../../../../Actions/courses";
import { getCourses } from "../../../../../Actions/courses";
import FormCourses from "../FormCourses/FormCourses";
// import FormData from "form-data";
import swal from "sweetalert";

class ModalCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true,

      maKhoaHoc: "",
      tenKhoaHoc: "",
      moTa: "",
      hinhAnh: "https://i.udemycdn.com/course/480x270/2327024_88c3.jpg",
      maDanhMucKhoaHoc: "",

      biDanh: "",
      ngayTao: "",
      luotXem: 0,
      danhGia: 0,
      taiKhoanNguoiTao: "",
      maNhom: maNhom,

      hinhAnhUp: null
    };

    this.toggle = this.toggle.bind(this);
    this.changeBackdrop = this.changeBackdrop.bind(this);
  }

  componentDidMount() {
    let today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    this.setState({
      ngayTao: `${dd}/${mm}/${yyyy}`,
      taiKhoanNguoiTao: currentUser.taiKhoan
    });
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onAdd = () => {
    const {
      luotXem,
      danhGia,
      maKhoaHoc,
      tenKhoaHoc,
      moTa,
      hinhAnh,
      biDanh,
      maDanhMucKhoaHoc,
      taiKhoanNguoiTao,
      ngayTao,
      maNhom,

      hinhAnhUp
    } = this.state;

    const data = {
      luotXem,
      danhGia,
      maKhoaHoc,
      tenKhoaHoc,
      moTa,
      hinhAnh,
      biDanh,
      maDanhMucKhoaHoc,
      taiKhoanNguoiTao,
      ngayTao,
      maNhom
    };

    let frm = new FormData();
    frm.append("file", hinhAnhUp);
    frm.append("tenKhoaHoc", tenKhoaHoc);

    const { allCourses } = this.props;

    if (!hinhAnhUp) {
      swal({
        title: "Vui lòng chọn hình ảnh",
        icon: "error",
        button: "Đóng"
      });
      return;
    }

    addCourses(data, course => {
      upImg(frm, course => {
        getCourses(listCourses => {
          allCourses(listCourses);
        });

        this.toggle();
      });
    });
  };

  onEdit = () => {
    const {
      luotXem,
      danhGia,
      maKhoaHoc,
      tenKhoaHoc,
      moTa,
      hinhAnh,
      biDanh,
      maDanhMucKhoaHoc,
      taiKhoanNguoiTao,
      ngayTao,
      maNhom,

      hinhAnhUp
    } = this.state;

    const data = {
      luotXem,
      danhGia,
      maKhoaHoc,
      tenKhoaHoc,
      moTa,
      hinhAnh,
      biDanh,
      maDanhMucKhoaHoc,
      taiKhoanNguoiTao,
      ngayTao,
      maNhom
    };

    let frm = new FormData();
    frm.append("file", hinhAnhUp);
    frm.append("tenKhoaHoc", tenKhoaHoc);

    const { allCourses } = this.props;

    if (!hinhAnhUp) {
      swal({
        title: "Vui lòng chọn hình ảnh",
        icon: "error",
        button: "Đóng"
      });
      return;
    }

    editCourses(data, course => {
      upImg(frm, course => {
        getCourses(listCourses => {
          allCourses(listCourses);
        });
      });
      this.toggle();
    });
  };

  openEditModal = () => {
    const { maKhoaHoc } = this.props;
    getCourseDetail(maKhoaHoc, course => {
      const danhMucKhoaHoc = course.danhMucKhoaHoc;

      this.setState({
        maKhoaHoc: course.maKhoaHoc,
        tenKhoaHoc: course.tenKhoaHoc,
        moTa: course.moTa,
        // hinhAnh: course.hinhAnh,
        maDanhMucKhoaHoc: danhMucKhoaHoc.maDanhMucKhoahoc
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

  onSelectImg = e => {
    this.setState({
      hinhAnhUp: e.target.files[0]
    });
  };

  render() {
    const {
      maKhoaHoc,
      tenKhoaHoc,
      moTa,
      // hinhAnh,
      maDanhMucKhoaHoc
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
            <FormCourses
              onSelectImg={() => this.onSelectImg}
              onChange={() => this.onChange}
              isDisabled={!this.props.isButtonAdd}
              maKhoaHoc={maKhoaHoc}
              tenKhoaHoc={tenKhoaHoc}
              moTa={moTa}
              // hinhAnh={hinhAnh}
              maDanhMucKhoaHoc={maDanhMucKhoaHoc}
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
    allCourses: data => {
      dispatch(allCourses(data));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ModalCourses);
