import React, { Component } from "react";
import ReactLoading from "react-loading";
import { withRouter } from "react-router-dom";
import { myFirestore } from "../../../Config/MyFirebase";
import WelcomeBoard from "../WelcomeBoard/WelcomeBoard";
import "./ChatMain.css";
import ChatBoard from "../ChatBoard/ChatBoard";
import NavBar from "../../shared/navbar/navbar";
import NavRail from "../../shared/navigation_rail/TransactionNavRail";
import { AppString } from "../Const";
import { Container, Box } from "@material-ui/core";
import {
  List,
  Grid,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";

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
      let viewListUser = [
        <ListItem>
          <Typography className="logo" variant="h6">
            Reallos
          </Typography>
        </ListItem>,
      ];
      this.listUser.forEach((item, index) => {
        if (item.data().id !== this.currentUserId) {
          viewListUser.push(
            <List>
              <ListItem
                button
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
                <ListItemAvatar>
                  <img
                    className="viewAvatarItem"
                    src={item.data().photoUrl}
                    alt="icon avatar"
                  ></img>
                </ListItemAvatar>
                <ListItemText
                  className="viewWrapContentItem"
                  primary={`${item.data().name}`}
                />
              </ListItem>
              <Divider />
            </List>
          );
        }
      });
      return viewListUser;
    } else {
      return (
        <List>
          <ListItem>
            <ListItemText primary="Empty List" />
          </ListItem>
        </List>
      );
    }
  };

  render() {
    return (
      <Box component="div" className="innerDiv">
        <Container>
          <NavBar />
          <NavRail />
          <Box component="div" paddingTop={5} paddingBottom={3}>
            <Grid container>
              <Grid item xs={4}>
                <Box component="div" className="listDiv">
                  <List></List>
                  {this.renderListUser()}
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Box component="div" className="chatDiv">
                  {this.state.currentPeerUser ? (
                    <ChatBoard currentPeerUser={this.state.currentPeerUser} />
                  ) : (
                    <WelcomeBoard
                      currentUserNickname={this.currentUserNickname}
                      currentUserAvatar={this.currentUserAvatar}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withRouter(Chat);
