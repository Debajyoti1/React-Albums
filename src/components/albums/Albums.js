import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllAlbums } from "../../redux/reducers/albumReducer";
import { albumSelector } from "../../redux/reducers/albumReducer";
import AlbumItem from "./AlbumItem";
import styles from 'Albums.module.css'
export const AlbumList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllAlbums());
    }, []);

    const { albums, isLoading } = useSelector(albumSelector);

    return (
        <div className="">
            {albums.map((album, i) => (
                <AlbumItem key={album.id} album={album} /> // Use key prop to uniquely identify each item
            ))}
        </div>
    );
};
