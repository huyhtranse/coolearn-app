import React from "react";

const UserItemDetail = props => {
  return (
    <div className="admin__userdetail--item">
      <div className="admin__userdetail--item--heading">
        <h4>{props.tenKhoaHoc}</h4>
      </div>
      <button style={{ color: props.color }} onClick={props.onClick}>
        {props.labelButton}
      </button>
    </div>
  );
};

export default UserItemDetail;
