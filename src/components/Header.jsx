import React from 'react';

const Header = ({ profile, onEdit, onNewPost }) => {
  return (
    <header role="banner">
      <div className="logo-container" aria-label="Logo container">
        <a href="#" className="logo" aria-label="Go to homepage">
          <img
            src="/assets/icons/spot-logo.svg"
            alt="Insta-spot logo and home-page link"
          />
          <span className="logo-text">SPOTS</span>
        </a>
      </div>

      <div className="banner" aria-label="User profile banner">
        <div className="avatar-section" role="group" aria-label="User information">
        <img
          className="avatar-img"
          id="profileImage"
          src={profile.image || './assets/images/avatar.png'}
          alt={`Profile image of ${profile.name || 'user'}`}
          loading="lazy"
        />

          <div className="properties">
            <div className="details">
              <h3 className="name" id="profileName"> 
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus nam repellat sint laborum ratione, porro molestias minima ad tempora! Dolorem inventore ipsum corrupti alias sapiente at, atque quidem nemo fuga.
              </h3>
              <p className="description" id="profileTitle">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, maiores rem velit minus accusantium voluptas officiis totam
                praesentium eaque ipsum! Sed is tempore doloribus ipsa quasi
                reiciendis labore, neque dicta!
              </p>
            </div>

            <button
              className="btn btn-light"
              id="editBtn"
              type="button"
              aria-label="Edit profile"
              onClick={onEdit}
            >
              <img src="/assets/icons/edit.svg" alt="edit icon" />
              Edit Profile
            </button>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-dark"
          id="post-btn"
          aria-label="Create new post"
          onClick={onNewPost}
        >
          <img src="/assets/icons/plus.svg" alt="+" />
          New Post
        </button>
      </div>
    </header>
  );
};

export default Header;
