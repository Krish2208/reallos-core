import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from '../shared/navbar/navbar';
import NavRail from '../shared/navigation_rail/TransactionNavRail';
import { ArchiveIcon } from '@primer/octicons-react';
import StampIcon from '../../assets/stamp_icon.svg';
import Modal from '../shared/modal/Modal';
import DocUploadStatus from './uploader/DocUploadStatus';
import { myStorage } from '../../Config/MyFirebase.js';
import ReallosLoader from '../shared/preloader/ReallosLoader';

import {
    PdfViewerComponent,
    Toolbar,
    Magnification,
    Navigation,
    LinkAnnotation,
    BookmarkView,
    ThumbnailView,
    Print,
    TextSelection,
    Annotation,
    TextSearch,
    FormFields,
    Inject
} from '@syncfusion/ej2-react-pdfviewer';

import {
    Container,
    Grid,
    Box,
    Fab,
    Button,
    Divider,
    Snackbar
} from '@material-ui/core';

import './PaperworkViewer.css';

class PaperworkViewer extends React.Component {
    constructor() {
        super();

        this.state = {
            hasChanges: false,
            isLoadingDocument: true,
            isUploadModalVisible: false,
            isSnackbarVisible: false,
            snackbarMessage: null,
            uploadTaskStatus: {
                progress: 0,
                isPaused: false,
                uploadTask: null
            }
        };
    }

    /**
     * Show signature panel provided by **Syncfusion**
     *
     * @returns {void}
     * Void
     */
    showSignaturePanel() {
        this.viewer.toolbar.annotationToolbarModule.showSignaturepanel();
    }

    /**
     * Set document within the viewer using relative document path.
     *
     * @param {string} docPath
     * Relative path to the document in Firebase Storage.
     *
     * @returns {Promise<void>}
     * Void
     */
    async setDocument(docPath) {
        let downloadLink = await myStorage.ref(docPath).getDownloadURL();
        let response = await fetch(downloadLink, {method: 'GET'});
        let docBlob = await response.blob();

        let fileReader = new FileReader();
        fileReader.readAsDataURL(docBlob);

        fileReader.onloadend = () => {
            this.viewer.documentPath = fileReader.result;
        }
    }

    /**
     * Saves the changes made in the PDF viewer to
     * the cloud **(Firebase)**.
     * 
     * @param {string} docPath
     * Relative path to the document in Firebase Storage.
     * 
     * @returns {Promise<void>}
     * Void
     */
    async saveChangesToCloud(docPath) {
        let docBlob = await this.viewer.saveAsBlob();
        let fileRef = myStorage.ref().child(docPath);
        let uploadTask = fileRef.put(docBlob);

        uploadTask.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            let isPaused = snapshot.state == 'paused';

            let newUploadTaskDetails = {
                progress,
                isPaused,
                uploadTask
            };
            
            this.setState({
                isUploadModalVisible: true,
                uploadTaskStatus: newUploadTaskDetails
            })
        })
    }

    /**
     * Resets upload status.
     */
    dismissUploadModalCallback() {
        this.setState({
            isUploadModalVisible: false,
            uploadTaskStatus: {
                progress: 0,
                isPaused: false,
                uploadTask: null
            }
        })
    }

    setDocumentLoaded() {
        console.log("DOCUMENT LOADED!!")

        this.setState({
            isLoadingDocument: false
        })
    }

    setDocumentChanges() {
        if (this.viewer && this.state.hasChanges !== this.viewer.isDocumentEdited) {
            this.setState({
                hasChanges: this.viewer.isDocumentEdited
            })
        }
    }

    /**
     * Getter which returns the state information (document metadata)
     * from props.
     *
     * @returns {object | null}
     * Document Metadata passed by `Paperwork` component
     */
    get getState() {
        console.log(this.props.location)
        return this.props.location ? this.props.location.state : null;
    }

    render() {
        if (this.getState) {
            // Proceed if document metadata is available in props
            const docData = this.getState;

            return (
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

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <NavLink className="link" to="/paperwork">Paperwork</NavLink>
                                <span style={{margin: '0 10px'}}>/</span>
                                {docData.name}
                            </div>

                            <Button
                                variant="contained"
                                color="primary"
                                disabled={!this.state.hasChanges}
                                onClick={() => this.saveChangesToCloud(docData.path)}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </Box>
                    <PdfViewerComponent
                        id="container"
                        className="pdf-viewer-root"
                        ref={(scope) => {
                            this.viewer = scope;
                            if (this.viewer) this.setDocument(docData.path);
                        }}
                        documentPath={null}
                        documentLoad={() => this.setDocumentLoaded()}
                        pageMouseover={() => this.setDocumentChanges()}
                        serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/pdfviewer"
                        style={{ 'height': '640px' }}
                    >
                        <Inject services={[ FormFields, Toolbar, Magnification, Navigation, Annotation, TextSearch, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection ]} />
                    </PdfViewerComponent>
                    <Modal
                        title="Saving Changes"
                        visible={this.state.isUploadModalVisible}
                        dismissCallback={() => this.dismissUploadModalCallback()}
                        modalWidth={700}
                    >
                        <DocUploadStatus
                            showSnackbarCallback={(message) => {
                                this.setState({
                                    isSnackbarVisible: true,
                                    snackbarMessage: message
                                });
                            }}
                            dismissCallback={() => this.dismissUploadModalCallback()}
                            uploadStatus={this.state.uploadTaskStatus}
                            isSavingDocument={true}
                        />
                    </Modal>
                    <Snackbar
                        open={this.state.isSnackbarVisible}
                        onClose={() => this.setState({isSnackbarVisible: false})}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                        message={this.state.snackbarMessage}
                    />
                    <ReallosLoader visible={this.state.isLoadingDocument} />
                    <Fab
                        variant="extended"
                        className="reallos-fab"
                        size="large"
                        onClick={() => this.showSignaturePanel()}
                    >
                        <img src={StampIcon} alt="" height={20} style={{marginRight: 12}} />
                        E-Sign Document
                    </Fab>
                </Container>
            )
        }

        else {
            // Show error when no document metadata is available in props

            return (
                <Container>
                    <NavBar />
                    <NavRail />
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignContent="center"
                        style={{height: '85vh', textAlign: 'center'}}
                    >
                        <div style={{fontSize: 150, opacity: 0.5}}>
                            {"( >_< )"}
                        </div>

                        <div style={{marginTop: 50, marginBottom: 20}}>
                            <h1>
                                Oops!
                            </h1>

                            <p style={{fontSize: 20}}>
                                Can't fetch the paperwork.
                                <br />
                                <div style={{
                                    fontStyle: "italic",
                                    opacity: 0.5
                                }}>
                                    Did you enter the URL manually?
                                </div>
                            </p>
                        </div>

                        <Divider />

                        <p>
                            Go back to&nbsp;

                            <NavLink to="/paperwork" className="link">
                                Paperwork
                            </NavLink>
                        </p>
                    </Grid>
                </Container>
            )
        }
    }
}

export default PaperworkViewer;