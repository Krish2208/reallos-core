import React from 'react';
import NavBar from '../shared/navbar/navbar';
import NavRail from '../shared/navigation_rail/TransactionNavRail';
import DocUploadModal from './uploader/DocUploadModal';
import UserAvatar from '../../assets/user.png';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import {
    Container,
    Grid,
    Box,
    Typography,
    Fab,
    Avatar,
    Card,
    CardMedia,
    CardContent,
    IconButton,
    Snackbar
} from '@material-ui/core';

import {
    ArchiveIcon,
    ArrowUpIcon,
    KebabHorizontalIcon
} from '@primer/octicons-react';

import './PaperWork.css';

const styles = theme => ({
    docCardUserAvatar: {
        width: 30,
        height: 30
    }
});

class PaperWork extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUploadModalVisible: false,
            isSnackbarVisible: false,
            snackbarMessage: null,
            documents: [
                {
                    // Name of Document
                    name: 'Document 1',

                    // ID of the User (used to fetch user profile pic and name)
                    // @TODO: To be replaced with User ID
                    creator: 'John Doe',

                    // Assigned when uploading
                    doc_id: 'QWERTY-1234',

                    // Path to the document
                    path: '/TRANSACTION_ID/paperworks/Reallos - TODO FUNCTIONALITY.pdf',

                    // User ID of members having access to the document
                    // @TODO: User names to be replaced by User ID
                    members: [
                        'Joseph John'
                    ]
                },
                {
                    name: 'Document 2',
                    creator: 'John Doe',
                    doc_id: 'ASDFG-9780',
                    path: '/TRANSACTION_ID/paperworks/Reallos - TODO FUNCTIONALITY.pdf',
                    members: ['Joseph John']
                },
                {
                    name: 'Document 3',
                    creator: 'John Doe',
                    doc_id: 'GSLDS-53694',
                    path: '/TRANSACTION_ID/paperworks/Reallos - TODO FUNCTIONALITY.pdf',
                    members: ['Joseph John']
                },
                {
                    name: 'Document 4',
                    creator: 'John Doe',
                    doc_id: 'QIOPW-0034',
                    path: '/TRANSACTION_ID/paperworks/Reallos - TODO FUNCTIONALITY.pdf',
                    members: ['Joseph John']
                },
                {
                    name: 'Document 5',
                    creator: 'John Doe',
                    doc_id: 'SRXPO-7583',
                    path: '/TRANSACTION_ID/paperworks/Reallos - TODO FUNCTIONALITY.pdf',
                    members: ['Joseph John']
                },
            ]
        }

        this.RenderPaperworkCards = this.RenderPaperworkCards.bind(this);
        this.showUploadModalVisibility = this.showUploadModalVisibility.bind(this);
        this.dismissUploadModal = this.dismissUploadModal.bind(this);
        this.showSnackbar = this.showSnackbar.bind(this);
        this.dismissSnackbar = this.dismissSnackbar.bind(this);
    }

    /**
     * Show paperwork upload modal.
     */
    showUploadModalVisibility() {
        this.setState({
            isUploadModalVisible: true
        });
    }

    /**
     * Dismiss paperwork upload modal.
     */
    dismissUploadModal() {
        this.setState({
            isUploadModalVisible: false
        });
    }

    /**
     * Display a snackbar.
     * 
     * @param {string} message
     * Message to be displayed inside the snackbar.
     */
    showSnackbar(message) {
        this.setState({
            isSnackbarVisible: true,
            snackbarMessage: message
        });
    }

    /**
     * Dismiss a snackbar.
     */
    dismissSnackbar() {
        this.setState({
            isSnackbarVisible: false,
            snackbarMessage: null
        });
    }

    /**
     * Returns URL of thumbnail for a PDF.
     */
    getThumbnail() {
        return 'https://images.sampletemplates.com/wp-content/uploads/2016/04/15115200/Sample-Press-Release-Template-PDF.jpg';
    }

    /**
     * Renders paperwork cards on the paperwork dashboard
     */
    RenderPaperworkCards() {
        const { classes } = this.props;
        
        if (this.state.documents.length === 0) {
            // If paperwork documents are present.
            
            return (
                <Grid container direction="column" alignItems="center" justify="center" spacing={2}>
                    <Grid item>
                        <img src={require('../../assets/no-paperwork-image.png')} className="no-paperwork-image"/>
                    </Grid>
                    <Grid item>
                        <Box marginTop={-3} marginLeft={4}>
                            <Typography className="paperwork-heading reallos-text">Paperworks</Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box marginTop={-1} marginLeft={4}>
                            <Typography className="paperwork-subheading reallos-text">
                                Store and E-sign all your documents hassle free here!
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            );
        }

        else {
            // If no paperwork documents are present.
            
            return (
                <div className="doc-card-group">
                    {this.state.documents.map(docData => (
                        <div className="doc-card-root" key={docData.doc_id}>
                            <IconButton className="doc-card-top-action-btn">
                                <KebabHorizontalIcon />
                            </IconButton>

                            <NavLink to={{
                                pathname: `/paperwork/${docData.doc_id}`,
                                state: docData
                            }}>
                                <Card className="doc-card">
                                    <CardMedia
                                        image={this.getThumbnail()}
                                        style={{height: 200}}
                                    />

                                    <CardContent>
                                        <h2>
                                            {docData.name}
                                        </h2>

                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Avatar
                                                className={classes.docCardUserAvatar}
                                                src={UserAvatar}
                                            />

                                            <span style={{marginLeft: 10}}>
                                                Uploaded by <strong>{docData.creator}</strong>
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </NavLink>
                        </div>
                    ))}
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <NavBar />
                    <NavRail />
                    <Box component="div" paddingTop={5} paddingBottom={5}>
                        <Grid container direction="row" alignItems="center" spacing={2}>
                            <Grid item>
                                <ArchiveIcon size={35} />
                            </Grid>
                            <Grid item>
                                <h2>Transaction 1</h2>
                            </Grid>
                        </Grid>
                    </Box>
                    <this.RenderPaperworkCards />
                    <Grid container direction="row" justify="flex-end" alignItems="flex-end">
                        <Fab
                            variant="extended"
                            className="reallos-fab"
                            size="large"
                            onClick={this.showUploadModalVisibility}
                        >
                            <ArrowUpIcon className="fab-icon" size={20} /> &nbsp;
                            Upload Document
                        </Fab>
                    </Grid>
                </Container>
                <DocUploadModal
                    dismissCallback={this.dismissUploadModal}
                    visible={this.state.isUploadModalVisible}
                    showSnackbarCallback={this.showSnackbar}
                />
                <Snackbar
                    open={this.state.isSnackbarVisible}
                    onClose={this.dismissSnackbar}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    message={this.state.snackbarMessage}
                />
            </div>
        );
    }
}

export default withStyles(styles)(PaperWork);
