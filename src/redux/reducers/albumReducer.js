import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const albumURI = 'https://jsonplaceholder.typicode.com/albums'

const initialState = {
    albums: [],
    isLoading: false
}

export const fetchAllAlbums = createAsyncThunk(
    'album/fetchAllAlbums',
    async (args, thunkAPI) => {
        console.log(args.length);
        if (args.length === 0) { // Check if albums is empty
            try {
                let res = await fetch(albumURI);
                let data = await res.json();
                thunkAPI.dispatch(albumActions.setAllAlbums(data));
            } catch (error) {
                console.log(error);
                thunkAPI.dispatch(albumActions.setAllAlbums([]));
            }
        } else {
            // No need to fetch, albums already exist
            return args;
        }
    }
);
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
            console.log(data);
            thunkAPI.dispatch(albumActions.add(args));
        } catch (error) {
            console.log(error);
            return
        }

    }
);
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
        } catch (error) {
            console.log(error);
            thunkAPI.dispatch(albumActions.setAllAlbums([]));
        }
    }
);
export const deleteAlbum = createAsyncThunk(
    'album/deleteAlbum',
    async (args, thunkAPI) => {
        try {
            let res = await fetch(albumURI + `/${args.id}`, {
                method: 'DELETE'
            });
            thunkAPI.dispatch(albumActions.delete(args));
        } catch (error) {
            console.log(error);
        }
    }

);

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
            console.log(action.payload);
            state.albums = state.albums.filter((album) => 
                (album.id !== action.payload.id || album.userId !==action.payload.userId)
            );
        }
    }
})

export const albumReducer = albumSlice.reducer
export const albumActions = albumSlice.actions
export const albumSelector = (state) => state.albumReducer