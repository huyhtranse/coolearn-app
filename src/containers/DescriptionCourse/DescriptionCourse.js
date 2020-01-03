import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { getCourseDetail, courseDetail } from "../../Actions/courses";

import DesCourse from "./DesCourse/DesCourse";
import CardCourse from "./CardCourse/CardCourse";

import { Spinner } from "reactstrap";

class DescriptionCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const pathname = this.props.history.location.pathname;
    const maKhoaHoc = _.last(pathname.split("/"));

    getCourseDetail(maKhoaHoc, res => {
      this.setState({ loading: false });
      this.props.courseDetail(res);
    });
  }

  componentWillUnmount() {
    this.props.courseDetail({});
  }

  render() {
    return (
      <div className="descourse">
        {this.state.loading ? (
          <div className="descourse__spinner">
            <Spinner color="success" className="descourse__spinner--logo" />
          </div>
        ) : (
          <div className="descourse__content">
            <DesCourse />
            <CardCourse />
          </div>
        )}
      </div>
    );
  }
}

const getDispatchToProps = dispatch => {
  return {
    courseDetail: course => {
      dispatch(courseDetail(course));
    }
  };
};

export default connect(
  null,
  getDispatchToProps
)(DescriptionCourse);
