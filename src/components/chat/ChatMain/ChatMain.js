import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { myFirestore } from "../../../Config/MyFirebase";
import WelcomeBoard from "../WelcomeBoard/WelcomeBoard";
import "./ChatMain.css";
import ChatBoard from "../ChatBoard/ChatBoard";
import NavBar from "../../shared/navbar/navbar";
import NavRail from "../../shared/navigation_rail/TransactionNavRail";
import { AppString } from "../Const";
import {
  Container,
  Box,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  IconButton,
  Typography,
} from "@material-ui/core";
import { KebabHorizontalIcon, SearchIcon } from "@primer/octicons-react";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
                <img src={item.data().photoUrl} alt="icon avatar"></img>
              </ListItemAvatar>
              <ListItemText primary={`${item.data().name}`} />
            </ListItem>
          );
        }
      });
      return viewListUser;
    } else {
      return (
        <ListItem>
          <Box paddingTop={19} paddingBottom={19}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <img
                  src={this.currentUserAvatar}
                  alt="icon avatar"
                  className="emptyList-img"
                />
                <img
                  src={this.currentUserAvatar}
                  alt="icon avatar"
                  className="emptyList-img-bg"
                />
              </Grid>
              <Grid item>
                <Box paddingTop={2}>
                  <Typography className="large-text">
                    It's quiet lonely
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box paddingTop={1}>
                  <Typography className="small-text">
                    Add some people to the
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box paddingTop={-3}>
                  <Typography className="small-text">
                    transaction to start discussion
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </ListItem>
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
                <Box className="listDiv">
                  <List className="listHeader">
                    <ListItem>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid item>
                          <Button>
                            <img
                              src={require("../../../assets/reallos-logo.svg")}
                              className="Innerlogo"
                            />
                          </Button>
                        </Grid>
                        <Grid item>
                          <IconButton size="medium">
                            <img
                              src={this.currentUserAvatar}
                              alt="icon avatar"
                              className="profilePhoto"
                            ></img>
                          </IconButton>
                          <IconButton>
                            <KebabHorizontalIcon size={24} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </List>
                  <List>{this.renderListUser()}</List>
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
