import React from "react";
import { connect } from "react-redux";

import { getCourses, courses } from "./Actions/courses";
import { setCurrentUser } from "./Actions/users";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./containers/Home/Home";
import DescriptionCourse from "./containers/DescriptionCourse/DescriptionCourse";
import SignUp from "./containers/Sign/SignUp/SignUp";
import SignIn from "./containers/Sign/SignIn/SignIn";
import ProfileUser from "./containers/ProfileUser/ProfileUser";
import CoursesPage from "./containers/CoursesPage/CoursesPage";
import CartPage from "./containers/CartPage/CartPage";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { filterCourses } from "./Actions/courses";
import { getUserDetail } from "./Actions/users";
import MyCourse from "./containers/MyCourse/MyCourse";
import Admin from "./containers/Admin/Admin";
import ScrollToTop from "./ScrollToTop/ScrollToTop";
import NotFound from "./containers/NotFound/NotFound";
import ProtectedRoute from "./Auth/protected.route";
import ButtonToTop from "./components/ButtonToTop/ButtonToTop";
// import MycoursesDetail from "./containers/MyCoursesDetail/MycoursesDetail";
// import ProtectedUserRoute from "./Auth/protected.user.router";

class App extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      const { taiKhoan } = currentUser;

      this.props.setCurrentUser(currentUser);
      getUserDetail(taiKhoan);
    }
    getCourses(courses => {
      this.props.courses(courses);
    });

    const ele = document.getElementById("loader");
    if (ele) {
      // remove from DOM
      ele.outerHTML = "";
    }
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Header />
          <ScrollToTop>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/course-detail/:id" component={DescriptionCourse} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route path="/courses/:maDanhMuc" component={CoursesPage} />
              <Route path="/cart" component={CartPage} />
              {/* //user level */}
              <ProtectedRoute
                path="/profile/:taikhoan"
                component={ProfileUser}
              />
              <ProtectedRoute path="/my-course" component={MyCourse} />
              <ProtectedRoute
                path="/sub-course/:maKhoaHoc"
                component={DescriptionCourse}
              />

              <ProtectedRoute path="/admin" component={Admin} />
              <Route component={NotFound} />
            </Switch>
          </ScrollToTop>
          <ButtonToTop />
          <Footer />
        </Router>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: data => {
      dispatch(setCurrentUser(data));
    },
    courses: data => {
      dispatch(courses(data));
    },
    filterCourses: data => {
      dispatch(filterCourses(data));
    }
  };
};

const mapStateToProps = state => {
  return {
    typeUser: state.typeUser
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
