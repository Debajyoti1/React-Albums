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
            <div className={styles.itemButtonContainer}>
                <button onClick={navigateToEdit}>Edit</button>
                <button onClick={performDelete}>Delete</button>
            </div>
        </div>
    )
}
export default AlbumItem