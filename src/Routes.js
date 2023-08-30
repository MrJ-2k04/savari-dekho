


import {
    Dashboard,
    HomePage,
    LoginPage,
    NotFoundPage,
    ProfilePage,
    RegisterPage,
    ResetPasswordPage,
    RideDetailsPage,
    RidesHistoryPage,
    SearchPage,
    SearchResultsPage,
    UserDetailsPage,
    UsersList,
    WalletPage,
} from "Pages";

import { ADMIN_ROUTES, GUEST_ONLY_ROUTES, PUBLIC_ROUTES, ROUTE_ADMIN_DASHBOARD, ROUTE_ADMIN_USERS, ROUTE_HOME, ROUTE_LOGIN, ROUTE_PROFILE_DASHBOARD, ROUTE_REGISTER, ROUTE_RESET_PASSWORD, ROUTE_RIDE_DETAILS, ROUTE_RIDE_HISTORY, ROUTE_SEARCH, ROUTE_SEARCH_RESULT, ROUTE_USER_DETAILS, ROUTE_WALLET } from "Store/constants";
import { selectIsAuthenticated, selectUser } from "Store/selectors";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes as Switch, useLocation } from "react-router-dom";




const getTargetRoute = (isAuthenticated, user, route) => {
    if (!isAuthenticated) {
        if ((!PUBLIC_ROUTES.includes(route)) && (!GUEST_ONLY_ROUTES.includes(route))) {
            switch (route) {
                default:
                    return ROUTE_LOGIN;
            }
        }
    } else {
        if (GUEST_ONLY_ROUTES.includes(route)) {
            return ROUTE_HOME;
        } else if (user.isAdmin) {
            if (!ADMIN_ROUTES.includes(route)) {
                return ROUTE_ADMIN_DASHBOARD;
            }
        } else if (ADMIN_ROUTES.includes(route)) {
            return ROUTE_HOME;
        }
    }
    return null; // No navigation needed
};



const Routes = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const location = useLocation();
    const user = useSelector(selectUser);

    const targetRoute = getTargetRoute(isAuthenticated, user, location.pathname);
    if (targetRoute) {
        return <Navigate to={targetRoute} />
    }

    return <AnimatePresence mode="wait" presenceAffectsLayout={true}>
        <Switch location={location} key={location.key}>
            {/* For Everyone */}
            <Route path={ROUTE_HOME} element={<HomePage />} />
            <Route path={ROUTE_SEARCH} element={<SearchPage />} />
            <Route path={ROUTE_SEARCH_RESULT} element={<SearchResultsPage />} />
            <Route path={ROUTE_RIDE_DETAILS} element={<RideDetailsPage />} />
            <Route path={ROUTE_USER_DETAILS} element={<UserDetailsPage />} />
            <Route path={ROUTE_RESET_PASSWORD} element={<ResetPasswordPage />} />

            {/* For Guests Only */}
            <Route path={ROUTE_LOGIN} element={<LoginPage />} />
            <Route path={ROUTE_REGISTER} element={<RegisterPage />} />

            {/* For Registered Users */}
            <Route path={ROUTE_WALLET} element={<WalletPage />} />
            <Route path={ROUTE_PROFILE_DASHBOARD} element={<ProfilePage />} />
            <Route path={ROUTE_RIDE_HISTORY} element={<RidesHistoryPage />} />

            {/* For Admin */}
            <Route path={ROUTE_ADMIN_DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTE_ADMIN_USERS} element={<UsersList />} />

            <Route path="*" element={<NotFoundPage />} />
        </Switch>
    </AnimatePresence>
};

// const ProtectedRoute = ({
//     element: Component,
//     fallbackPath = ROUTE_LOGIN,
//     condition = null
// }) => {
//     const isAuthenticated = useSelector(selectIsAuthenticated);

//     if (condition === null) condition = isAuthenticated;

//     if (!condition) {
//         return <Navigate to={fallbackPath} />;
//     }

//     return <Component></Component>;
// };

export default Routes;
