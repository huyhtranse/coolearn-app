import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Jumbotron,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Input
} from "reactstrap";
import _ from "lodash";
import {
  userDontCourse,
  userHaveCourse,
  listSub,
  listUnsub
} from "../../../../../Actions/Admin/users";
import { doSub, doUnsub } from "../../../../../Actions/Admin/courses";
import UserItemDetail from "../UserItemDetail/UserItemDetail";
import { ReactComponent as Search } from "../../../../../assets/SVG/search.svg";
class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taiKhoan: "",
      listSubState: [],
      listUnsubState: [],
      searchSub: "",
      searchUnsub: ""
    };
  }

  componentDidMount() {
    const pathname = this.props.history.location.pathname;
    const taiKhoan = _.last(pathname.split("/"));
    this.setState({ taiKhoan: taiKhoan });

    const { listUnsub, listSub } = this.props;

    userHaveCourse(taiKhoan, data => {
      listSub(data);
      this.setState({ listSubState: data }, () => {
        // url LayDanhSachKhoaHocChuaGhiDanh hoat dong (sai) nhu la LayDanhSanhKhoaHoc
        userDontCourse(taiKhoan, data => {
          const listSubID = this.state.listSubState.map(item => item.maKhoaHoc);
          const listUnsubFilter = data.filter(
            item => !listSubID.includes(item.maKhoaHoc)
          );

          this.setState({ listUnsubState: listUnsubFilter });
          listUnsub(listUnsubFilter);
        });
      });
    });
  }

  getCourseOfUser = () => {
    const { taiKhoan } = this.state;
    const { listUnsub, listSub } = this.props;
    userHaveCourse(taiKhoan, data => {
      listSub(data);
      this.setState({ listSubState: data }, () => {
        // url LayDanhSachKhoaHocChuaGhiDanh hoat dong (sai) nhu la LayDanhSanhKhoaHoc
        userDontCourse(taiKhoan, data => {
          const listSubID = this.state.listSubState.map(item => item.maKhoaHoc);
          const listUnsubFilter = data.filter(
            item => !listSubID.includes(item.maKhoaHoc)
          );

          this.setState({ listUnsubState: listUnsubFilter });
          listUnsub(listUnsubFilter);
        });
      });
    });
  };

  onUnsub = maKhoaHoc => {
    const { taiKhoan } = this.state;
    doUnsub({ maKhoaHoc, taiKhoan }, res => {
      this.getCourseOfUser();
    });
  };

  onSub = maKhoaHoc => {
    const { taiKhoan } = this.state;
    doSub({ maKhoaHoc, taiKhoan }, res => {
      this.getCourseOfUser();
    });
  };

  onChange = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        const {
          listSubState,
          listUnsubState,
          searchSub,
          searchUnsub
        } = this.state;
        const { listUnsub, listSub } = this.props;

        let filterSub = [...listSubState];
        let filterUnsub = [...listUnsubState];

        if (searchSub.length > 0) {
          let tempSearchSub = searchSub.toLowerCase().trim();

          filterSub = filterSub.filter(item => {
            let tenKhoaHoc = item.tenKhoaHoc.toLowerCase();
            return tenKhoaHoc.includes(tempSearchSub);
          });
        }
        listSub(filterSub);

        if (searchUnsub.length > 0) {
          let tempSearchUnsub = searchUnsub.toLowerCase().trim();

          filterUnsub = filterUnsub.filter(item => {
            let tenKhoaHoc = item.tenKhoaHoc.toLowerCase();
            return tenKhoaHoc.includes(tempSearchUnsub);
          });
        }
        listUnsub(filterUnsub);
      }
    );
  };

  render() {
    const { taiKhoan } = this.state;
    const { listSubProps, listUnsubProps } = this.props;
    const listSubItem = listSubProps.map(item => (
      <UserItemDetail
        key={item.maKhoaHoc}
        maKhoaHoc={item.maKhoaHoc}
        tenKhoaHoc={item.tenKhoaHoc}
        labelButton="Hủy ghi danh"
        color="#d62d20"
        onClick={() => this.onUnsub(item.maKhoaHoc)}
      />
    ));

    const listUnsubItem = listUnsubProps.map(item => (
      <UserItemDetail
        key={item.maKhoaHoc}
        maKhoaHoc={item.maKhoaHoc}
        tenKhoaHoc={item.tenKhoaHoc}
        labelButton="Ghi danh"
        color="#1abc9c"
        onClick={() => this.onSub(item.maKhoaHoc)}
      />
    ));
    return (
      <div className="admin__userdetail">
        <Jumbotron className="admin__userdetail--heading">
          <h1 className="display-3">Tài khoản, {taiKhoan}</h1>
        </Jumbotron>
        <Row className="admin__userdetail--content">
          <Col xs="6" className="admin__userdetail--left">
            <div className="admin__userdetail--left--heading">
              <h2>Khóa học đã ghi danh</h2>
            </div>
            <InputGroup>
              <Input
                placeholder="Tìm khóa học..."
                name="searchSub"
                onChange={this.onChange}
              />
              <InputGroupAddon addonType="append">
                <Search />
              </InputGroupAddon>
            </InputGroup>

            {listSubItem.length > 0 ? (
              listSubItem
            ) : (
              <p className="nofind">Không tìm thấy khóa học</p>
            )}
          </Col>
          <Col xs="6" className="admin__userdetail--right">
            <div className="admin__userdetail--right--heading">
              <h2>Khóa học chưa ghi danh</h2>
            </div>
            <InputGroup>
              <Input
                placeholder="Tìm khóa học..."
                name="searchUnsub"
                onChange={this.onChange}
              />
              <InputGroupAddon addonType="append">
                <Search />
              </InputGroupAddon>
            </InputGroup>

            {listUnsubItem.length > 0 ? (
              listUnsubItem
            ) : (
              <p className="nofind">Không tìm thấy khóa học</p>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    listSub: data => {
      dispatch(listSub(data));
    },

    listUnsub: data => {
      dispatch(listUnsub(data));
    }
  };
};

const mapStateToProps = state => {
  return {
    listSubProps: state.listSub,
    listUnsubProps: state.listUnsub
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetail);
