import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { albumSelector, fetchAllAlbums } from "../../redux/reducers/albumReducer";
import AlbumItem from "./AlbumItem";
import styles from './Albums.module.css';
import Loader from '../Loader/Loader';

export const AlbumList = () => {
    const dispatch = useDispatch();
    
    // Select albums and isLoading from the Redux store
    const { albums, isLoading } = useSelector(albumSelector);

    // Fetch albums when the component mounts
    useEffect(() => {
        dispatch(fetchAllAlbums(albums));
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <>
            {/* Page title */}
            <h1 style={{ textAlign: 'center' }}>Albums</h1>

            {/* Add New Album button */}
            <div className={styles.addEditButton}>
                <button>
                    <Link to='/addedit'>
                        Add New Album <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" width="15" height="15" alt="Add" />
                    </Link>
                </button>
            </div>

            {/* Display loader while loading */}
            {isLoading && <Loader />}

            {/* Albums container */}
            <div className={styles.albumsContainer}>
                {albums.map((album) => (
                    <AlbumItem key={album.id} album={album} />
                ))}
            </div>
        </>
    );
};
