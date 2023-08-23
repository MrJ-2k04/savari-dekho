

export const authMiddleware =
    ({ dispatch, getState }) => (next) => async (action) => {
        console.log(action);
        next(action);
    }