import { combineReducers } from "redux";
import { coursesReducer } from "./coursesReducer";
import { courseDetailReducer } from "./courseDetailReducer";
import { currentUser } from "./currentUser";
import { listCourses } from "./listCourses";
import { isEnroll } from "./isEnroll";
import { filterCourses } from "./filterCourses";
import { courseCategories } from "./courseCategories";
import { cartList } from "./cartList";
import { listMyCourse } from "./listMyCourse";

// admin
import { allUser } from "./allUser";
import { listSub } from "./listSub";
import { listUnsub } from "./listUnsub";

import { allCourses } from "./allCourses";
import { courseDetailAdmin } from "./courseDetailAdmin";

const rootReducer = combineReducers({
  courses: coursesReducer,
  courseDetail: courseDetailReducer,
  currentUser: currentUser,
  listCourses: listCourses,
  isEnroll: isEnroll,
  filterCourses: filterCourses,
  courseCategories: courseCategories,
  cartList: cartList,
  listMyCourse: listMyCourse,
  allUser: allUser,
  listSub: listSub,
  listUnsub: listUnsub,
  allCourses: allCourses,
  courseDetailAdmin: courseDetailAdmin
});

export default rootReducer;
