import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { ChecklistIcon, BellIcon, InboxIcon } from '@primer/octicons-react';
import UserAvatar from '../../../assets/user.png';
import './navbar.css';

function RenderNav() {
    return (
        <div className="main">
            <Grid container direction="row" justify="center" alignitems="center">
                <AppBar className="nav" position="static">
                    <Toolbar>
                        <Typography className="logo" variant="h6">
                            Reallos
                        </Typography>
                        <div className="navbar-btn-group">
                            <IconButton><BellIcon size={20}/></IconButton>
                            <IconButton><InboxIcon size={20}/></IconButton>
                            <IconButton><ChecklistIcon size={20}/></IconButton>
                            <IconButton><Avatar src={UserAvatar} /></IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </Grid>
        </div>
    );
}

export default RenderNav;
