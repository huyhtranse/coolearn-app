import React, { Component } from "react";
import { connect } from "react-redux";

import { ReactComponent as Facebook } from "../../../assets/SVG/facebook.svg";
import { ReactComponent as Instagram } from "../../../assets/SVG/instagram.svg";
import { ReactComponent as Twitter } from "../../../assets/SVG/twitter.svg";
import { ReactComponent as Sun } from "../../../assets/SVG/brightness_highbrightness_7.svg";

import { Link } from "react-router-dom";
import { filterCourses } from "../../../Actions/courses";
import { courseCategories } from "../../../Actions/categories";

class FooterMain extends Component {
  moveCategories = () => {
    const { courses, courseCategories, filterCourses } = this.props;
    courseCategories("all");
    filterCourses(courses);
  };
  render() {
    return (
      <div className="footer__main">
        <div className="footer__social">
          <a href="https://twitter.com/">
            <div className="footer__icon footer__facebook">
              <Facebook />
              <span>@Coolearn</span>
            </div>
          </a>
          <a href="https://facebook.com/">
            <div className="footer__icon footer__twitter">
              <Twitter />
              <span>Coolearn</span>
            </div>
          </a>
          <a href="https://instagram.com/">
            <div className="footer__icon footer__instagram">
              <Instagram />
              <span>#Coolearn</span>
            </div>
          </a>
        </div>
        <div className="footer__menu">
          <ul>
            <li>
              <Link to="/" id="footer__home">
                Trang chủ
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/courses/all" onClick={this.moveCategories}>
                Khóa học
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/career">Tuyển dụng</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/contact">Liện hệ</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/term">Điều khoản</Link>
            </li>
          </ul>
        </div>

        <div className="footer__about">
          <div className="footer__logo">
            <span className="footer__logo--1">CO</span>
            <Sun className="footer__logo--sun" />
            <span className="footer__logo--2">LEARN</span>
          </div>
          <div>
            <p className="footer__inc">Coolearn Inc.</p>
            <address>
              1409 Yasuo Ultimate, Mid 15GG
              <br />
            </address>
          </div>
          <Link to="/404" className="footer__email">
            Email Us
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    courseCategories: data => {
      dispatch(courseCategories(data));
    },

    filterCourses: data => {
      dispatch(filterCourses(data));
    }
  };
};

const mapStateToProps = state => {
  return {
    courses: state.courses
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FooterMain);
