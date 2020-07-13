import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@material-ui/core";
import AddFiles from "../../../assets/add_files.svg";
import PdfIcon from "../../../assets/pdf_icon_duotone.svg";
import { ModalActionFooter } from "../../shared/modal/Modal";
import { bytesToSize } from "../../../global_func_lib";
import "./DocUploadDropzone.css";

const rootStyles = {
  flex: 1,
  textAlign: "center",
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingTop: "25px",
  borderWidth: 3,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  height: "300px",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#0088ff",
  backgroundColor: "#0088ff40",
  display: "block",
  paddingTop: "25px",
};

/**
 *
 * @param {object} props
 * Props passed to this component.
 *
 * @param {(acceptedFiles: File[]) => void} props.uploadDocumentCallback
 * Callback to upload the selected document.
 * This callback is called when "Upload" button is pressed.
 *
 * @param {Function} props.dismissCallback
 * Callback to dismiss upload modal
 *
 * @returns {JSX.Element}
 * `DocUploadDropzone` JSX Element.
 */
function DocUploadDropzone({ uploadDocumentCallback, dismissCallback }) {
  let {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({
    multiple: false,
    accept: [".pdf"],
  });

  const style = useMemo(
    () => ({
      ...rootStyles,
      ...(isDragActive ? activeStyle : {}),
    }),
    [isDragActive]
  );

  return (
    <>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />

        <div
          className={`upload-modal-inner-content ${
            isDragActive ? "dropzone-active" : ""
          }`}
        >
          {acceptedFiles === 0 ? (
            <img src={AddFiles} alt="Upload Document" />
          ) : (
            <img src={PdfIcon} alt="Document Selected" />
          )}

          {isDragActive ? (
            <p style={{ color: "#0088ff", fontSize: 18, marginTop: 30 }}>
              Drop the file here...
            </p>
          ) : acceptedFiles.length === 0 ? (
            <p>
              Drag and drop your paperwork here
              <div
                style={{
                  fontWeight: "bold",
                  margin: "10px auto",
                }}
              >
                OR
              </div>
              <span style={{ color: "#0088ff" }}>
                &nbsp;click to select a file
              </span>
            </p>
          ) : (
            <>
              <h2
                style={{
                  fontSize: 20,
                  marginTop: 30,
                  marginBottom: 10,
                  color: "#000000",
                }}
              >
                {acceptedFiles[0].name}
              </h2>
              <p style={{ color: "#0088ff", fontSize: 18, marginTop: 10 }}>
                {bytesToSize(acceptedFiles[0].size)}
              </p>
            </>
          )}
        </div>
      </div>
      <ModalActionFooter marginTop={20}>
        <Button variant="outlined" onClick={dismissCallback} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={acceptedFiles.length === 0 || acceptedFiles[0].size === 0}
          onClick={() => uploadDocumentCallback(acceptedFiles)}
        >
          Upload
        </Button>
      </ModalActionFooter>
    </>
  );
}

export default DocUploadDropzone;
