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
import { listSub, listUnsub } from "../../../../../Actions/Admin/users";
import {
  courseDontUser,
  courseHaveUser,
  unsubCourseForUser,
  subCourseForUser
} from "../../../../../Actions/Admin/courses";
import CoursesItemDetail from "../CoursesItemDetail/CoursesItemDetail";
import { ReactComponent as Search } from "../../../../../assets/SVG/search.svg";

class CoursesDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maKhoaHoc: "",
      listSubState: [],
      listUnsubState: [],
      searchSub: "",
      searchUnsub: ""
    };
  }

  componentDidMount() {
    const pathname = this.props.history.location.pathname;
    const maKhoaHoc = _.last(pathname.split("/"));
    this.setState({ maKhoaHoc: maKhoaHoc });

    const { listSub, listUnsub } = this.props;

    courseDontUser(maKhoaHoc, data => {
      listUnsub(data);
      this.setState({ listUnsubState: data });
    });

    courseHaveUser(maKhoaHoc, data => {
      listSub(data);
      this.setState({ listSubState: data });
    });
  }

  getUserOfCourse = () => {
    const { maKhoaHoc } = this.state;
    const { listUnsub, listSub } = this.props;

    courseDontUser(maKhoaHoc, data => {
      listUnsub(data);
      this.setState({ listUnsubState: data });
    });

    courseHaveUser(maKhoaHoc, data => {
      listSub(data);
      this.setState({ listSubState: data });
    });
  };

  onUnsubCourse = taiKhoan => {
    const { maKhoaHoc } = this.state;
    unsubCourseForUser({ maKhoaHoc, taiKhoan }, res => {
      this.getUserOfCourse();
    });
  };

  onSubCourse = taiKhoan => {
    const { maKhoaHoc } = this.state;
    subCourseForUser({ maKhoaHoc, taiKhoan }, res => {
      this.getUserOfCourse();
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
            let taiKhoan = item.taiKhoan.toLowerCase();
            return taiKhoan.includes(tempSearchSub);
          });
        }
        listSub(filterSub);

        if (searchUnsub.length > 0) {
          let tempSearchUnsub = searchUnsub.toLowerCase().trim();

          filterUnsub = filterUnsub.filter(item => {
            let taiKhoan = item.taiKhoan.toLowerCase();
            return taiKhoan.includes(tempSearchUnsub);
          });
        }
        listUnsub(filterUnsub);
      }
    );
  };

  render() {
    const { maKhoaHoc } = this.state;
    const { listUnsubProps, listSubProps } = this.props;
    const listSubItem = listSubProps.map(item => (
      <CoursesItemDetail
        key={item.taiKhoan}
        taiKhoan={item.taiKhoan}
        labelButton="Hủy ghi danh"
        color="#d62d20"
        onClick={() => this.onUnsubCourse(item.taiKhoan)}
      />
    ));

    const listUnsubItem = listUnsubProps.map(item => (
      <CoursesItemDetail
        key={item.taiKhoan}
        taiKhoan={item.taiKhoan}
        labelButton="Ghi danh"
        color="#1abc9c"
        onClick={() => this.onSubCourse(item.taiKhoan)}
      />
    ));

    return (
      <div className="admin__coursedetail">
        <Jumbotron className="admin__coursedetail--heading">
          <h1 className="display-3">Khóa học, {maKhoaHoc}</h1>
        </Jumbotron>
        <Row className="admin__coursedetail--content">
          <Col xs="6" className="admin__coursedetail--left">
            <div className="admin__coursedetail--left--heading">
              <h2>Tài khoản đã ghi danh</h2>
            </div>
            <InputGroup>
              <Input
                placeholder="Tìm tài khoản.."
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
              <p>Không tìm thấy người dùng</p>
            )}
          </Col>
          <Col xs="6" className="admin__coursedetail--right">
            <div className="admin__coursedetail--right--heading">
              <h2>Tài khoản chưa ghi danh</h2>
            </div>
            <InputGroup>
              <Input
                placeholder="Tìm tài khoản..."
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
              <p>Không tìm thấy người dùng</p>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listSubProps: state.listSub,
    listUnsubProps: state.listUnsub
  };
};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesDetail);
