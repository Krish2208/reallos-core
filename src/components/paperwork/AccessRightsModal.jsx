import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal, { ModalActionFooter } from '../shared/modal/Modal';
import { getPeopleInvolved } from '../../global_func_lib';
import { myFirestore } from '../../Config/MyFirebase';
import { NoEntryIcon, PencilIcon, EyeIcon } from '@primer/octicons-react';
import TransactionNoPeople from '../../assets/transaction-no-people.png';

import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    Avatar,
    Button,
    Select,
    MenuItem,
    CircularProgress,
    Grid
} from '@material-ui/core';

import './AccessRightsModal.css';

const mapStateToProps = (state) => ({
    user: state.user
});

/**
 * Display Configure Access Rights Modal.
 * @augments {React.Component<Props>}
 */
class AccessRightsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            peopleList: null,
            accessData: {}
        }
    }

    static propTypes = {
        /**
         * Specify the visibility of the modal
         */
        visible: PropTypes.bool.isRequired,

        /**
         * Callback function to dismiss the Modal
         * when it makes a request to close.
         */
        dismissCallback: PropTypes.func,

        /**
         * Transaction ID to populate the list of people
         * for the given transaction.
         */
        transactionID: PropTypes.string.isRequired
    }

    componentDidMount() {
        this.setPeopleList();
    }

    /**
     * Fetches and sets the people list and their corresponding
     * access rights.
     * 
     * @returns {Promise<void>}
     */
    async setPeopleList() {
        let peopleList = await getPeopleInvolved(this.props.transactionID);
        let accessData = {};
        console.log(myFirestore.app.auth().currentUser)
        console.log(peopleList);

        for (let i = 0; i < peopleList.length; i++) {
            accessData[peopleList[i].email] = 'no-access';
        }

        this.setState({
            peopleList,
            accessData
        });
    }

    /**
     * Updates state for access rights within the component
     * for a given email ID with provided access right value. 
     * 
     * @param {string} email
     * Email ID for which the access has to be set.
     * 
     * @param {"no-access" | "read-access" | "read-edit-access"} value
     * Access right value to be set for a given email ID.
     */
    setAccess(email, value) {
        let accessData = this.state.accessData;
        accessData[email] = value;

        this.setState({ accessData });
    }

    /**
     * Saves current access rights in the cloud.
     */
    saveAccessRights() {
        // @TODO: Save `accessData` in firebase
    }

    render() {
        let { visible, dismissCallback } = this.props;

        return (
            <Modal
                title="Configure Access Rights"
                visible={visible}
                dismissCallback={dismissCallback}
                modalWidth={700}
            >
                <div className="access-rights-subheading">
                    Give people in your transaction granular permissions to this document.
                </div>
                <List className="access-rights-list">
                    {(this.state.peopleList !== null)
                        ? (this.state.peopleList.length > 0)
                            ? this.state.peopleList.map(people => {
                                return (
                                    <ListItem key={people.email}>
                                        <ListItemIcon>
                                            <Avatar />
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={people.name}
                                            secondary={people.email}
                                        />

                                        <ListItemSecondaryAction>
                                            <Select
                                                value={this.state.accessData[people.email]}
                                                variant="outlined"
                                                style={{width: 250}}
                                                onChange={(e) => this.setAccess(
                                                    people.email,
                                                    e.target.value
                                                )}
                                            >
                                                <MenuItem value={"no-access"}>
                                                    <NoEntryIcon size={20} />
                                                    <span style={{marginRight: 20}} />
                                                    No Access
                                                </MenuItem>
                                                <MenuItem value={"read-access"}>
                                                    <EyeIcon size={20} />
                                                    <span style={{marginRight: 20}} />
                                                    Read Access only
                                                </MenuItem>
                                                <MenuItem value={"read-edit-access"}>
                                                    <PencilIcon size={20} />
                                                    <span style={{marginRight: 20}} />
                                                    Read &amp; Edit Access
                                                </MenuItem>
                                            </Select>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )})
                            : <Grid
                                container
                                direction="column"
                                justify="center"
                                alignContent="center"
                                style={{height: '100%', textAlign: 'center'}}
                            >
                                <div>
                                    <img
                                        src={TransactionNoPeople}
                                        alt=""
                                        style={{width: '60%', marginBottom: 20}}
                                    />
                                </div>
                                <h2>
                                    No People Here...
                                </h2>
                                <div>
                                    There are no people available in your transaction
                                </div>
                            </Grid>
                        : <Grid
                            container
                            direction="column"
                            justify="center"
                            alignContent="center"
                            style={{height: '100%'}}
                        >
                            <div style={{textAlign: "center"}}>
                                <CircularProgress />

                                <div style={{marginTop: 20}}>
                                    Fetching access rights...
                                </div>
                            </div>
                        </Grid>
                    }
                </List>

                <ModalActionFooter>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => dismissCallback()}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            this.saveAccessRights();
                            dismissCallback();
                        }}
                    >
                        Save Changes
                    </Button>
                </ModalActionFooter>
            </Modal>
        )
    }
}

export default connect(mapStateToProps)(AccessRightsModal);
