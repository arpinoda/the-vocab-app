import React, { Suspense } from 'react';

import { ErrorBoundary } from '../common';
import { ErrorFallback, Loading } from './';

const CardCollection = React.lazy(() => import('../dashboard/CardCollection'));
const Header = React.lazy(() => import('../dashboard/Header'));

const Dashboard = () => (
    <>
        <Header />
        <ErrorBoundary 
            fallback={ErrorFallback}
            onRetry={() => window.location.reload()}
        >
            <Suspense fallback={<Loading />}>
                <CardCollection />
            </Suspense>
        </ErrorBoundary>
    </>
);

export default Dashboard;