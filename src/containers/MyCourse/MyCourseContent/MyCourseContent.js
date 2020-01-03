import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MyCourseItem from "../MyCourseItem/MyCourseItem";
import { listMyCourse } from "../../../Actions/courses";

import { unsubCoures } from "../../../Actions/courses";
import { getUserDetail } from "../../../Actions/users";

import swal from "sweetalert";
import { Spinner } from "reactstrap";

class MyCourseContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maKhoaHoc: "",
      loading: false,
      loadingList: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loadingList: false });
    }, 4000);
  }

  onUnsub = maKhoaHoc => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const { taiKhoan } = currentUser;
    const { listMyCourseProps, listMyCourse } = this.props;

    this.setState({ maKhoaHoc: maKhoaHoc });

    swal({
      title: "Bạn thật sự muốn hủy khóa học này?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      this.setState({ loading: true });
      setTimeout(() => {
        if (this.state.loading) {
          this.setState({ loading: false });
        }
      }, 10000);
      if (willDelete) {
        unsubCoures(
          {
            maKhoaHoc,
            taiKhoan
          },
          () => {
            this.setState({ loading: false });

            swal("Hủy khóa học thành công", {
              icon: "success"
            });

            getUserDetail(taiKhoan, res => {
              const listCourseFilter = listMyCourseProps.filter(
                el => el.maKhoaHoc !== maKhoaHoc
              );
              listMyCourse(listCourseFilter);
            });
            this.props.history.push("/my-course");
          }
        );
      } else {
        this.setState({ loading: false });
      }
    });
  };

  render() {
    const { loading, loadingList, maKhoaHoc } = this.state;
    const { listMyCourseProps } = this.props;
    const listCourse = listMyCourseProps.map(el => (
      <div key={el.maKhoaHoc}>
        <MyCourseItem
          loading={maKhoaHoc === el.maKhoaHoc ? loading : null}
          maKhoaHoc={el.maKhoaHoc}
          tenKhoaHoc={el.tenKhoaHoc}
          hinhAnh={el.hinhAnh}
          nguoiTao={el.nguoiTao.hoTen}
          moTa={el.moTa}
          onUnsub={() => this.onUnsub(el.maKhoaHoc)}
        />
      </div>
    ));
    return (
      <div className="allcourses__container">
        {loadingList ? (
          <div className="allcourses__container__spinning">
            <Spinner />
          </div>
        ) : (
          <>
            <p>{listMyCourseProps.length} khóa học</p>
            <div className="mycourse__container--content">{listCourse}</div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listMyCourseProps: state.listMyCourse
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listMyCourse: data => {
      dispatch(listMyCourse(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MyCourseContent));
