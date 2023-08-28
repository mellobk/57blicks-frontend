import { useRef, useEffect } from "react";
import { Toast } from 'primereact/toast';
import type { FunctionComponent } from "@/types";

const ErrorFallback = (): FunctionComponent => {
  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (toast.current) {
      toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong!', life: 5000 });
    }
  }, []);

  return <Toast ref={toast} />;
}

export default ErrorFallback;
