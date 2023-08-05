// eslint-disable-next-line no-restricted-imports
import { RouterProvider } from 'react-router-dom';

import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/900.css';
import { router } from 'pages/router';
import 'primeicons/primeicons.css';
import { ProgressSpinner } from 'primereact/progressspinner';

import { useAuthStore } from 'modules/auth/application';

function App() {
  const state = useAuthStore(store => store.state);

  if (state === 'finished') {
    return <RouterProvider router={router} />;
  }

  return (
    <div className="flex justify-center items-center vw-95">
      <ProgressSpinner />
    </div>
  );
}

export { App };
