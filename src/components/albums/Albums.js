import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { albumSelector, fetchAllAlbums } from "../../redux/reducers/albumReducer";
import AlbumItem from "./AlbumItem";
import styles from './Albums.module.css';
export const AlbumList = () => {
    const dispatch = useDispatch();
    const { albums } = useSelector(albumSelector);
    useEffect(() => {
        dispatch(fetchAllAlbums(albums));
    },[]);

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Albums</h1>
            <div className={styles.albumsContainer}>
                {albums.map((album, i) => (
                    <AlbumItem key={album.id} album={album} /> // Use key prop to uniquely identify each item
                ))}
            </div>
        </>
    );
};
