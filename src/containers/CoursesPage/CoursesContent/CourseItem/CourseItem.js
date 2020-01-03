import React from "react";
import { Link } from "react-router-dom";
import ImgReplace from "../../../../assets/img/img_replace.PNG";

const CourseItem = props => {
  const addDefaultSrc = ev => {
    ev.target.src = ImgReplace;
  };

  return (
    <div className="allcourses__item">
      <div>
        <img
          src={props.hinhAnh}
          alt={`Hinh khóa học`}
          className="allcourses__item-img"
          onError={addDefaultSrc}
        />
      </div>

      <div className="allcourses__item-text">
        <div>
          <h4 className="allcourses__item-title">{props.tenKhoaHoc}</h4>
        </div>

        <div>
          <div>
            <span>{props.moTa}</span> | <span>{props.nguoiTao}</span>
          </div>
        </div>

        <div>
          <div>
            Lượt xem: <span>{props.luotXem}</span>
          </div>
          <div>
            Số lượng học viên: <span>{props.soLuongHocVien}</span>
          </div>
        </div>
      </div>

      <Link
        to={`/course-detail/${props.maKhoaHoc}`}
        style={{ textDecoration: "none" }}
        className="allcourses__item-link"
      >
        Xem chi tiết
      </Link>
    </div>
  );
};

export default CourseItem;
