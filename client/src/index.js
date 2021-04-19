import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Loading } from './common';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './common/ReactGA';

import { AppStateProvider , ErrorBoundary, ErrorFallback } from './common';

const App = React.lazy(() => import('./App'));

const reloadPage = () => window.location.reload();

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary fallback={ErrorFallback} onRetry={reloadPage}>
      <Suspense fallback={<Loading />}>
        <AppStateProvider>
          <App />
        </AppStateProvider>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
