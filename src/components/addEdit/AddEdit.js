import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { albumActions } from '../../redux/reducers/albumReducer';
import styles from './AddEdit.module.css';
import { addAlbum,updateAlbum } from '../../redux/reducers/albumReducer';
export const AddEdit = () => {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Initialize state for input values
  const [userId, setUserId] = useState(location.state?.album?.userId || '');
  const [id, setId] = useState(location.state?.album?.id || '');
  const [title, setTitle] = useState(location.state?.album?.title || '');

  // Extract type from location state. If type is sent, then that must be update request
  const type = location.state?.type;

  // Handle Add/Edit button click
  const handleAddEdit = () => {
    if (type) {
      // Dispatch the action with the updated album data
      const updatedAlbum = { userId, id, title };
      dispatch(updateAlbum(updatedAlbum));

    } else {
      const newAlbum = { userId, id, title };
        dispatch(addAlbum(newAlbum))        
    }
    navigate('/')
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>{type || 'Add'} Form</h1>
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
        <div className={styles.itemButtonContainer}>
          <button onClick={() => navigate('/')}>Back</button>
          <button onClick={handleAddEdit}>{type || 'Add'}</button>
        </div>
      </div>
    </>
  );
};
