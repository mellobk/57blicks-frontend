export interface ToastOptions {
  duration: number;
  isClosable?: boolean;
}

const defaultOptions = {
  duration: 5000,
  isClosable: true,
};

export const useToast = () => {
  return (options: ToastOptions) => {
    console.log('SHOW_TOAST', options);
  };
};
