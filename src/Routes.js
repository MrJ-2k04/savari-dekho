


import { HomePage, LoginPage, NotFoundPage, Wallet } from "Pages";
import Profile from "Pages/Profile";
import RegisterPage from "Pages/RegisterPage";
import RidesHistory from "Pages/RidesHistory";
import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_PROFILE, ROUTE_REGISTER, ROUTE_RIDES, ROUTE_WALLET } from "Store/constants";
import React from "react";
import { Route, Routes as Switch } from "react-router-dom";


const Routes = () => (
    <Switch>
        <Route path={ROUTE_HOME} exact element={<HomePage />} />
        <Route path={ROUTE_LOGIN} exact element={<LoginPage />} />
        <Route path={ROUTE_REGISTER} exact element={<RegisterPage />} />
        <Route path={ROUTE_WALLET} exact element={<Wallet />} />
        <Route path={ROUTE_PROFILE} exact element={<Profile />} />
        <Route path={ROUTE_RIDES} exact element={<RidesHistory />} />

        <Route path="*" element={<NotFoundPage />} />
    </Switch>
);

export default Routes;
