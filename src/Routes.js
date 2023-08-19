


import { HomePage, LoginPage, NotFoundPage, Wallet } from "Pages";
import Profile from "Pages/Profile";
import RegisterPage from "Pages/RegisterPage";
import ResetPasswordPage from "Pages/ResetPasswordPage";
import RidesHistory from "Pages/RidesHistory";
import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_PROFILE, ROUTE_REGISTER, ROUTE_RESET_PASSWORD, ROUTE_RIDES, ROUTE_WALLET } from "Store/constants";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes as Switch } from "react-router-dom";


const Routes = () => {
    const isLoggedIn = useSelector(state => state.auth.USER) !== null;

    return <Switch>
        {/* For Everyone */}
        <Route path={ROUTE_HOME} element={<HomePage />} />

        {/* For Not Logged In Users */}
        <Route
            path={ROUTE_LOGIN}
            element={<ProtectedRoute
                element={LoginPage}
                condition={!isLoggedIn}
                fallbackPath={ROUTE_HOME}
            />}
        />
        <Route
            path={ROUTE_REGISTER}
            element={<ProtectedRoute
                element={RegisterPage}
                condition={!isLoggedIn}
                fallbackPath={ROUTE_HOME}
            />}
        />
        <Route
            path={ROUTE_RESET_PASSWORD}
            element={<ProtectedRoute
                element={ResetPasswordPage}
                condition={!isLoggedIn}
                fallbackPath={ROUTE_HOME}
            />}
        />

        {/* Only for Logged In Users */}
        <Route path={ROUTE_WALLET} element={<ProtectedRoute element={Wallet} />} />
        <Route path={ROUTE_PROFILE} element={<ProtectedRoute element={Profile} />} />
        <Route path={ROUTE_RIDES} element={<ProtectedRoute element={RidesHistory} />} />

        <Route path="*" element={<NotFoundPage />} />
    </Switch>
};

const ProtectedRoute = ({
    element: Component,
    fallbackPath = ROUTE_REGISTER,
    condition = null
}) => {
    const isLoggedIn = (useSelector(state => state.auth.USER) !== null);
    if (condition === null) condition = isLoggedIn;

    if (!condition) {
        return <Navigate to={fallbackPath} />;
    }

    return <Component></Component>;
};

export default Routes;
