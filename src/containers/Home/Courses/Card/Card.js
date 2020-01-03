import React, { Component } from "react";

import ImgReplace from "../../../../assets/img/img_replace.PNG";
import { Link } from "react-router-dom";

class Card extends Component {
  addDefaultSrc = ev => {
    ev.target.src = ImgReplace;
  };
  render() {
    return (
      <div
        className="courses__card"
        style={{ animationDelay: this.props.animationDelay }}
      >
        <div className="courses__card--img">
          <figure>
            <img
              src={this.props.hinhAnh}
              alt="star-icon"
              onError={this.addDefaultSrc}
            />
          </figure>
        </div>
        <div className="courses__card-content">
          <h4>{this.props.tenKhoaHoc}</h4>
          <p>{this.props.nguoiTao}</p>

          <h5>Lượt xem: {this.props.luotXem}</h5>
          <h5>Học viên: {this.props.soLuongHocVien}</h5>
          <Link
            to={`/course-detail/${this.props.maKhoaHoc}`}
            className="courses__btn"
          >
            Chi tiết
          </Link>
        </div>
      </div>
    );
  }
}

export default Card;
