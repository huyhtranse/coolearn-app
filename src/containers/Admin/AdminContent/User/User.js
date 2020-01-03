import React, { Component } from "react";
import { connect } from "react-redux";
import { InputGroup, Input } from "reactstrap";
import UserTableContent from "./UserTableContent/UserTableContent";
import { getAllUser, allUser } from "../../../../Actions/Admin/users";
import ModalUser from "./ModalUser/ModalUser";
import { ReactComponent as Search } from "../../../../assets/SVG/search.svg";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchUser: "",
      listUser: []
    };
  }

  componentDidMount() {
    const { allUser } = this.props;

    getAllUser(listUser => {
      this.setState({ listUser: listUser });
      allUser(listUser);
    });
  }

  onChange = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        const { searchUser, listUser } = this.state;
        let list = [...listUser];
        if (searchUser.length > 0) {
          let key = searchUser.toLowerCase().trim();
          list = list.filter(item => {
            let taiKhoan = item.taiKhoan;
            return taiKhoan.includes(key);
          });
        }
        this.props.allUser(list);
      }
    );
  };

  render() {
    return (
      <div className="admin__user">
        <div className="admin__user-bg">
          <h1>Quản lý người dùng</h1>
        </div>

        <div className="admin__user-content">
          <div className="admin__user-container">
            <div className="admin__user-container-filter">
              <ModalUser
                buttonLabel="Thêm người dùng"
                titleModal="Thêm người dùng"
                buttonModal="Thêm"
                isButtonAdd={true}
              />
              <InputGroup>
                <Input
                  placeholder="Tim tài khoản.."
                  name="searchUser"
                  onChange={this.onChange}
                  className="admin__user-input-search"
                />
                <div className="admin__user-logo">
                  <Search />
                </div>
              </InputGroup>
            </div>

            <UserTableContent />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    allUser: data => {
      dispatch(allUser(data));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(User);
