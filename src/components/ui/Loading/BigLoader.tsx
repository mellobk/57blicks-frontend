import type { FC } from "react";

export const BigLoader: FC = () => {
	return (
		<div className="absolute w-full h-full bg-white bg-opacity-70 z-50 flex justify-center items-center">
			<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
		</div>
	);
};
