import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Login from './pages/login/Login';
import { Dashboard } from "./pages/EmployeeManagement/Dashboard/index";
import { Asset } from "./pages/Assets/dashboard/DashboardContainer";
import AppProvider from "./providers/AppProvider";
// import AuthProvider from "./providers/AuthProvider";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import * as pageRoutes from "./auth/constants";
import PrivateRoute from "./auth/PrivateRoute";
import AuthProvider from "./providers/AuthProvider";


function App() {
  return (
    <AppProvider>
      <Login />
      <AuthProvider>
        <Router>
          <Route>
            <Switch>
              <PrivateRoute path={pageRoutes.PAGE_ROUTE_DASHBOARD}>
                <Dashboard />
              </PrivateRoute>
            </Switch>
          </Route>
        </Router>
      </AuthProvider>


    </AppProvider>
  );
}

export default App;
