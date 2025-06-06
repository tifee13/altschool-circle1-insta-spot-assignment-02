// src/components/ProfileEditor.jsx
import React, { useState, useEffect } from 'react';

const ProfileEditor = ({ profile, onSave, onClose }) => {
  const [name, setName] = useState(profile?.name || '');
  const [description, setDescription] = useState(profile?.description || '');
  const [image, setImage] = useState(profile?.image || null);
  const [errors, setErrors] = useState({ name: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { name: '', description: '' };
    let hasError = false;

    if (name.trim().length < 2) {
      newErrors.name = 'Minimum of 2 characters';
      hasError = true;
    }
    if (description.trim().length < 2) {
      newErrors.description = 'Minimum of 2 characters';
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    onSave({
      name: name.trim(),
      description: description.trim(),
      image,
    });
    onClose();
  };

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);  // reader.result is a base64 data URL string
    };
    reader.readAsDataURL(file);
  }
};



  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <dialog className="modal" open>
      <button className="btn btn-close btn-light" onClick={onClose}>X</button>

      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="name-edit form-content">
          <div className="form-label">
            <label htmlFor="editName">Name:</label>
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <input
            type="text"
            id="editName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            minLength={2}
          />
        </div>

        <div className="form-content description-edit">
          <div className="form-label">
            <label htmlFor="editDesc">Description:</label>
            {errors.description && <span className="error">{errors.description}</span>}
          </div>
          <input
            type="text"
            id="editDesc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your description"
            required
            minLength={2}
          />
        </div>

        <div className="form-content avatar-upload">
          <label htmlFor="editImage">Profile Image:</label>
          <input type="file" id="editImage" onChange={handleImageChange} accept="image/*" />
        </div>

        <button type="submit" className="btn btn-dark">Save</button>
      </form>
    </dialog>
  );
};

export default ProfileEditor;
