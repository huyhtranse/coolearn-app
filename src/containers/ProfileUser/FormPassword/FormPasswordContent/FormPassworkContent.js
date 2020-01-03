import React from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import { editUser, setCurrentUser } from "../../../../Actions/users";
import { maNhom } from "../../../../MaNhom/MaNhom";
import { withFormik, Form, Field } from "formik";
import swal from "sweetalert";
import { Spinner } from "reactstrap";
import { withRouter } from "react-router-dom";

const FormPassworkContent = ({ errors, touched, isSubmitting }) => {
  const styleInvalid = "3px solid #ff7730";
  const styleValid = "3px solid #1abc9c";

  return (
    <Form className="profile__form">
      <div className="profile__flex">
        <div className="form-group profile__group">
          <Field
            type="password"
            placeholder="Mật khẩu"
            name="matKhau"
            className="form__input profile__input"
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
          <label htmlFor="matKhau" className="form__label">
            Mật khẩu
          </label>
          {touched.matKhau && errors.matKhau && <p>{errors.matKhau}</p>}
        </div>

        <div
          className="form-group profile__group"
          style={{ marginBottom: "-35px" }}
        >
          <Field
            type="password"
            placeholder="Nhập lại mật khẩu"
            name="nhapLaiMatKhau"
            className="form__input profile__input"
            style={{
              borderBottom: `${
                touched.nhapLaiMatKhau
                  ? errors.nhapLaiMatKhau
                    ? styleInvalid
                    : styleValid
                  : null
              }`
            }}
          />
          <label htmlFor="nhapLaiMatKhau" className="form__label">
            Nhập lại mật khẩu
          </label>
          {touched.nhapLaiMatKhau && errors.nhapLaiMatKhau && (
            <p>{errors.nhapLaiMatKhau}</p>
          )}
        </div>
      </div>
      <div className="profile__button">
        <button
          className="profile__button-bottom"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting && <Spinner style={{ marginRight: "1.4rem" }} />}Đổi mật
          khẩu
        </button>
      </div>
    </Form>
  );
};

const FormikFormPassworkContent = withFormik({
  mapPropsToValues({ matKhau, nhapLaiMatKhau }) {
    return {
      matKhau: matKhau || "",
      nhapLaiMatKhau: nhapLaiMatKhau || "",
      maNhom: maNhom
    };
  },

  validationSchema: Yup.object().shape({
    matKhau: Yup.string()
      .min(8, "Mật khẩu phải có ít nhất 5 ký tự.")
      .max(16, "Mật khẩu tối đa 20 ký tự.")
      .required("Vui lòng điền mật khẩu."),
    nhapLaiMatKhau: Yup.string()
      .min(8, "Mật khẩu phải có ít nhất 5 ký tự.")
      .max(16, "Mật khẩu tối đa 20 ký tự.")
      .required("Vui lòng điền mật khẩu.")
  }),

  handleSubmit(values, { setSubmitting, props }) {
    const { matKhau, nhapLaiMatKhau, maNhom } = values;

    const { taiKhoan, hoTen, soDT, maLoaiNguoiDung, email } = props;

    setTimeout(() => {
      setSubmitting(false);
    }, 10000);

    if (matKhau === nhapLaiMatKhau) {
      const data = {
        taiKhoan,
        hoTen,
        soDT,
        maLoaiNguoiDung,
        email,
        matKhau,
        maNhom
      };
      editUser(data, () => {
        setSubmitting(false);
        swal({
          title: "Đổi mật khẩu thành công",
          icon: "success",
          button: "Đóng"
        });

        props.setCurrentUser({});

        localStorage.removeItem("currentUser");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("chiTietKhoaHocGhiDanh");

        props.history.push("/signin");
      });
    } else {
      setSubmitting(false);
      swal({
        title: "Nhập lại mật khẩu không đúng",
        icon: "error",
        button: "Đóng"
      });
    }
  }
})(FormPassworkContent);

const mapDispatchToProps = {
  setCurrentUser: setCurrentUser
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(FormikFormPassworkContent));
