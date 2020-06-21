import React from 'react';
import { withStyles } from '@material-ui/styles';
import UserAvatar from '../../../assets/user.png';  // This is for dummy purpose
import './NotificationListItem.css'

import {
    XIcon,
    AlertIcon,
    CheckIcon,
    ClockIcon,
    UploadIcon,
    BellIcon
} from '@primer/octicons-react';

import {
    Grid,
    Avatar,
    Divider,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction
} from '@material-ui/core';

const styles = theme => ({
    notificationPrimaryRead: {
        color: '#000000'
    },
    notificationSecondaryRead: {
        color: '#0000008a'
    },
    notificationPrimaryUnread: {
        color: '#0366d6',
        fontWeight: 'bold'
    },
    notificationSecondaryUnread: {
        color: '#0366d6'
    },
});

class NotificationItem extends React.Component {
    /**
     * Returns Icon Component for a given notification data.
     *
     * @returns {React.Component}
     * Icon Component
     */
    getIcon() {
        switch (this.props.notificationData.type) {
            case 'TASK_DUE_SOON':
                return (
                    <Avatar style={this.getNotificationColors()}>
                        <AlertIcon />
                    </Avatar>
                );

            case 'TASK_OVERDUE':
                return (
                    <Avatar style={this.getNotificationColors()}>
                        <ClockIcon />
                    </Avatar>
                );

            case 'TASK_COMPLETED':
                return (
                    <Avatar style={this.getNotificationColors()}>
                        <CheckIcon />
                    </Avatar>
                );

            case 'DOC_UPLOADED':
                return (
                    <Avatar style={this.getNotificationColors()}>
                        <UploadIcon />
                    </Avatar>
                );

            case 'CHAT_MESSAGE':
                // The avatar image will be fetched using User ID in the data.
                // `UserAvatar` is dummy for now

                return (
                    <Avatar src={UserAvatar} />
                );

            default:
                return (
                    <Avatar style={this.getNotificationColors()}>
                        <BellIcon />
                    </Avatar>
                );
        }
    }

    /**
     * Returns a map of `color` and `backgroundColor` to be applied
     * to the `ListItemAvatar`.
     *
     * @returns {Map<string, string>}
     * Map of `color` and `backgroundColor`
     */
    getNotificationColors() {
        switch (this.props.notificationData.type) {
            case 'TASK_DUE_SOON':
                return {color: "#F6AC00", background: "#F6AC004C"};

            case 'TASK_OVERDUE':
                return {color: "#EB0000", background: "#EB00004C"};

            case 'TASK_COMPLETED':
                return {color: "#01AE4B", background: "#01AE4B4C"};

            case 'DOC_UPLOADED':
                return {color: "#150578", background: "#1505784C"};

            default:
                return {color: "#0000005c"};
        }
    }

    /**
     * Primary text to be displayed in the list item.
     *
     * @returns {string}
     * Primary Text
     */
    getPrimaryText() {
        switch (this.props.notificationData.type) {
            case 'TASK_DUE_SOON':
                return `${this.props.notificationData.task} due soon`;

            case 'TASK_OVERDUE':
                return `${this.props.notificationData.task} is overdue`;

            case 'TASK_COMPLETED':
                return `${this.props.notificationData.task} completed`;

            case 'DOC_UPLOADED':
                return `Update in ${this.props.notificationData.transaction}`;

            case 'CHAT_MESSAGE':
                return `Message from ${this.props.notificationData.from}`;
        }
    }

    /**
     * Secondary text to be displayed in the list item.
     *
     * @returns {string}
     * Secondary Text
     */
    getSecondaryText() {
        switch (this.props.notificationData.type) {
            case 'TASK_DUE_SOON':
                return `Due in ${this.props.notificationData.days_passed} days`;

            case 'TASK_OVERDUE':
                let due_date = new Date(this.props.notificationData.due_date);
                let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

                return `Was due on ${due_date.getDay()} ${months[due_date.getMonth()]} ${due_date.getFullYear()}`;

            case 'TASK_COMPLETED':
                return `Completed by ${this.props.notificationData.completed_by}`;

            case 'DOC_UPLOADED':
                return `Uploaded "${this.props.notificationData.doc_name}"`;

            case 'CHAT_MESSAGE':
                return `${this.props.notificationData.message}`;
        }
    }

    render() {
        let { classes, notificationData } = this.props;

        return (
            <Grid item style={{width: '100%'}}>
                <ListItem button style={{
                    backgroundColor: (!notificationData.isRead) ? '#eaf5ff' : '#ffffff'
                }}>
                    <ListItemAvatar>
                        {this.getIcon()}
                    </ListItemAvatar>
                    <ListItemText
                        primary={this.getPrimaryText()}
                        secondary={this.getSecondaryText()}
                        classes={{
                            primary: (notificationData.isRead)
                                        ? classes.notificationPrimaryRead
                                        : classes.notificationPrimaryUnread,

                            secondary: (notificationData.isRead)
                                        ? classes.notificationSecondaryRead
                                        : classes.notificationSecondaryUnread
                        }}
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

export default withStyles(styles)(NotificationItem);
