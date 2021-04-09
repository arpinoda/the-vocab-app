import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { AppStateProvider , ErrorBoundary, ErrorFallback, Loading } from './common';

const App = React.lazy(() => import('./App'));

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary fallback={ErrorFallback}>
      <Suspense fallback={<Loading />}>
        <AppStateProvider>
          <App />
        </AppStateProvider>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
