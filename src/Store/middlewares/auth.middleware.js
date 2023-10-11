import { authActions } from "Store/slices";
import Cookies from "js-cookie";


export const authMiddleware =
    ({ dispatch, getState }) => (next) => async (action) => {
        switch (action.type) {
            case authActions.setTokens.type:
                const { accessToken, refreshToken } = action.payload;
                Cookies.set('accessToken', accessToken);
                Cookies.set('refreshToken', refreshToken);
                break;

            case authActions.logout.type:
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
                break;

            default:
                break;
        }
        next(action);
    }