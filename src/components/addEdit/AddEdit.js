import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { albumActions } from '../../redux/reducers/albumReducer';
import styles from './AddEdit.module.css';
import { addAlbum, updateAlbum } from '../../redux/reducers/albumReducer';

export const AddEdit = () => {
  // React Hooks for navigation, location, and Redux dispatch
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Initialize state for input values
  const [userId, setUserId] = useState(location.state?.album?.userId || '');
  const [id, setId] = useState(location.state?.album?.id || '');
  const [title, setTitle] = useState(location.state?.album?.title || '');

  // Extract type from location state. If type is sent, it's an update request
  const type = location.state?.type;

  // Handle Add/Edit button click
  const handleAddEdit = () => {
    if (type) {
      // Dispatch an action to update the album data
      const updatedAlbum = { userId, id, title };
      dispatch(updateAlbum(updatedAlbum));
    } else {
      // Dispatch an action to add a new album
      const newAlbum = { userId, id, title };
      dispatch(addAlbum(newAlbum));
    }

    // Navigate back to the main page
    navigate('/');
  };

  return (
    <>
      {/* Page title */}
      <h1 style={{ textAlign: 'center' }}>{type || 'Add'} Form</h1>

      {/* Image */}
      <div className={styles.imageCenter}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1358/1358994.png"
          width="256"
          height="256"
          alt="album"
        ></img>
      </div>

      {/* Form container */}
      <div className={styles.addEditContainer}>
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="ID"
          value={id}
          disabled={type ? true : false}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Back and Add/Edit buttons */}
        <div className={styles.itemButtonContainer}>
          <button onClick={() => navigate('/')}>
            Back{' '}
            <img
              src="https://cdn-icons-png.flaticon.com/512/2879/2879564.png"
              width="15"
              height="15"
              alt="back"
            ></img>
          </button>
          <button onClick={handleAddEdit}>
            {type || 'Add'}{' '}
            <img
              src="https://cdn-icons-png.flaticon.com/512/489/489707.png"
              width="15"
              height="15"
              alt="save"
            ></img>
          </button>
        </div>
      </div>
    </>
  );
};
