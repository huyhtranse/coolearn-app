import React from "react";
import MyCourseNav from "./MyCourseNav/MyCourseNav";
import MyCourseContent from "./MyCourseContent/MyCourseContent";

const MyCourse = () => {
  return (
    <div className="mycourse">
      <div className="mycourse__content">
        <h1>Khóa Học Của Tôi</h1>

        <MyCourseNav />
        <MyCourseContent />
      </div>
    </div>
  );
};

export default MyCourse;
