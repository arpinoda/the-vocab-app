import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Spinner } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { AppStateProvider , ErrorBoundary, ErrorFallback } from './common';

const App = React.lazy(() => import('./App'));

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary fallback={ErrorFallback} onRetry={() => window.location.reload()}>
      <Suspense fallback={<Spinner type="grow" className="position-absolute m-3" color="secondary" />}>
        <AppStateProvider>
          <App />
        </AppStateProvider>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
