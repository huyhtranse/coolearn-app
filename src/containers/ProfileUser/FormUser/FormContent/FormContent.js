import React from "react";
import * as Yup from "yup";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import { maNhom } from "../../../../MaNhom/MaNhom";
import swal from "sweetalert";
import { editUser, getUserDetail } from "../../../../Actions/users";
import { setCurrentUser } from "../../../../Actions/users";

const FormContent = ({ errors, touched, isSubmitting }) => {
  const styleInvalid = "3px solid #ff7730";
  const styleValid = "3px solid #1abc9c";

  return (
    <Form className="profile__form">
      <div className="profile__flex">
        <div
          className="form-group profile__group"
          style={{ marginBottom: "4rem" }}
        >
          <Field
            type="text"
            placeholder="Họ tên"
            name="hoTen"
            className="form__input profile__input"
            style={{
              borderBottom: `${
                touched.hoTen
                  ? errors.hoTen
                    ? styleInvalid
                    : styleValid
                  : null
              }`
            }}
          />
          <label htmlFor="hoTen" className="form__label">
            Họ tên
          </label>

          {touched.hoTen && errors.hoTen && <p>{errors.hoTen}</p>}
        </div>

        <div
          className="form-group profile__group"
          style={{ marginBottom: "4rem" }}
        >
          <Field
            type="email"
            placeholder="Email"
            name="email"
            className="form__input profile__input"
            style={{
              borderBottom: `${
                touched.email
                  ? errors.email
                    ? styleInvalid
                    : styleValid
                  : null
              }`
            }}
          />
          <label htmlFor="email" className="form__label">
            Email
          </label>
          {touched.email && errors.email && <p>{errors.email}</p>}
        </div>

        <div
          className="form-group profile__group"
          style={{ marginBottom: "-4rem" }}
        >
          <Field
            type="text"
            placeholder="Số điện thoại"
            name="soDT"
            className="form__input profile__input"
            style={{
              borderBottom: `${
                touched.soDT ? (errors.soDT ? styleInvalid : styleValid) : null
              }`
            }}
          />
          <label htmlFor="soDT" className="form__label">
            Số điện thoại
          </label>
          {touched.soDT && errors.soDT && <p>{errors.soDT}</p>}
        </div>
      </div>

      <div className="profile__button">
        <button
          type="submit"
          className="profile__button-bottom"
          disabled={isSubmitting}
        >
          {isSubmitting && <Spinner style={{ marginRight: "1.4rem" }} />}Lưu
          thông tin
        </button>
      </div>
    </Form>
  );
};

const FormikForm = withFormik({
  mapPropsToValues({ hoTen, soDT, email }) {
    return {
      hoTen: hoTen || "",
      soDT: soDT || "",
      email: email || "",
      maNhom: maNhom
    };
  },
  enableReinitialize: true,

  validationSchema: Yup.object().shape({
    hoTen: Yup.string()
      .min(5, "Họ tên phải có ít nhất 5 ký tự.")
      .max(16, "Họ tên tối đa 20 ký tự.")
      .required("Vui lòng điền họ tên."),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng điền email."),
    soDT: Yup.string()
      .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
      .min(10, "Số điện thoại tối thiểu 10 số.")
      .max(15, "Số điện thoại tối đa chỉ 15 số.")
      .required("Vui lòng điền số điện thoại.")
  }),

  handleSubmit(values, { setSubmitting, props }) {
    const { taiKhoan, maLoaiNguoiDung } = props;
    getUserDetail(taiKhoan, user => {
      const { matKhau } = user;

      editUser(
        {
          ...{ matKhau },
          ...{ taiKhoan, maLoaiNguoiDung },
          ...values
        },
        () => {
          setSubmitting(false);

          const currentUser = JSON.parse(localStorage.getItem("currentUser"));
          props.setCurrentUser(currentUser);
          swal({
            title: "Đổi thông tin thành công",
            icon: "success",
            button: "Đóng"
          });
        }
      );
    });
  }
})(FormContent);

const mapDispacthToProps = {
  setCurrentUser: setCurrentUser
};

export default connect(null, mapDispacthToProps)(FormikForm);
