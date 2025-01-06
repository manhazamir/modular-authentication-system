import React from "react";
import { Route, Routes } from "react-router-dom";
import * as RC from "./route_constants";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import { PublicRouteWrapper } from "./PublicRouteWrapper";
import { PrivateRouteWrapper } from "./PrivateRouteWrapper";
import AuthForm from "../Pages/AuthForm/AuthForm";
import EmailVerification from "../Pages/EmailVerification/EmailVerification";

export const routesWithComponents = [
  { publicRoute: true, path: RC.BASEURL, component: AuthForm },
  { path: RC.DASHBOARD, component: Dashboard },
  { path: RC.VERIFY_EMAIL, component: EmailVerification },
  { path: "*", noWrapper: true, component: ErrorPage },
];

function AllRoutes() {
  return (
    <Routes>
      {routesWithComponents.map((item) => {
        const ComponentWrapper = item.publicRoute
          ? PublicRouteWrapper
          : PrivateRouteWrapper;

        return (
          <Route
            key={item.path}
            path={item.path}
            element={
              <ComponentWrapper noWrapper={item.noWrapper}>
                <item.component />
              </ComponentWrapper>
            }
          />
        );
      })}
    </Routes>
  );
}

export default AllRoutes;
