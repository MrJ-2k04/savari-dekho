


import {
    AdminDashboard,
    AdminProfile,
    AdminUsersList,
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
    WalletPage,
    AdminReports,
    AdminTransactions,
    AdminVerifyRequests,
} from "Pages";

import { ADMIN_ROUTES, GUEST_ONLY_ROUTES, PUBLIC_ROUTES, ROUTE_ADMIN_DASHBOARD, ROUTE_ADMIN_PROFILE, ROUTE_ADMIN_REPORTS, ROUTE_ADMIN_TRANSACTIONS, ROUTE_ADMIN_USERS, ROUTE_ADMIN_VERIFICATION_REQS, ROUTE_HOME, ROUTE_LOGIN, ROUTE_PROFILE_DASHBOARD, ROUTE_REGISTER, ROUTE_RESET_PASSWORD, ROUTE_RIDE_DETAILS, ROUTE_RIDE_HISTORY, ROUTE_SEARCH, ROUTE_SEARCH_RESULT, ROUTE_USER_DETAILS, ROUTE_WALLET, USER_ROUTES } from "Store/constants";
import { selectIsAuthenticated, selectUser } from "Store/selectors";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes as Switch, useLocation } from "react-router-dom";




const getTargetRoute = (isAuthenticated, user, route, state) => {
    const targetRoute = { path: null, state: null };
    if (!isAuthenticated) {
        if ((!PUBLIC_ROUTES.includes(route)) && (!GUEST_ONLY_ROUTES.includes(route))) {
            if (!USER_ROUTES.includes(route) && !ADMIN_ROUTES.includes(route)) {
                // No Navigation Needed
            } else {
                targetRoute.path = ROUTE_LOGIN;
                targetRoute.state = state;
            }
        }
    } else {
        if (GUEST_ONLY_ROUTES.includes(route)) {
            if (state && state.redirectUrl) {
                targetRoute.path = state.redirectUrl;
            } else {
                targetRoute.path = ROUTE_HOME;
                targetRoute.state = state;
            }
        } else if (user.isAdmin) {
            if (!ADMIN_ROUTES.includes(route)) {
                targetRoute.path = ROUTE_ADMIN_DASHBOARD;
            }
        } else if (ADMIN_ROUTES.includes(route)) {
            targetRoute.path = ROUTE_HOME;
        }
    }
    return targetRoute;
};



const Routes = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const location = useLocation();
    const user = useSelector(selectUser);

    const { path, state } = getTargetRoute(isAuthenticated, user, location.pathname, location.state);

    if (path) {
        return <Navigate to={path} state={state} />
    }

    return <Switch location={location} key={location.key}>
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
        <Route path={ROUTE_ADMIN_DASHBOARD} element={<AdminDashboard />} />
        <Route path={ROUTE_ADMIN_USERS} element={<AdminUsersList />} />
        <Route path={ROUTE_ADMIN_PROFILE} element={<AdminProfile />} />
        <Route path={ROUTE_ADMIN_REPORTS} element={<AdminReports />} />
        <Route path={ROUTE_ADMIN_TRANSACTIONS} element={<AdminTransactions />} />
        <Route path={ROUTE_ADMIN_VERIFICATION_REQS} element={<AdminVerifyRequests />} />

        <Route path="*" element={<NotFoundPage />} />
    </Switch>
};

export default Routes;
