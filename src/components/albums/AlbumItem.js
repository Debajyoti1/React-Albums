import { useNavigate } from 'react-router-dom';
import styles from './Albums.module.css';
import { useDispatch } from 'react-redux';
import { deleteAlbum } from '../../redux/reducers/albumReducer';

const AlbumItem = ({ album }) => {
  // React Hooks for navigation and Redux dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to navigate to the edit page with album data
  const navigateToEdit = () => {
    navigate('/addedit', { state: { type: 'Edit', album } });
  };

  // Function to perform the album deletion
  const performDelete = () => {
    dispatch(deleteAlbum(album));
  };

  return (
    <div className={styles.albumItem}>
      {/* Display album ID and title */}
      <h3>{album.id}</h3>
      <p>{album.title}</p>

      {/* Album image */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/1358/1358994.png"
        width="256"
        height="256"
        alt="album"
      ></img>

      {/* Edit and Delete buttons */}
      <div className={styles.itemButtonContainer}>
        <button onClick={navigateToEdit}>
          Edit{' '}
          <img
            src="https://cdn-icons-png.flaticon.com/512/1160/1160758.png"
            width="15"
            height="15"
            alt="Edit"
          ></img>
        </button>
        <button onClick={performDelete}>
          Delete{' '}
          <img
            src="https://cdn-icons-png.flaticon.com/512/10336/10336279.png"
            width="15"
            height="15"
            alt="Delete"
          ></img>
        </button>
      </div>
    </div>
  );
};

export default AlbumItem;
