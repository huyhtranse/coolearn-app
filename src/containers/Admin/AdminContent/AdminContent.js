import React from "react";
import Home from "./Home/Home";
import User from "./User/User";
import Courses from "./Courses/Courses";
import { Route } from "react-router-dom";
import UserDetail from "./User/UserDetail/UserDetail";
import CoursesDetail from "./Courses/CoursesDetail/CoursesDetail";

const AdminContent = () => {
  return (
    <div className="admin__right">
      <Route exact path="/admin" component={Home} />
      <Route exact path="/admin/user" component={User} />
      <Route exact path="/admin/user/:taiKhoan" component={UserDetail} />
      <Route exact path="/admin/course/:maKhoaHoc" component={CoursesDetail} />
      <Route exact path="/admin/courses" component={Courses} />
    </div>
  );
};

export default AdminContent;
