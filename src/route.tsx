import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import NpmPackageDetail from "./pages/NpmPackageDetail";
import { listLastestPackage } from "./api";
import _ from "lodash";
import UndefinedRouteFallback from "./components/UndefinedRouteFallback";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="package/*"
        element={<NpmPackageDetail />}
        loader={async ({ params }) => {
          const packageName = _.first(Object.values(params));

          if (!packageName) {
            return null;
          }

          return listLastestPackage({ packageName });
        }}
        errorElement={UndefinedRouteFallback}
      />
      <Route
        path="/"
        element={<Home />}
        errorElement={UndefinedRouteFallback}
      ></Route>
    </>
  )
);
