import React from "react";
import { signin, setCurrentUser, getUserDetail } from "../../../Actions/users";

import { connect } from "react-redux";
import * as Yup from "yup";
import { withFormik, Form, Field } from "formik";

import { Spinner } from "reactstrap";

const SignIn = ({ errors, touched, isSubmitting }) => {
  const styleInvalid = "3px solid #ff7730";
  const styleValid = "3px solid #1abc9c";

  return (
    <div className="signin">
      <div className="signin__content">
        <Form className="signin__form">
          <h2 className="heading-secondary  u-margin-bottom-medium signin__heading">
            Đăng Nhập
          </h2>
          <div className="signin__gird">
            <div
              className="form-group signin__group"
              style={{ marginBottom: "55px" }}
            >
              <Field
                type="text"
                placeholder="Tài khoản"
                className="form__input signin__input"
                name="taiKhoan"
                style={{
                  borderBottom: `${
                    touched.taiKhoan
                      ? errors.taiKhoan
                        ? styleInvalid
                        : styleValid
                      : null
                  }`
                }}
              />
              <label htmlFor="taikhoan" className="form__label">
                Tài khoản
              </label>
              {touched.taiKhoan && errors.taiKhoan && <p>{errors.taiKhoan}</p>}
            </div>

            <div
              className="form-group signin__group"
              style={{ marginBottom: "55px" }}
            >
              <Field
                type="password"
                placeholder="Mật khẩu"
                className="form__input signin__input"
                name="matKhau"
                style={{
                  borderBottom: `${
                    touched.matKhau
                      ? errors.matKhau
                        ? styleInvalid
                        : styleValid
                      : null
                  }`
                }}
              />
              <label htmlFor="matkhau" className="form__label">
                Mật khẩu
              </label>
              {touched.matKhau && errors.matKhau && <p>{errors.matKhau}</p>}
            </div>

            <div className="signin__button">
              <button
                type="submit"
                className="my-button my-button-full"
                disabled={isSubmitting}
              >
                {isSubmitting && <Spinner style={{ marginRight: "1.4rem" }} />}
                Đăng nhập
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

const FormikSignIn = withFormik({
  mapPropsToValues({ taiKhoan, matKhau }) {
    return {
      taiKhoan: taiKhoan || "",
      matKhau: matKhau || ""
    };
  },
  validationSchema: Yup.object().shape({
    taiKhoan: Yup.string()
      .min(8, "Tài khoản phải có ít nhất 8 ký tự.")
      .max(16, "Tài khoản tối đa 16 ký tự.")
      .required("Vui lòng điền tài khoản."),
    matKhau: Yup.string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự.")
      .max(16, "Tài khoản tối đa 16 ký tự.")
      .required("Vui lòng điền mật khẩu.")
  }),
  handleSubmit(values, { setSubmitting, props }) {
    setTimeout(() => {
      setSubmitting(false);
    }, 5000);

    signin(values, user => {
      setSubmitting(false);
      getUserDetail(user.taiKhoan, () => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        props.setCurrentUser(currentUser);
      });

      if (user.maLoaiNguoiDung === "HV") {
        props.history.push("/");
      } else if (user.maLoaiNguoiDung === "GV") {
        props.history.push("/admin");
      }
    });
  }
})(SignIn);

const mapDispacthToProps = {
  setCurrentUser: setCurrentUser
};

export default connect(
  null,
  mapDispacthToProps
)(FormikSignIn);
