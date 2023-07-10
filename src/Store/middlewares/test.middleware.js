

export const testMiddleware =
    ({ dispatch, getState }) =>
        (next) =>
            async (action) => {
                next(action);
            }