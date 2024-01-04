import {
  DropZone,
  Box,
  ButtonGroup,
  Button,
  Modal,
  Text,
  Frame,
  ContextualSaveBar,
} from "@shopify/polaris";
import { DeleteMinor, ViewMajor } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";

function UploadImage() {
  const [file, setFile] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => setFile(acceptedFiles[0]),
    []
  );

  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

  const fileUpload = !file && <DropZone.FileUpload />;

  const handleDeleteImage = useCallback(() => {
    setFile(null);
    setShow(!show);
  }, []);

  // Open the modal open and show the image
  const handleViewImage = useCallback(() => {
    setModalOpen(true);
  }, []);

  // Modal closed
  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  // save option
  const [show, setShow] = useState(false);
  return (
    <>
      {!file === true ? (
        <DropZone allowMultiple={false} onDrop={handleDropZoneDrop}>
          {fileUpload}
        </DropZone>
      ) : (
        <Box as="div" style={{ position: "relative" }}>
          <img src={window.URL.createObjectURL(file)} className="upload-img" />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "10%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.7)", // Adjust the overlay background color and opacity
            }}
          >
            <span style={{ color: "#fff", fontWeight: "bold" }}>
              <ButtonGroup>
                <Button icon={DeleteMinor} onClick={handleDeleteImage}></Button>
                <Button icon={ViewMajor} onClick={handleViewImage}></Button>
              </ButtonGroup>
            </span>
          </div>
        </Box>
      )}
      {modalOpen && (
        <Modal open={modalOpen} onClose={handleCloseModal} title="View Image">
          <Modal.Section>
            {file && (
              <img
                src={window.URL.createObjectURL(file)}
                alt="View"
                style={{ maxWidth: "100%", maxHeight: "80vh" }}
              />
            )}
          </Modal.Section>
        </Modal>
      )}
    </>
  );
}
export default UploadImage;
