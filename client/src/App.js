import React, { Suspense } from 'react';
import { AuthAPI } from './api';
import { ErrorBoundary, ErrorFallback } from './common';
import { Container } from 'reactstrap';

const Dashboard = React.lazy(() => import('./dashboard/Dashboard'));
const Header = React.lazy(() => import('./dashboard/Header'));
const Loading = React.lazy(() => import('./common/Loading'));
const Login = React.lazy(() => import('./auth/Login'));

const suspendablePromise = AuthAPI.getCurrentSession();

function App() {
    const user = suspendablePromise.read();

    return (
        user 
            ? (<Container className='position-relative'>
                <Header />
                <ErrorBoundary 
                    fallback={ErrorFallback}
                    onRetry={() => window.location.reload()}
                >
                    <Suspense fallback={<Loading />}>
                        <Dashboard />
                    </Suspense>
                </ErrorBoundary>
             </Container>)
            : <Login />
    );
}

export default App;