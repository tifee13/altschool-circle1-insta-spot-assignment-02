import React from "react";
import { useEffect, useRef, useState } from "react";

export default function PreviewableCards({ cardsData, containerSelector }) {
  const containerRef = useRef(null);
  const modalRef = useRef(null);
  const [modalCard, setModalCard] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const modal = modalRef.current;

    if (!container || !modal) return;

    function handleClick(event) {
      const clickedImg = event.target.closest("img");
      if (!clickedImg) return;

      const clickedSrc = clickedImg.getAttribute("src");
      const clickedFileName = clickedSrc.split("/").pop();

      const card = cardsData.find(
        (c) => c.imgSrc.split("/").pop() === clickedFileName
      );

      if (!card) {
        console.warn("No card found for image:", clickedSrc);
        return;
      }

      setModalCard(card);
      setModalVisible(true);
    }

    container.addEventListener("click", handleClick);
    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, [cardsData]);

  useEffect(() => {
    function handleBodyClick(event) {
      if (
        !event.target.closest(".previewable-images") &&
        !event.target.closest(".card-img")
      ) {
        closeModal();
      }
    }

    if (modalVisible) {
      setTimeout(() => {
        document.body.addEventListener("click", handleBodyClick);
      }, 0);
    }

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, [modalVisible]);

  function closeModal() {
    setModalVisible(false);
    setModalCard(null);
  }

  return (
    <>
      <div ref={containerRef} className={containerSelector.replace(".", "")} />

      {modalVisible && modalCard && (
        <dialog ref={modalRef} className="previewable-modal show" open>
          <div className="previewable-images">
            <div className="card-img-container">
              <img
                src={modalCard.imgSrc}
                alt={modalCard.imgAlt}
                className="card-img preview-img"
              />
            </div>
            <p className="previewable-title">{modalCard.title}</p>
          </div>
          <img
            src="./assets/icons/x-close-delete-svgrepo-com.svg"
            className="delete-icon"
            onClick={closeModal}
            alt="Close"
          />
        </dialog>
      )}
    </>
  );
}
