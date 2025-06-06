import React, { useEffect, useState } from 'react';

import Header from './components/Header';
import Gallery from './components/Gallery';
import CreateNewPost from './components/CreateNewPost';
import Footer from './components/Footer';
import Cards from './components/Cards';
import PreviewableCards from './components/PreviewableCards';
import ProfileEditor from './components/ProfileEditor';
import { cardsData } from './data/CardsData';

const PROFILE_KEY = 'instaspot-profile';
const POSTS_KEY = 'instaspot-posts';

const App = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});


  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem(PROFILE_KEY));
    if (savedProfile) setProfile(savedProfile);

    const savedPosts = JSON.parse(localStorage.getItem(POSTS_KEY));
    if (Array.isArray(savedPosts)) setPosts(savedPosts);
  }, []);

  useEffect(() => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  }, [posts]);

  const toggleLike = (imgSrc) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [imgSrc]: !prevLikes[imgSrc],
    }));
  };
  const handleEdit = () => setShowEdit(true);
  const handleNewPost = () => setShowPost(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleClosePost = () => setShowPost(false);

  const handleProfileSave = (updatedProfile) => {
    setProfile(updatedProfile);
    setShowEdit(false);
  };

  const handleAddPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
    setShowPost(false);
  };

  return (
    <>
      <Header profile={profile} onEdit={handleEdit} onNewPost={handleNewPost} />
      <Gallery />
      <main className="main" role="main">
        <Cards extraCards={posts} likes={likes} onLikeToggle={toggleLike} />
      </main>
      <PreviewableCards cardsData={[...posts, ...cardsData]} containerSelector=".container" />
      <Footer />

      {showEdit && (
        <ProfileEditor
          profile={profile}
          onSave={handleProfileSave}
          onClose={handleCloseEdit}
        />
      )}

      {showPost && (
        <CreateNewPost onAddPost={handleAddPost} onClose={handleClosePost} />
      )}
    </>
  );
};

export default App;
