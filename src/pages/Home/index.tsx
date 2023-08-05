import { Page } from 'shared/Layout';
import { InternalErrorResult } from 'shared/Result';
import { useRouteError } from 'shared/Router';

import { Demo } from 'modules/demo/presentation';

const HomePage = () => {
  return (
    <Page maxW="xl" spacing="20">
      <Demo />
    </Page>
  );
};

export const Component = HomePage;

export const ErrorBoundary = () => {
  const error = useRouteError();

  if (error.status !== 404) {
    return <HomePage />;
  }

  return <InternalErrorResult />;
};
