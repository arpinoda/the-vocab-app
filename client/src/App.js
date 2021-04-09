import React from 'react';
import { AuthAPI } from './api';

const Dashboard = React.lazy(() => import('./dashboard/Dashboard'));
const Login = React.lazy(() => import('./auth/Login'));
const suspendablePromise = AuthAPI.getCurrentSession();

function App() {
    const user = suspendablePromise.read();

    return (
        user ? <Dashboard /> : <Login />
    );
}

export default App;