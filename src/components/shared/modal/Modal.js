import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { XIcon } from '@primer/octicons-react';
import './Modal.css';

/**
 * Display a modal
 * @augments {React.Component<Props>}
 */
class ReallosModal extends React.Component {
    static propTypes = {
        /**
         * Title to be displayed for the Modal
         */
        title: PropTypes.string.isRequired,

        /**
         * Specify whether the modal is visible
         */
        visible: PropTypes.bool.isRequired,

        /**
         * Callback function which is called when close button
         * is pressed.
         *
         * This function typically should contain code to set
         * visiblity to false. If left unspecified, the close
         * button won't show up.
         */
        dismissCallback: PropTypes.func,

        /**
         * Set width of the modal. (_Default: 450px_)
         */
        modalWidth: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),

        /**
         * Set height of the modal. By default the height
         * will automatically be determined by the content
         * inside the modal.
         *
         * (_Usage not recommended_)
         */
        modalHeight: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),

        /**
         * Remove backdrop blur effect when rendering the
         * modal. You might want to disable the blur
         * effect for performance reasons.
         * 
         * (_Default: false_)
         */
        disableBackdropBlur: PropTypes.bool
    }

    render() {
        let {
            title,
            visible,
            dismissCallback,
            modalWidth,
            modalHeight,
            disableBackdropBlur=false,
            children
        } = this.props;

        return (
            <>
                <div
                    className={`modal-bg ${disableBackdropBlur ? 'modal-no-bg-blur' : ''}`}
                    visible={visible.toString()}
                    aria-modal="true"
                >
                    <div className="modal" style={{'width': modalWidth, 'height': modalHeight}}>
                        <div className="modal-container">
                            {
                                (dismissCallback) ?
                                    <div className="modal-close-btn">
                                        <IconButton onClick={dismissCallback}>
                                            <XIcon size="small" />
                                        </IconButton>
                                    </div>
                                    : <></>
                            }

                            <h1 className="modal-heading">
                                {title}
                            </h1>

                            {children}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

/**
 * Component to render action footer bar for modal.
 * @augments React.Component<Props>
 */
class ModalActionFooter extends React.Component {
    static propTypes = {
        /**
         * Specify where to align the action items.
         * The allowed values are `left` & `right`.
         * 
         * (_Default: "right"_)
         */
        actionPlacement: PropTypes.oneOf([
            'left',
            'right'
        ]),

        /**
         * Top margin for this component
         * 
         * (_Default: 30_)
         */
        marginTop: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])
    }
    
    render() {
        let {
            actionPlacement,
            marginTop,
            children
        } = this.props;

        return (
            <div
                className="modal-action-group"
                actionPlacement={actionPlacement}
                style={{marginTop}}
            >
                {children}
            </div>
        )
    }
}

export default ReallosModal;
export { ModalActionFooter };
