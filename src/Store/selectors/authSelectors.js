
import { createSelector } from "@reduxjs/toolkit";





// ========================================== SELECTORS ==========================================
const selectAuthState = (state) => state.auth;


export const selectUser = createSelector(
    selectAuthState,
    (auth) => auth.user,
);

export const selectIsAuthenticated = createSelector(
    selectUser,
    (user) => !!user
);

export const selectAccessToken = createSelector(
    selectAuthState,
    (auth) => auth.accessToken
);

export const selectRefreshToken = createSelector(
    selectAuthState,
    (auth) => auth.refreshToken
);