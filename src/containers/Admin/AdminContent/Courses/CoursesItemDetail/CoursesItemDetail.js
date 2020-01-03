import React from "react";

const CoursesItemDetail = props => {
  return (
    <div className="admin__coursedetail-item">
      <div className="admin__coursedetail-item--heading">
        <h4>{props.taiKhoan}</h4>
      </div>
      <button style={{ color: props.color }} onClick={props.onClick}>
        {props.labelButton}
      </button>
    </div>
  );
};

export default CoursesItemDetail;
