// src/components/CreateNewPost.jsx
import React, { useState, useRef } from 'react';

const CreateNewPost = ({ onAddPost, onClose }) => {
  const [title, setTitle] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({ title: '', image: '' });
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { title: '', image: '' };
    let hasError = false;

    if (title.trim().length < 2) {
      newErrors.title = 'Field cannot be empty';
      hasError = true;
    }

    const file = fileInputRef.current?.files[0];
    if (!file) {
      newErrors.image = 'Field cannot be empty';
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    const newPost = {
      imgSrc: imagePreview,
      imgAlt: title,
      title,
    };
    onAddPost(newPost);
    setTitle('');
    setImagePreview('');
    fileInputRef.current.value = '';
  };

  return (
    <dialog className="modal" open>
      <button className="btn btn-light btn-close" onClick={onClose}>X</button>

      <form className="modal-form" onSubmit={handleSubmit} noValidate>
        <div className="form-content">
          <div className="form-label">
            <label>Photo:</label>
            {errors.image && <span className="error">{errors.image}</span>}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div id="customUpload" className="custom-upload" onClick={handleUploadClick}>
            {imagePreview ? (
              <img src={imagePreview} className="upload-preview" alt="Preview" />
            ) : (
              <span id="uploadText">Click to upload image</span>
            )}
          </div>
        </div>

        <div className="form-content">
          <div className="form-label">
            <label htmlFor="post-title">Title:</label>
            {errors.title && <span className="error">{errors.title}</span>}
          </div>
          <input
            type="text"
            id="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter photo title"
            required
            minLength={2}
          />
        </div>

        <button type="submit" className="btn btn-dark">Post</button>
      </form>
    </dialog>
  );
};

export default CreateNewPost;
