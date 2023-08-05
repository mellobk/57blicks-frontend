// import { t } from 'utils';

export const useSignInNotifications = () => {
  const success = () => console.log('IMPLEMENT_TOAST');

  const failure = () => console.log('IMPLEMENT_TOAST');

  return [success, failure] as const;
};
