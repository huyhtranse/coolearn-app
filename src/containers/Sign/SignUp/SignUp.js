import React from "react";
import { signup } from "../../../Actions/users";
import { maNhom } from "../../../MaNhom/MaNhom";
import { Spinner } from "reactstrap";
import * as Yup from "yup";
import { withFormik, Form, Field } from "formik";

const SignUp = ({ errors, touched, isSubmitting }) => {
  const styleInvalid = "3px solid #ff7730";
  const styleValid = "3px solid #1abc9c";

  return (
    <div className="signup">
      <div className="signup__content">
        <Form className="signup__form">
          <h2 className="heading-secondary  u-margin-bottom-medium signup__heading">
            Đăng Ký
          </h2>
          <div className="signup__gird">
            <div className="form-group">
              <Field
                type="text"
                placeholder="Tài khoản"
                className="form__input"
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
              <label htmlFor="taiKhoan" className="form__label">
                Tài khoản
              </label>
              {touched.taiKhoan && errors.taiKhoan && <p>{errors.taiKhoan}</p>}
            </div>

            <div className="form-group">
              <Field
                type="password"
                placeholder="Mật khẩu"
                className="form__input"
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

            <div className="form-group">
              <Field
                type="hoTen"
                placeholder="Họ tên"
                className="form__input"
                name="hoTen"
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
              <label htmlFor="hoten" className="form__label">
                Họ tên
              </label>
              {touched.hoTen && errors.hoTen && <p>{errors.hoTen}</p>}
            </div>

            <div className="form-group">
              <Field
                type="text"
                placeholder="Số điện thoại"
                className="form__input"
                name="soDT"
                style={{
                  borderBottom: `${
                    touched.soDT
                      ? errors.soDT
                        ? styleInvalid
                        : styleValid
                      : null
                  }`
                }}
              />
              <label htmlFor="sodienthoai" className="form__label">
                Số điện thoại
              </label>
              {touched.soDT && errors.soDT && <p>{errors.soDT}</p>}
            </div>

            <div className="form-group signup__email">
              <Field
                type="email"
                placeholder="Email"
                className="form__input"
                name="email"
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
          </div>

          <div className="signup__button">
            <button
              type="submit"
              className="my-button my-button-full"
              disabled={isSubmitting}
            >
              {isSubmitting && <Spinner style={{ marginRight: "1.4rem" }} />}
              Đăng ký
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

const FormikSignUn = withFormik({
  mapPropsToValues({ taiKhoan, matKhau, hoTen, soDT, email }) {
    return {
      taiKhoan: taiKhoan || "",
      matKhau: matKhau || "",
      hoTen: hoTen || "",
      soDT: soDT || "",
      email: email || "",
      maNhom: maNhom
    };
  },
  validationSchema: Yup.object().shape({
    taiKhoan: Yup.string()
      .min(8, "Tài khoản phải có ít nhất 8 ký tự.")
      .max(16, "Tài khoản tối đa 16 ký tự.")
      .required("Vui lòng điền tài khoản."),
    matKhau: Yup.string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự.")
      .max(16, "Tài khoản tối đa 30 ký tự.")
      .required("Vui lòng điền mật khẩu."),
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
    setTimeout(() => {
      setSubmitting(false);
    }, 10000);

    signup(values, () => {
      setSubmitting(false);
      props.history.push("/signin");
    });
  }
})(SignUp);

export default FormikSignUn;
