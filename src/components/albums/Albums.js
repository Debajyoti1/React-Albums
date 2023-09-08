import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { albumSelector, fetchAllAlbums } from "../../redux/reducers/albumReducer";
import AlbumItem from "./AlbumItem";
import styles from './Albums.module.css';
export const AlbumList = () => {
    const dispatch = useDispatch();
    const { albums } = useSelector(albumSelector);
    useEffect(() => {
        dispatch(fetchAllAlbums(albums));
    }, []);

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Albums</h1>
            <div className={styles.addEditButton}>
                <button><Link to='/addedit'>Add New Album</Link> <img src="   https://cdn-icons-png.flaticon.com/512/1828/1828817.png " width="15" height="15" alt="Add" ></img></button>
            </div>
            <div className={styles.albumsContainer}>
                {albums.map((album, i) => (
                    <AlbumItem key={album.id} album={album} /> // Use key prop to uniquely identify each item
                ))}
            </div>
        </>
    );
};
