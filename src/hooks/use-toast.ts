/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { toast, type ToastOptions, type ToastPosition } from "react-toastify";

const useToast = () => {
	const notify = (
		message: string,
		type: "success" | "info" | "warn" | "error"
	) => {
		const commonSettings: ToastOptions = {
			position: "top-right" as ToastPosition,
			autoClose: 2000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		};

		switch (type) {
			case "success": {
				toast.success(message, commonSettings);
				break;
			}
			case "info": {
				toast.info(message, commonSettings);
				break;
			}
			case "warn": {
				toast.warn(message, commonSettings);
				break;
			}
			case "error": {
				toast.error(message, commonSettings);
				break;
			}
		}
	};

	return notify;
};

export default useToast;
