import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const albumURI = 'https://jsonplaceholder.typicode.com/albums'

const initialState = {
    albums: [],
    isLoading: true,
    message: false // Indicates whether a notification message should be displayed
}

// Async action to fetch all albums
export const fetchAllAlbums = createAsyncThunk(
    'album/fetchAllAlbums',
    async (args, thunkAPI) => {
        if (args.length === 0) { // Check if albums are empty
            try {
                let res = await fetch(albumURI);
                let data = await res.json();
                thunkAPI.dispatch(albumActions.setAllAlbums(data));
                // thunkAPI.dispatch(albumActions.setNotification({ success: 'Albums fetched' }));
            } catch (error) {
                console.log(error);
                thunkAPI.dispatch(albumActions.setAllAlbums([]));
                thunkAPI.dispatch(albumActions.setNotification({ error: 'Unable to fetch Albums' }));
            }
        } else {
            // No need to fetch, albums already exist
            return args;
        }
    }
);

// Async action to add a new album
export const addAlbum = createAsyncThunk(
    'album/addAlbum',
    async (args, thunkAPI) => {
        try {
            let res = await fetch(albumURI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
                body: JSON.stringify(args) // Convert the data to JSON format
            });
            let data = await res.json();
            thunkAPI.dispatch(albumActions.add(args));
            thunkAPI.dispatch(albumActions.setNotification({ success: 'Album added' }));
        } catch (error) {
            console.log(error);
            thunkAPI.dispatch(albumActions.setNotification({ error: 'Unable to Add Album' }));
            return;
        }
    }
);

// Async action to update an album
export const updateAlbum = createAsyncThunk(
    'album/updateAlbum',
    async (args, thunkAPI) => {
        try {
            let res = await fetch(albumURI + `/${args.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
                body: JSON.stringify(args) // Convert the data to JSON format
            });
            let data = await res.json();
            thunkAPI.dispatch(albumActions.edit(args));
            thunkAPI.dispatch(albumActions.setNotification({ success: 'Album Edited' }));
        } catch (error) {
            console.log(error);
            thunkAPI.dispatch(albumActions.setAllAlbums([]));
            thunkAPI.dispatch(albumActions.setNotification({ error: 'Unable to Edit Album' }));
        }
    }
);

// Async action to delete an album
export const deleteAlbum = createAsyncThunk(
    'album/deleteAlbum',
    async (args, thunkAPI) => {
        try {
            let res = await fetch(albumURI + `/${args.id}`, {
                method: 'DELETE'
            });
            thunkAPI.dispatch(albumActions.delete(args))
            thunkAPI.dispatch(albumActions.setNotification({ success: 'Album Deleted' }));
        } catch (error) {
            console.log(error);
            thunkAPI.dispatch(albumActions.setNotification({ error: 'Unable to Delete Album' }));
        }
    }
);

// Define the album slice
const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        setAllAlbums: (state, action) => {
            state.albums = action.payload
            state.isLoading = false
        },
        add: (state, action) => {
            state.albums = [action.payload, ...state.albums]
        },
        edit: (state, action) => {
            state.albums = state.albums.map((album) => {
                if (album.id === action.payload.id) {
                    return {
                        ...album,
                        userId: action.payload.userId,
                        title: action.payload.title,
                    };
                }
                return album;
            });
        },
        delete: (state, action) => {
            state.albums = state.albums.filter((album) =>
                (album.id !== action.payload.id || album.userId !== action.payload.userId)
            );
        },
        setNotification: (state, action) => {
            state.message = true; // Set message flag to true to display a notification
        }
    }
});

// Export the album reducer, actions, and selector
export const albumReducer = albumSlice.reducer
export const albumActions = albumSlice.actions
export const albumSelector = (state) => state.albumReducer
