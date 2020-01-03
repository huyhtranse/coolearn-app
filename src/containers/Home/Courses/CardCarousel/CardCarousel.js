import React, { Component } from "react";
import { connect } from "react-redux";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import carousel
import Slider from "react-slick";
import Card from "../Card/Card";

import { Link } from "react-router-dom";
import { maNhom } from "../../../../MaNhom/MaNhom";

// import { Spinner } from "reactstrap";

class CardCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maNhom: maNhom
    };
  }

  render() {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 530,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    let index = 0;
    const renderCourseItems = this.props.courses.map(item => {
      const danhMucKhoaHoc = item.danhMucKhoaHoc ? item.danhMucKhoaHoc : null;

      if (danhMucKhoaHoc.maDanhMucKhoahoc === this.props.maDanhMuc) {
        index += 0.1;
        return (
          <div key={item.maKhoaHoc}>
            <Link
              to={`/course-detail/${item.maKhoaHoc}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                animationDelay={`${index}s`}
                maKhoaHoc={item.maKhoaHoc}
                hinhAnh={item.hinhAnh}
                tenKhoaHoc={item.tenKhoaHoc}
                moTa={item.moTa}
                luotXem={item.luotXem}
                soLuongHocVien={item.soLuongHocVien}
                nguoiTao={item.nguoiTao.hoTen}
              />
            </Link>
          </div>
        );
      } else {
        return null;
      }
    });

    return (
      <div>
        <Slider {...settings}> {renderCourseItems}</Slider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: state.courses
  };
};

export default connect(mapStateToProps)(CardCarousel);
