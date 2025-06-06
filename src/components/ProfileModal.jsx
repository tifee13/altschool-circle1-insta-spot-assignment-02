// src/components/ProfileModal.jsx
import React from 'react';

const ProfileModal = ({ onClose }) => (
  <dialog className="modal" id="editModal" aria-label="modal-section" open>
    <button className="btn btn-close btn-light" id="cancelBtn" onClick={onClose}>X</button>
    <form noValidate className="modal-form" id="editForm">
      <div className="name-edit form-content">
        <div className="form-label">
          <label htmlFor="editName">Name:</label>
          <span className="error hidden" id="name-error">Field cannot be empty</span>
        </div>
        <input
          type="text"
          name="profile-name"
          id="editName"
          placeholder="Enter your name"
          required
          minLength="2"
        />
      </div>

      <div className="form-content description-edit">
        <div className="form-label">
          <label htmlFor="editDesc">Description:</label>
          <span className="error hidden" id="description-error">Field cannot be empty</span>
        </div>
        <input
          type="text"
          name="text"
          id="editDesc"
          placeholder="Enter your description"
          required
          minLength="2"
        />
      </div>

      <div className="form-content avatar-upload">
        <label>Profile Image:</label>
        <input type="file" name="file" id="editImage" />
      </div>

      <button type="submit" className="btn btn-dark" id="saveBtn">Save</button>
    </form>
  </dialog>
);

export default ProfileModal;
