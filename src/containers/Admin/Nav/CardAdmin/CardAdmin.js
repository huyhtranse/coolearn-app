import React, { Component } from "react";
import { Card, CardText } from "reactstrap";
import { Link } from "react-router-dom";

class CardAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taiKhoan: "",
      hoTen: ""
    };
  }

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      this.setState({
        taiKhoan: currentUser.taiKhoan,
        hoTen: currentUser.hoTen
      });
    }
  }
  render() {
    const { taiKhoan, hoTen } = this.state;
    return (
      <Card body inverse className="admin__card">
        <CardText className="admin__card-text">
          Xin chào, <span>ADMIN</span>
          <br /> <p className="admin__card-text-username">{hoTen}</p>
        </CardText>
        <Link
          to={`/profile/${taiKhoan}`}
          color="secondary"
          className="admin__card-text-profileuser"
        >
          Thông tin cá nhân
        </Link>
      </Card>
    );
  }
}

export default CardAdmin;
