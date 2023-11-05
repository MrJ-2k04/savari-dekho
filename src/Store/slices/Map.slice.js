import { createSlice } from '@reduxjs/toolkit'
import { isLibraryLoaded } from 'Utils';

const mapSlice = createSlice({
    name: 'map',
    initialState: {
        mapLoaded: isLibraryLoaded("places"),
    },
    reducers: {
        setMapLoadedStatus: (state, action) => {
            return { ...state, mapLoaded: action.payload }
        },
    },
})


export const mapActions = mapSlice.actions;

export default mapSlice.reducer;