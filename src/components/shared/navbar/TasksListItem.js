import React,{Component} from 'react';
import {Grid, Box, ListItem, Typography, ListItemText, ListItemSecondaryAction, IconButton, Divider} from '@material-ui/core';
import {XIcon} from '@primer/octicons-react'

class TaskItem extends Component {

    render(){
        return (
            <Grid item style={{width: '100%'}}>
                <ListItem button style={{backgroundColor: (this.props.taskData.id % 2 == 0)? 'white' : '#eaf5ff'}}>
                    <ListItemText
                        primary={this.props.taskData.transaction}
                        secondary={
                            <Box>
                                <Typography noWrap>
                                    {this.props.taskData.TaskName}
                                </Typography>
                            <   Typography noWrap>
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
                    <Divider variant='middle' />
                </Grid>
            </Grid>
        )
    }
}

export default TaskItem;