


import {
    HomePage,
    NotFoundPage,
    LoginPage,
    RegisterPage,
    ResetPasswordPage,
    ProfilePage,
    WalletPage,
    SearchPage,
    SearchResultsPage,
    RideDetailsPage,
    RidesHistoryPage,
    UserDetailsPage
} from "Pages";

import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_PROFILE_DASHBOARD, ROUTE_REGISTER, ROUTE_RESET_PASSWORD, ROUTE_RIDE_HISTORY, ROUTE_RIDE_DETAILS, ROUTE_SEARCH, ROUTE_SEARCH_RESULT, ROUTE_WALLET, ROUTE_USER_DETAILS } from "Store/constants";
import { selectIsAuthenticated } from "Store/selectors";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes as Switch } from "react-router-dom";


const Routes = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    return <Switch>
        {/* For Everyone */}
        <Route path={ROUTE_HOME} element={<HomePage />} />
        <Route path={ROUTE_SEARCH} element={<SearchPage />} />
        <Route path={ROUTE_SEARCH_RESULT} element={<SearchResultsPage />} />
        <Route path={ROUTE_RIDE_DETAILS} element={<RideDetailsPage />} />
        <Route path={ROUTE_USER_DETAILS} element={<UserDetailsPage />} />

        {/* For Not Logged In Users */}
        <Route
            path={ROUTE_LOGIN}
            element={<ProtectedRoute
                element={LoginPage}
                condition={!isAuthenticated}
                fallbackPath={ROUTE_HOME}
            />}
        />
        <Route
            path={ROUTE_REGISTER}
            element={<ProtectedRoute
                element={RegisterPage}
                condition={!isAuthenticated}
                fallbackPath={ROUTE_HOME}
            />}
        />
        <Route
            path={ROUTE_RESET_PASSWORD}
            element={<ProtectedRoute
                element={ResetPasswordPage}
                condition={!isAuthenticated}
                fallbackPath={ROUTE_HOME}
            />}
        />

        {/* Only for Logged In Users */}
        <Route path={ROUTE_WALLET} element={<ProtectedRoute element={WalletPage} />} />
        <Route path={ROUTE_PROFILE_DASHBOARD} element={<ProtectedRoute element={ProfilePage} />} />
        <Route path={ROUTE_RIDE_HISTORY} element={<ProtectedRoute element={RidesHistoryPage} />} />

        <Route path="*" element={<NotFoundPage />} />
    </Switch>
};

const ProtectedRoute = ({
    element: Component,
    fallbackPath = ROUTE_LOGIN,
    condition = null
}) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (condition === null) condition = isAuthenticated;

    if (!condition) {
        return <Navigate to={fallbackPath} />;
    }

    return <Component></Component>;
};

export default Routes;
