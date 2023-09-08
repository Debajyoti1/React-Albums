import { useNavigate } from 'react-router-dom';
import styles from './Albums.module.css'
import { useDispatch } from 'react-redux';
import { deleteAlbum } from '../../redux/reducers/albumReducer';

const AlbumItem=({album})=>{
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const navigateToEdit=()=>{
        navigate('/addedit', { state: { type: 'Edit', album } })
    }
    const performDelete=()=>{
        dispatch(deleteAlbum(album))
    }
    return (
        <div className={styles.albumItem}>
            <h3>{album.id}</h3>
            <p>{album.title}</p>
            <img src="https://cdn-icons-png.flaticon.com/512/1358/1358994.png" width="256" height="256" alt='album'></img>
            <div className={styles.itemButtonContainer}>
                <button onClick={navigateToEdit}>Edit <img src="https://cdn-icons-png.flaticon.com/512/1160/1160758.png" width="15" height="15" alt="Edit"></img></button>
                <button onClick={performDelete}>Delete <img src="   https://cdn-icons-png.flaticon.com/512/10336/10336279.png " width="15" height="15" alt="" title="" class="img-small"></img></button>
            </div>
        </div>
    )
}
export default AlbumItem