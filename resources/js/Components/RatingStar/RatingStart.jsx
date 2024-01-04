/** @format */

import React, { useState, useCallback } from "react";
import { Banner, Modal, Text, TextField } from "@shopify/polaris";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const toggleActive = useCallback(
    () => setShowModal((showModal) => !showModal),
    []
  );

  const [modalRating, setModalRating] = useState(0);
  const [starColors, setStarColors] = useState([0, 0, 0, 0, 0]); // Initial colors for each star
  const [starModalColors, setStarModalColors] = useState([0, 0, 0, 0, 0]); // Initial colors for each star
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    if (selectedRating === 5) {
      window.location.href = "https://example.com";
    } else if (selectedRating < 5 && selectedRating >= 1) {
      // Open modal for ratings less than 5
      setShowModal(!showModal);
    }
  };

  const handleStarHover = (star) => {
    const updatedColors = starColors.map((_, index) =>
      star >= index + 1 ? "yellow" : "gray"
    );
    setStarColors(updatedColors);
  };

  const handleStarLeave = () => {
    const updatedColors = starColors.map((_, index) =>
      index + 1 <= rating ? "yellow" : "gray"
    );
    setStarColors(updatedColors);
  };

  const handleStarModalHover = (star) => {
    const updatedColors = starModalColors.map((_, index) =>
      star >= index + 1 ? "yellow" : "gray"
    );
    setStarModalColors(updatedColors);
  };

  const handleStarModalLeave = () => {
    const updatedColors = starModalColors.map((_, index) =>
      index + 1 <= modalRating ? "yellow" : "gray"
    );
    setStarModalColors(updatedColors);
  };

  const handleModalStarClick = (selectedRating) => {
    setModalRating(selectedRating);
    //  setShowModal(!showModal);
  };

  const [modaltext, setModalText] = useState("");
  const handleChange = useCallback((value) => setModalText(value), []);

  return (
    <>
      <Banner onDismiss={() => {}}>
        <div className="inline">
          <div>
            <p style={{ fontWeight: "600" }}>
              We believe you had the best time here. Please let us know how's
              your experience. It means a lot to us.
            </p>
          </div>
          <div>
            {[1, 2, 3, 4, 5].map((star, index) => (
              <span
                key={star}
                onClick={() => handleStarClick(star)}
                style={{
                  cursor: "pointer",
                  color: starColors[index],
                  fontSize: "30px",
                  transition: "color 0.3s ease-in-out",
                }}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={handleStarLeave}>
                &#9733;{/* Unicode character for a star */}
              </span>
            ))}
            {showModal && (
              <Modal
                open={showModal}
                onClose={toggleActive}
                title="Write a review"
                primaryAction={{
                  content: "Submit",
                  onAction: toggleActive,
                }}
                secondaryActions={[
                  {
                    content: "Cancel",
                    onAction: toggleActive,
                  },
                ]}>
                <Modal.Section>
                  <Text>How would you rate this app?</Text>
                  {[1, 2, 3, 4, 5].map((star1, index) => (
                    <span
                      key={star1}
                      onClick={() => handleModalStarClick(star1)}
                      style={{
                        cursor: "pointer",
                        color: starModalColors[index],
                        fontSize: "30px",
                        transition: "color 0.9s ease-in-out",
                      }}
                      onMouseEnter={() => handleStarModalHover(star1)}
                      onMouseLeave={handleStarModalLeave}>
                      &#9733;{/* Unicode character for a star */}
                    </span>
                  ))}
                  <Text>Tell us about your experience with Shortly</Text>
                  <TextField
                    value={modaltext}
                    onChange={handleChange}
                    multiline={5}
                    maxLength={1000}
                    autoComplete="off"
                  />
                </Modal.Section>
              </Modal>
            )}
          </div>
        </div>
      </Banner>
    </>
  );
};

export default StarRating;
