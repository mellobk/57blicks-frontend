/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { Toast } from "primereact/toast";
import { useRef } from "react";

function useCustomToast() {
	const toastRef = useRef<Toast | null>(null);

	const showToast = (
		summary: string,
		detail: string,
		severity: "success" | "info" | "warn" | "error" | undefined,
		life?: number
	): void => {
		console.log("🚀 ~ file: use-custom-toast.ts:15 ~ useCustomToast ~  void:");

		toastRef?.current?.show({
			severity,
			summary,
			detail,
			life: life ?? 3000,
		});
	};

	const hideToast = (): void => {
		toastRef?.current?.clear();
	};

	return { showToast, hideToast, toastRef };
}

export default useCustomToast;
