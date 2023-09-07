import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const albumURI='https://jsonplaceholder.typicode.com/albums'

const initialState = {
    albums: [],
    isLoading: false
}

export const fetchAllAlbums=createAsyncThunk(
    'album/fetchAllALbums',
    async(_,thunkAPI)=>{
        try {
            let res = await fetch(albumURI);
            let data = await res.json();
            // console.log(data);
            thunkAPI.dispatch(albumActions.setAllAlbums(data));
          } catch (error) {
            console.log(error);
            thunkAPI.dispatch(albumActions.setAllAlbums([]));
          }
    }
) 

const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        setAllAlbums: (state, action) => {
            state.albums = action.payload
            state.isLoading = false
        },
        addAlbum: (state,action)=>{
            state.albums=[action.payload,...state.albums]
        },
        editAlbum:(state,action)=>{
            state.albums=[]
        }
    }
})

export const albumReducer = albumSlice.reducer
export const albumActions = albumSlice.actions
export const albumSelector = (state) => state.albumReducer