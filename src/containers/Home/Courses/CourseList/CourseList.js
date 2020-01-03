import React, { Component } from "react";
import { connect } from "react-redux";

// import reactstrap
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Spinner
} from "reactstrap";
import classnames from "classnames";

// import component
import CardCarousel from "../CardCarousel/CardCarousel";

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      loading: true
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const listTabs = this.props.listCourses.map((el, index) => (
      <NavItem key={el.tenDanhMuc}>
        <NavLink
          className={classnames({
            active: this.state.activeTab === `${index + 1}`
          })}
          onClick={() => {
            this.toggle(`${index + 1}`);
          }}
        >
          {el.tenDanhMuc}
        </NavLink>
      </NavItem>
    ));

    const tabContent = this.props.listCourses.map((el, index) => (
      <TabPane tabId={`${index + 1}`} key={el.maDanhMuc}>
        <CardCarousel maDanhMuc={el.maDanhMuc} />
      </TabPane>
    ));

    return (
      <div className="courses__list">
        <Nav tabs>{listTabs}</Nav>

        {/* content*/}
        <TabContent activeTab={this.state.activeTab}>
          {this.props.listCourses.length === 0 ? (
            <div className="courses__list__spinning">
              <Spinner />
            </div>
          ) : (
            tabContent
          )}
        </TabContent>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    listCourses: state.listCourses
  };
};
export default connect(mapStateToProps)(CourseList);
