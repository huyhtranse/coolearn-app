import React, { Component } from "react";
import { Col, Row, Form, FormGroup, Label, Input } from "reactstrap";

class FormUser extends Component {
  render() {
    const {
      onChange,
      isDisabled,

      taiKhoan,
      hoTen,
      matKhau,
      email,
      soDT,
      maLoaiNguoiDung
    } = this.props;

    return (
      <Form>
        <Row form>
          <Col md={6}>
            <FormGroup className="admin-form-group">
              <Label for="taiKhoan">Tài khoản</Label>
              <Input
                type="text"
                name="taiKhoan"
                id="taiKhoan"
                placeholder="Tài khoản"
                onChange={onChange()}
                disabled={isDisabled ? true : false}
                value={taiKhoan}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup className="admin-form-group">
              <Label for="hoTen">Họ tên</Label>
              <Input
                type="text"
                name="hoTen"
                id="hoTen"
                placeholder="Họ tên"
                onChange={onChange()}
                value={hoTen}
              />
            </FormGroup>
          </Col>
        </Row>
        {/* ////// */}
        <Row form>
          <Col md={6}>
            <FormGroup className="admin-form-group">
              <Label for="soDT">Số điện thoại</Label>
              <Input
                type="text"
                name="soDT"
                id="soDT"
                placeholder="Số điện thoại"
                onChange={onChange()}
                value={soDT}
                required="required"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup className="admin-form-group">
              <Label for="email">Email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChange()}
                value={email}
                required="required"
              />
            </FormGroup>
          </Col>
        </Row>
        {/* //// */}
        <Row form>
          <Col md={12}>
            <FormGroup className="admin-form-group">
              <Label for="matKhau">Mật khẩu</Label>
              <Input
                type="text"
                name="matKhau"
                id="matKhau"
                placeholder="Mật khẩu"
                onChange={onChange()}
                value={matKhau}
                required="required"
              />
            </FormGroup>
          </Col>
        </Row>
        {/* //// */}
        <Row form>
          <Col sm={12}>
            <FormGroup className="admin-form-group">
              <Label for="maLoaiNguoiDung">Loại người dùng</Label>
              <Input
                type="select"
                name="maLoaiNguoiDung"
                id="maLoaiNguoiDung"
                onChange={onChange()}
                value={maLoaiNguoiDung}
              >
                <option value="EMPTY">Chọn</option>
                <option value="HV">Học Viên</option>
                <option value="GV">Giáo vụ</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default FormUser;
