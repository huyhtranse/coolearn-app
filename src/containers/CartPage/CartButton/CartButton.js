import React, { Component } from "react";
import { connect } from "react-redux";
import { cartList } from "../../../Actions/cart";
import { enrollCourse, listMyCourse } from "../../../Actions/courses";
import { getUserDetail } from "../../../Actions/users";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";

class CartButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taiKhoan: "",

      cartListState: []
    };
  }

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const cartListLocal = JSON.parse(localStorage.getItem("cartList"));

    if (currentUser) {
      this.setState({
        taiKhoan: currentUser.taiKhoan
      });
    }

    this.setState({
      cartListState: cartListLocal
    });
  }

  clearAll = () => {
    this.props.cartList([]);
    localStorage.setItem("cartList", JSON.stringify([]));
  };

  onErollAll = e => {
    e.preventDefault();
    const { taiKhoan, cartListState } = this.state;
    const {
      listMyCourseProps,
      listMyCourse,
      cartList
      // cartListProps
    } = this.props;

    if (taiKhoan !== "" && cartListState.length !== 0) {
      cartListState.forEach(item => {
        enrollCourse({ taiKhoan, maKhoaHoc: item.maKhoaHoc }, () => {
          listMyCourse([...listMyCourseProps, ...cartListState]);
          cartList([]);
          localStorage.setItem("cartList", JSON.stringify([]));

          swal({
            // title: `Khóa học ${item.tenKhoaHoc} đã được ghi danh`,
            title: `Tất cả khóa học đã được ghi danh`,

            icon: "success",
            button: "Đóng"
          });
          this.props.history.push("/my-course");

          getUserDetail(taiKhoan, res => {
            // const filterCart = cartListProps.filter(
            //   el => el.maKhoaHoc !== item.maKhoaHoc
            // );
          });
        });
      });
    } else if (cartListState.length === 0) {
      swal({
        title: "Không có khóa học nào trong vỏ để ghi danh",
        icon: "warning",
        button: "Đóng"
      });
    } else if (taiKhoan === "") {
      swal({
        title: "Vui lòng đăng nhập trước khi ghi danh",
        icon: "warning",
        button: "Đóng"
      });
      this.props.history.push("/signin");
    }
  };

  render() {
    return (
      <div className="mycart__content-btn">
        <button
          className="mycart__content-btn--clearall"
          onClick={this.clearAll}
        >
          Xóa tất cả
        </button>
        <button
          className="mycart__content-btn--suball"
          onClick={this.onErollAll}
        >
          Ghi danh tất cả
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
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
)(withRouter(CartButton));
