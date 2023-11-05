
import { createSelector } from "@reduxjs/toolkit";


// ========================================== SELECTORS ==========================================
const selectMapState = (state) => state.map;



export const selectIsMapLoaded = createSelector(
    selectMapState,
    (map) => map.mapLoaded
);