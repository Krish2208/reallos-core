import React, { Component } from "react";
import ReactLoading from "react-loading";
import { withRouter } from "react-router-dom";
import { myFirestore } from "../../../Config/MyFirebase";
import WelcomeBoard from "../WelcomeBoard/WelcomeBoard";
import "./ChatMain.css";
import ChatBoard from "../ChatBoard/ChatBoard";
import { AppString } from "../Const";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isOpenDialogConfirmLogout: false,
      currentPeerUser: null,
    };
    this.currentUserId = localStorage.getItem(AppString.ID);
    this.currentUserAvatar = localStorage.getItem(AppString.PHOTO_URL);
    this.currentUserNickname = localStorage.getItem(AppString.NICKNAME);
    this.listUser = [];
  }

  componentDidMount() {
    this.getListUser();
  }

  getListUser = async () => {
    const result = await myFirestore.collection(AppString.NODE_USERS).get();
    if (result.docs.length > 0) {
      this.listUser = [...result.docs];
      this.setState({ isLoading: false });
    }
  };

  renderListUser = () => {
    if (this.listUser.length > 0) {
      let viewListUser = [];
      this.listUser.forEach((item, index) => {
        if (item.data().id !== this.currentUserId) {
          viewListUser.push(
            <button
              key={index}
              className={
                this.state.currentPeerUser &&
                this.state.currentPeerUser.id === item.data().id
                  ? "viewWrapItemFocused"
                  : "viewWrapItem"
              }
              onClick={() => {
                this.setState({ currentPeerUser: item.data() });
              }}
            >
              <img
                className="viewAvatarItem"
                src={item.data().photoUrl}
                alt="icon avatar"
              />
              <div className="viewWrapContentItem">
                <span className="textItem">{`${item.data().nickname}`}</span>
              </div>
            </button>
          );
        }
      });
      return viewListUser;
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className="root">
        {/* Body */}
        <div className="body">
          <div className="viewListUser"> {this.renderListUser()}</div>
          <div className="viewBoard">
            {this.state.currentPeerUser ? (
              <ChatBoard currentPeerUser={this.state.currentPeerUser} />
            ) : (
              <WelcomeBoard
                currentUserNickname={this.currentUserNickname}
                currentUserAvatar={this.currentUserAvatar}
              />
            )}
          </div>
        </div>
        {/* Loading */}
        {this.state.isLoading ? (
          <div className="viewLoading">
            <ReactLoading
              type={"spin"}
              color={"#203152"}
              height={"3%"}
              width={"3%"}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(Chat);
