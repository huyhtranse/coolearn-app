import React from "react";

const LeadCourse = props => {
  return (
    <div className="descourse__leadcourse">
      <div className="descourse__leadcourse-text">
        <h1>{props.tenKhoaHoc}</h1>
        <h3>{props.moTa}</h3>
        <h4 className="descourse__leadcourse-member">
          Số học viên: {props.soLuongHocVien}
        </h4>
        <h4 className="descourse__leadcourse__intructor">
          Giảng viên: {props.hoTenGiangVien}
        </h4>
      </div>
    </div>
  );
};

export default LeadCourse;
