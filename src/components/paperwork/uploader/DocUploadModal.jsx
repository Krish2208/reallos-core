import React, { useState } from "react";
import { useLocation } from 'react-router';
import Modal from "../../shared/modal/Modal";
import { myStorage } from "../../../Config/MyFirebase.js";
import DocUploadDropzone from "./DocUploadDropzone";
import DocUploadStatus from "./DocUploadStatus";
import { getTransactionID } from '../../../global_func_lib';
import "./DocUploadModal.css";

/**
 * Document upload modal component.
 *
 * @param {object} props
 * Props passed to this component.
 *
 * @param {boolean} props.visible
 * Specify if the upload modal is visible.
 *
 * @param {(message: string) => void} props.showSnackbarCallback
 * Callback to show snackbar.
 *
 * @param {Function} props.onSuccessCallback
 * Callback called after an upload is successful.
 *
 * @param {Function} props.dismissCallback
 * Callback to dismiss the upload modal.
 *
 * @returns {JSX.Element}
 * Document Upload Modal
 */
function DocUploadModal({
  visible,
  dismissCallback,
  showSnackbarCallback,
  onSuccessCallback,
}) {
  let [isUploading, setUploadState] = useState(false);
  let [uploadTaskStatus, setUploadTaskStatus] = useState({
    progress: 0,
    isPaused: false,
    uploadTask: null,
  });

  const location = useLocation();
  const transactionID = getTransactionID(location);

  /**
   * Uploads document selected in uploader
   *
   * @param {File[]} acceptedFiles
   * Array of files to be uploaded.
   * (_NOTE: Only a single file is uploaded_)
   *
   * @returns {void}
   * Void
   */
  const uploadDocument = (acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      setUploadState(true);

      let fileRef = myStorage
        .ref()
        .child(`${transactionID}/paperworks/${acceptedFiles[0].name}`);
      let uploadTask = fileRef.put(acceptedFiles[0]);

      uploadTask.on("state_changed", (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        let isPaused = snapshot.state === "paused";

        let newUploadTaskDetails = {
          filename: acceptedFiles[0].name,
          progress,
          isPaused,
          uploadTask,
        };

        setUploadTaskStatus(newUploadTaskDetails);
      });
    }
  };

  /**
   * Resets upload modal.
   */
  const resetUploadState = () => {
    setUploadState(false);
    setUploadTaskStatus({
      progress: 0,
      isPaused: false,
      isCancelled: false,
    });
  };

  return (
    <Modal
      title="Upload Document"
      dismissCallback={dismissCallback}
      visible={visible}
      modalWidth={700}
    >
      {!isUploading ? (
        <DocUploadDropzone
          uploadDocumentCallback={uploadDocument}
          dismissCallback={dismissCallback}
        />
      ) : (
        <DocUploadStatus
          uploadStatus={uploadTaskStatus}
          resetUploadStateCallback={resetUploadState}
          dismissCallback={dismissCallback}
          showSnackbarCallback={showSnackbarCallback}
          onSuccessCallback={onSuccessCallback}
        />
      )}
    </Modal>
  );
}

export default DocUploadModal;
