import React, { Component } from "react";
import FilterNav from "./FilterNav/FilterNav";
import CoursesContent from "./CoursesContent/CoursesContent";

class Search extends Component {
  render() {
    return (
      <div className="allcourses">
        <div className="allcourses__content">
          <h1>Khóa Học</h1>
          <FilterNav />
          <CoursesContent />
        </div>
      </div>
    );
  }
}

export default Search;
