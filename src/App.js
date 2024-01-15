import { Navigate, Outlet, Route } from "react-router-dom";
import { Routes } from "./Routes";

import { MainLayout } from "./layouts/MainLayout/MainLayout";
import ListView from "./views/ListView/ListView";
import DetailView from "./views/DetailView/DetailView";
import { View } from "./constants/common";

function renderAppRoutes() {
  return (
    <Route
      path={Routes.Root}
      element={
            <MainLayout>
              <Outlet />
            </MainLayout>
      }
    >
      <Route index element={<Navigate to={View.List} />} />
      <Route
          path={View.List}
          element={
              <ListView />
          }
        />
        <Route
          path={View.Detail}
          element={
            <Outlet />
          }
        >
          <Route path={":id"} element={<DetailView />} />
        </Route>
        
    </Route>
  );
}

export default renderAppRoutes;
