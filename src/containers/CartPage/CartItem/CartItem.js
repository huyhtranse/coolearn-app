import React from "react";
import { Link } from "react-router-dom";
import ImgReplace from "../../../assets/img/img_replace.PNG";

const CartItem = props => {
  const addDefaultSrc = ev => {
    ev.target.src = ImgReplace;
  };

  return (
    <div className="mycart__item">
      <Link
        to={`course-detail/${props.maKhoaHoc}`}
        className="mycart__item-content"
        style={{ textDecoration: "none" }}
      >
        <div>
          <img
            src={props.hinhAnh}
            alt={`hinh khóa học`}
            className="mycart__item-img"
            onError={addDefaultSrc}
          />
        </div>
        <div className="mycart__text">
          <h3>{props.tenKhoaHoc}</h3>
          <p>{props.nguoiTao}</p>
        </div>
      </Link>
      <div>
        <button className="mycart__btn" onClick={props.onClick}>
          Xóa
        </button>
      </div>
    </div>
  );
};

export default CartItem;
