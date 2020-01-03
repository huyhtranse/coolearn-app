import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { enrollCourse } from "../../../Actions/courses";
import { getUserDetail } from "../../../Actions/users";
import { cartList } from "../../../Actions/cart";
import { listMyCourse } from "../../../Actions/courses";
import { Link } from "react-router-dom";
import ImgReplace from "../../../assets/img/img_replace.PNG";

import { Progress, Spinner } from "reactstrap";

import swal from "sweetalert";

class CardCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taiKhoan: "",
      isSubPage: false,
      historyUrl: "/",
      loading: false
    };
  }

  addDefaultSrc = ev => {
    ev.target.src = ImgReplace;
  };

  componentDidMount() {
    const pathname = this.props.history.location.pathname;
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (pathname.indexOf("sub-course") !== -1) {
      this.setState({ isSubPage: true });
    }

    if (currentUser) {
      this.setState({
        taiKhoan: currentUser.taiKhoan
      });
    }
  }

  onEnroll = e => {
    e.preventDefault();
    this.setState({ loading: true });

    setTimeout(() => {
      if (this.state.loading) {
        this.setState({ loading: false });
      }
    }, 10000);

    const { taiKhoan } = this.state;
    const {
      courseDetail,
      listMyCourseProps,
      listMyCourse,
      cartListProps,
      cartList
    } = this.props;

    const maKhoaHoc = courseDetail.maKhoaHoc;
    const tenKhoaHoc = courseDetail.tenKhoaHoc;

    if (taiKhoan !== "" && maKhoaHoc !== "") {
      enrollCourse({ taiKhoan, maKhoaHoc }, () => {
        swal({
          title: `Ghi danh ${tenKhoaHoc} thành công`,
          icon: "success",
          button: "Đóng"
        });
        this.setState({ loading: false });

        getUserDetail(taiKhoan, res => {
          listMyCourse([...listMyCourseProps, courseDetail]);

          // remove
          const indexRemove = cartListProps.findIndex(
            el => el.maKhoaHoc === maKhoaHoc
          );

          if (indexRemove !== -1) {
            const filterCart = cartListProps.filter(
              el => el.maKhoaHoc !== maKhoaHoc
            );
            cartList(filterCart);

            localStorage.setItem("cartList", JSON.stringify(filterCart));

            swal({
              title: `Khóa ${tenKhoaHoc} sẽ được loại bỏ ra khỏi giỏ hàng sau khi đăng ký thành công`,
              icon: "warning",
              button: "Đóng"
            });
          }

          this.props.history.push("/my-course");
        });
      });
    } else {
      swal({
        title: "Vui lòng đăng nhập trước khi thanh toán",
        icon: "error",
        button: "Đóng"
      });
      this.props.history.push("/signin");
    }
  };

  addCart = () => {
    const courseDetail = this.props.courseDetail;
    const cartListStorage = JSON.parse(localStorage.getItem("cartList"));

    if (this.state.taiKhoan === "") {
      swal("Vui lòng đăng nhập để tiếp tục!", {
        buttons: {
          cancel: "Hủy",
          catch: {
            text: "Đăng nhập",
            value: "login"
          }
        }
      }).then(value => {
        switch (value) {
          case "login":
            this.props.history.push("/signin");
            break;
        }
      });
      return;
    }

    if (cartListStorage.length === 0) {
      this.props.cartList([...cartListStorage, courseDetail]);
      localStorage.setItem(
        "cartList",
        JSON.stringify([...cartListStorage, courseDetail])
      );
      swal({
        title: "Thêm vào giỏ thành công!",
        icon: "success",
        button: "Đóng"
      });
    } else if (cartListStorage.length !== 0) {
      const cartItem = cartListStorage.find(
        ele => ele.maKhoaHoc === courseDetail.maKhoaHoc
      );

      if (!cartItem) {
        this.props.cartList([...cartListStorage, courseDetail]);
        localStorage.setItem(
          "cartList",
          JSON.stringify([...cartListStorage, courseDetail])
        );
        swal({
          title: "Thêm vào giỏ thành công!",
          icon: "success",
          button: "Đóng"
        });
      } else {
        swal({
          title: "Khóa học đã có trong giỏ!",
          icon: "warning",
          button: "Đóng"
        });
      }
    }
  };

  render() {
    const { hinhAnh, maKhoaHoc } = this.props.courseDetail;
    const { loading } = this.state;

    const cardBtn = !this.state.isSubPage ? (
      <div className="descourse__btn">
        <Link
          to={`/sub-course/${maKhoaHoc}`}
          className="descourse__btn-entercourse"
        >
          Truy cập khóa học
        </Link>
      </div>
    ) : (
      <>
        <div className="text-center progress__course">
          Tiến độ khóa học: 25%
        </div>
        <Progress value="25" />
      </>
    );

    return (
      <div className="descourse__card">
        <div className="descourse__card-content-img">
          <img
            src={hinhAnh}
            alt="course-logo"
            className="descourse__card-img"
            onError={this.addDefaultSrc}
          />
        </div>

        {!this.props.isEnroll ? (
          <div className="descourse__btn">
            <button className="descourse__btn-addcart" onClick={this.addCart}>
              Thêm vào giỏ hàng
            </button>

            <button
              className="descourse__btn-sub"
              onClick={this.onEnroll}
              disabled={loading}
            >
              {loading && <Spinner style={{ marginRight: "1.4rem" }} />} Ghi
              danh
            </button>
          </div>
        ) : (
          //  (
          //   <div className="descourse__btn">
          //     <Link
          //       to={`/sub-course/${maKhoaHoc}`}
          //       className="descourse__btn-entercourse"
          //     >
          //       Truy cập khóa học
          //     </Link>
          //   </div>
          // )
          cardBtn
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isEnroll: state.isEnroll,
    courseDetail: state.courseDetail,
    listMyCourseProps: state.listMyCourse,
    cartListProps: state.cartList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cartList: data => {
      dispatch(cartList(data));
    },
    listMyCourse: data => {
      dispatch(listMyCourse(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CardCourse));
