import React, { Component } from "react";
import {
  Grid,
  Box,
  ListItem,
  Typography,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from "@material-ui/core";
import { XIcon } from "@primer/octicons-react";

class TaskItem extends Component {
  render() {
    return (
      <Grid item style={{ width: "100%" }}>
        <ListItem
          button
          style={{
            backgroundColor:
              this.props.taskData.id % 2 === 0 ? "white" : "#eaf5ff",
          }}
        >
          <ListItemText
            primary={
              <Typography noWrap style={{ color: "#150578", fontWeight: 700 }}>
                {this.props.taskData.transaction}
              </Typography>
            }
            secondary={
              <Box>
                <Typography
                  noWrap
                  style={{ color: "#150578", fontSize: "13px" }}
                >
                  {this.props.taskData.TaskName}
                </Typography>
                <Typography
                  noWrap
                  style={{ color: "#150578", fontSize: "13px" }}
                >
                  {this.props.taskData.Date}
                </Typography>
              </Box>
            }
          />
          <ListItemSecondaryAction>
            <IconButton>
              <XIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Grid item>
          <Divider variant="middle" />
        </Grid>
      </Grid>
    );
  }
}

export default TaskItem;
