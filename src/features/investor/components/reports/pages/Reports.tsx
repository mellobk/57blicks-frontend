/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from "react";
import { AllDefaultReport } from "../components/allDefaultReport";

export const Reports: FC = () => {
	return (
		<div className="flex w-full bg-white justify-center   rounded-3xl h-[100vw] ">
			<div className="flex w-full bg-white justify-center flex-wrap rounded-3xl">
				<AllDefaultReport />
			</div>
		</div>
	);
};
