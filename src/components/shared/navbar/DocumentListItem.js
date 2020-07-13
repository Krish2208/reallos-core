import React, { Component } from "react";
import {
  Grid,
  ListItem,
  Typography,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from "@material-ui/core";
import { XIcon } from "@primer/octicons-react";

class DocumentsItem extends Component {
  render() {
    return (
      <Grid item style={{ width: "100%" }}>
        <ListItem
          button
          style={{
            backgroundColor:
              this.props.documentData.id % 2 === 0 ? "white" : "#eaf5ff",
          }}
        >
          <ListItemText
            primary={
              <Typography noWrap style={{ color: "#150578", fontWeight: 700 }}>
                {this.props.documentData.transaction}
              </Typography>
            }
            secondary={
              <Typography noWrap style={{ color: "#150578", fontSize: "13px" }}>
                {this.props.documentData.DocName}
              </Typography>
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

export default DocumentsItem;
