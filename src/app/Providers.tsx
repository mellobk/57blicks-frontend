import { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

// import { theme } from 'theme';
import { queryClient } from 'utils';

import { AuthProvider } from 'modules/auth/application';

interface IProps {
  children: ReactNode;
}

const Providers = ({ children }: IProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export { Providers };
