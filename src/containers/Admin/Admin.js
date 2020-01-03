import React, { Component } from "react";
import Nav from "./Nav/Nav";
import AdminContent from "./AdminContent/AdminContent";

class Admin extends Component {
  render() {
    return (
      <div className="admin">
        <Nav />
        <AdminContent />
      </div>
    );
  }
}

export default Admin;
