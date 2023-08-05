import { useState } from 'react';
// eslint-disable-next-line no-restricted-imports
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'primereact/button';

import { AjaxError } from 'utils';

import { ErrorPageStrategy } from 'shared/Result';
import { InternalServerErrorResult } from 'shared/Result';

import { ErrorBoundary } from './ErrorBoundary';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withRouter = (story: any) => {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: story(),
      },
    ],
    {
      initialEntries: ['/'],
      initialIndex: 1,
    },
  );

  return <RouterProvider router={router} />;
};

const Throw500Error = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  throw new AjaxError<any, any>(500, {}, {}, {} as any);
};

const TestableErrorBoundary = ({
  withRecovery,
}: {
  withRecovery?: boolean;
}) => {
  const [throwError, setError] = useState(false);
  const [resetKey, setResetKey] = useState(false);

  return (
    <ErrorBoundary<AjaxError>
      resetKeys={[resetKey]}
      fallback={({ error }) => {
        if (withRecovery) {
          return (
            <InternalServerErrorResult>
              <Button onClick={() => setResetKey(state => !state)}>
                Try again
              </Button>
            </InternalServerErrorResult>
          );
        }

        return <ErrorPageStrategy error={error} />;
      }}
    >
      <div className="flex flex-col">
        <Button
          id="test"
          onClick={() => setError(!throwError)}
          severity="danger"
        >
          Throw an error
        </Button>
        {throwError ? (
          <Throw500Error />
        ) : (
          <div>"Everything is fine... at least now"</div>
        )}
      </div>
    </ErrorBoundary>
  );
};

const meta = {
  title: 'shared/ErrorBoundary',
  component: TestableErrorBoundary,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TestableErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithRecovery: Story = {
  args: { withRecovery: true },
};
