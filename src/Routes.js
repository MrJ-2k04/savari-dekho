


import { HomePage, LoginPage, NotFoundPage } from "Pages";
import { ROUTE_HOME, ROUTE_LOGIN } from "Store/constants";
import React from "react";
import { Route, Routes as Switch } from "react-router-dom";


const Routes = () => (
    <Switch>
        <Route path={ROUTE_HOME} exact element={<HomePage />} />
        <Route path={ROUTE_LOGIN} exact element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Switch>
);

export default Routes;
