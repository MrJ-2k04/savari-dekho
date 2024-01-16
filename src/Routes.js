


import useApi from "Components/Hooks/useApi";
import {
    AdminDashboard,
    AdminProfile,
    AdminReports,
    AdminTransactions,
    AdminUsersList,
    AdminVerifyRequests,
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
} from "Pages";
import AboutUsPage from "Pages/Guest/AboutUsPage";
import PrivacyPolicyPage from "Pages/Guest/PrivacyPolicyPage";
import TermsAndCondititionsPage from "Pages/Guest/TermsAndConditionsPage";
import EditRidePage from "Pages/Rider/EditRidePage";
import PublishRidePage from "Pages/Rider/PublishRidePage";
import VerifyRiderPage from "Pages/Rider/VerifyRiderPage";
import VerifyVehiclePage from "Pages/Rider/VerifyVehiclePage";
import BankDetailsPage from "Pages/User/BankDetailsPage";

import { ADMIN_ROUTES, GUEST_ONLY_ROUTES, PUBLIC_ROUTES, DRIVER_ROUTES, ROUTE_ABOUT_US, ROUTE_ADMIN_DASHBOARD, ROUTE_ADMIN_PROFILE, ROUTE_ADMIN_REPORTS, ROUTE_ADMIN_TRANSACTIONS, ROUTE_ADMIN_USERS, ROUTE_ADMIN_VERIFICATION_REQS, ROUTE_BANK, ROUTE_BANK_ADD, ROUTE_BANK_DETAILS, ROUTE_HOME, ROUTE_LOGIN, ROUTE_PRIVACY_POLICY, ROUTE_PROFILE_DASHBOARD, ROUTE_REGISTER, ROUTE_RESET_PASSWORD, ROUTE_RIDE_DETAILS, ROUTE_RIDE_EDIT, ROUTE_RIDES, ROUTE_RIDE_PUBLISH, ROUTE_SEARCH, ROUTE_SEARCH_RESULT, ROUTE_TERMS_AND_CODITIONS, ROUTE_USER_DETAILS, ROUTE_VEHICLE, ROUTE_VEHICLE_ADD, ROUTE_VEHICLE_DETAILS, ROUTE_VERIFY_RIDER, ROUTE_WALLET, ROUTE_RESET_PASSWORD_PAGE, ROUTE_USER } from "Store/constants";
import { selectAccessToken, selectIsAuthenticated, selectRefreshToken, selectUser } from "Store/selectors";
import { authActions } from "Store/slices";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes as Switch, useLocation } from "react-router-dom";




const getTargetRoute = (isAuthenticated, user, route, state) => {
    const targetRoute = { path: null, state: null };

    if (!isAuthenticated) {
        if (route.includes(ROUTE_RESET_PASSWORD)) {
            return targetRoute;
        } else if (route.includes(ROUTE_RIDES) && route !== ROUTE_RIDES) {
            if (route !== ROUTE_RIDE_PUBLISH && !route.match(new RegExp(ROUTE_RIDE_EDIT.replace(/:[a-zA-Z]+/g, '([\\w-]+)')))) {
                return targetRoute;
            }
        } else if (route.includes(ROUTE_USER)) {
            return targetRoute;
        } else if (route.includes(ROUTE_SEARCH_RESULT)) {
            return targetRoute;
        }

        if ((!PUBLIC_ROUTES.includes(route)) && (!GUEST_ONLY_ROUTES.includes(route))) {
            targetRoute.path = ROUTE_LOGIN;
            targetRoute.state = state || { redirectUrl: route };
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
        } else if (DRIVER_ROUTES.includes(route)) {
            switch (route) {
                case ROUTE_VERIFY_RIDER:
                    if (user.riderVerificationStatus) {
                        targetRoute.path = ROUTE_VEHICLE_ADD;
                        targetRoute.state = state;
                    }
                    break;

                case ROUTE_VEHICLE_ADD:
                    if (!user.riderVerificationStatus) {
                        targetRoute.path = ROUTE_VERIFY_RIDER;
                        targetRoute.state = state;
                    }
                    else if (user.vehicles && user.vehicles.length > 0 && state && state.redirectUrl) {
                        targetRoute.path = state.redirectUrl;
                    }
                    break;

                case ROUTE_RIDE_PUBLISH:
                    if (!user.riderVerificationStatus) {
                        targetRoute.path = ROUTE_VERIFY_RIDER;
                        targetRoute.state = state || { redirectUrl: route };
                    } else if (!user.vehicles || user.vehicles.length === 0) {
                        targetRoute.path = ROUTE_VEHICLE_ADD;
                        targetRoute.state = state || { redirectUrl: route };
                    }
                    break;

                case ROUTE_VEHICLE:
                    targetRoute.path = ROUTE_VEHICLE_ADD;
                    break;

                case ROUTE_BANK:
                    targetRoute.path = ROUTE_BANK_ADD;
                    break;

                default:
                    break;
            }
        }
    }
    return targetRoute;
};



const Routes = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const location = useLocation();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const { syncUser } = useApi();
    const accessToken = useSelector(selectAccessToken);
    const refreshToken = useSelector(selectRefreshToken);

    const { path, state } = getTargetRoute(isAuthenticated, user, location.pathname + location.search, location.state);

    useEffect(() => {
        if (isAuthenticated) {
            if (Cookies.get('accessToken') !== accessToken || Cookies.get('refreshToken') !== refreshToken) {
                dispatch(authActions.setTokens({ accessToken: Cookies.get('accessToken'), refreshToken: Cookies.get('refreshToken') }))
            }
            if (!path) {
                syncUser();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    if (path) {
        return <Navigate to={path} state={state} />
    }

    return <Switch location={location} key={location.key}>
        <Route path={ROUTE_ABOUT_US} element={<AboutUsPage />} />
        <Route path={ROUTE_PRIVACY_POLICY} element={<PrivacyPolicyPage />} />
        <Route path={ROUTE_TERMS_AND_CODITIONS} element={<TermsAndCondititionsPage />} />
        {/* For Everyone */}

        <Route path={ROUTE_HOME} element={<HomePage />} />
        <Route path={ROUTE_SEARCH} element={<SearchPage />} />
        <Route path={ROUTE_SEARCH_RESULT} element={<SearchResultsPage />} />
        <Route path={ROUTE_RIDE_DETAILS} element={<RideDetailsPage />} />
        <Route path={ROUTE_USER_DETAILS} element={<UserDetailsPage />} />
        <Route path={ROUTE_RESET_PASSWORD_PAGE} element={<ResetPasswordPage />} />

        {/* For Guests Only */}
        <Route path={ROUTE_LOGIN} element={<LoginPage />} />
        <Route path={ROUTE_REGISTER} element={<RegisterPage />} />

        {/* For Registered Users */}
        <Route path={ROUTE_WALLET} element={<WalletPage />} />
        <Route path={ROUTE_PROFILE_DASHBOARD} element={<ProfilePage />} />
        <Route path={ROUTE_RIDES} element={<RidesHistoryPage />} />
        <Route path={ROUTE_BANK_ADD} element={<BankDetailsPage />} />
        <Route path={ROUTE_BANK_DETAILS} element={<BankDetailsPage viewMode />} />

        {/* For Ride Publishers */}
        <Route path={ROUTE_VERIFY_RIDER} element={<VerifyRiderPage />} />
        <Route path={ROUTE_VEHICLE_ADD} element={<VerifyVehiclePage />} />
        <Route path={ROUTE_VEHICLE_DETAILS} element={<VerifyVehiclePage viewMode />} />
        <Route path={ROUTE_RIDE_PUBLISH} element={<PublishRidePage />} />
        <Route path={ROUTE_RIDE_EDIT} element={<EditRidePage />} />


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
