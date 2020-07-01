import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { myFirestore } from "../../../Config/MyFirebase";
import WelcomeBoard from "../WelcomeBoard/WelcomeBoard";
import "./DiscussionsMain.css";
import DiscussionsBoard from "../DiscussionsBoard/DiscussionsBoard";
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
  IconButton,
  Button,
  Avatar
} from "@material-ui/core";

import { AvatarGroup } from '@material-ui/lab';

import {
  KebabHorizontalIcon,
  PersonIcon,
  SearchIcon
} from "@primer/octicons-react";

const styles = theme => ({
  avatarNoParticipants: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    background: theme.palette.secondary.main,
    color: theme.palette.primary.main
  }
});

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
    const { classes } = this.props;
    console.log(classes)

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
                this.setState({
                  currentPeerUser: item.data()
                });
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
    }

    else {
      return (
        <ListItem>
          <Box paddingTop={15} paddingBottom={19}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <div className="discussions-empty-avatar-group">
                <AvatarGroup>
                  <Avatar
                    src={require("../../../assets/user.png")}
                    className={classes.avatarNoParticipants}
                  />

                  <Avatar className={classes.avatarNoParticipants}>
                    <PersonIcon size={40} />
                  </Avatar>
                </AvatarGroup>
              </div>
              <Grid item>
                <Box mt={5}>
                  <div className="large-text">
                    It's quiet lonely...
                  </div>
                </Box>
              </Grid>
              <Grid item>
                <Box paddingTop={2}>
                  <div className="small-text" style={{textAlign: 'center'}}>
                    Add some people to the transaction to start discussion
                  </div>
                </Box>
              </Grid>
              <Grid item>
                <Box paddingTop={5}>
                  <Button
                    className="anchor-btn"
                    href="/people"
                    variant="contained"
                    color="primary"
                  >
                    Add People
                  </Button>
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
      <Box component="div">
        <Container>
          <NavRail />
          <Box component="div" mt={2} mb={2} className="discussions-root">
            <Grid container>
              <Grid item xs={4}>
                <Box className="list-div">
                  <List className="list-header">
                    <ListItem>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid item>
                          <Box ml={2} component='a' href='#'>
                            <img
                              src={require("../../../assets/reallos-logo.svg")}
                              className="discussions-reallos-logo"
                            />
                          </Box>
                        </Grid>
                        <Grid item>
                          <IconButton size="medium">
                            <Avatar src={require("../../../assets/user.png")} />
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
                <Box component="div" className="discussions-div">
                  {this.state.currentPeerUser ? (
                    <DiscussionsBoard currentPeerUser={this.state.currentPeerUser} />
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

export default withRouter(withStyles(styles)(Chat));
