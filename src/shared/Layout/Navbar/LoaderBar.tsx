import { ProgressBar } from 'primereact/progressbar';

import { useNavigation } from 'shared/Router';

const LoaderBar = () => {
  const { state } = useNavigation();

  if (state === 'loading') {
    return <ProgressBar mode="indeterminate" />;
  }

  return null;
};

export { LoaderBar };
