import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Login from './pages/login/Login';
import { Dashboard } from "./pages/EmployeeManagement/Dashboard/index";
import { Asset } from "./pages/Assets/dashboard/DashboardContainer";

function App() {
  return (
    <div className="App">
        <Login/>
    </div>
  );
}

export default App;
