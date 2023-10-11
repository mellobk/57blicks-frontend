import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { Button } from "@/components/ui/Button";
import { LEDGER_OPTIONS } from "../../utils/constant";
import type { FC } from "react";

interface EnableInvestorProps {
	id?: string;
	handleConfirm?: () => void;
}

export const TypeOfPayment: FC<EnableInvestorProps> = ({ handleConfirm }) => {
	return (
		<div className="flex  flex-col justify-between w-full h-full gap-10 mt-9">
			<div className="flex items-center gap-8 justify-center flex-col w-full">
				<div className="w-full ">
					<Select
						label="Type of Payment"
						placeholder="Type of Payment"
						options={LEDGER_OPTIONS}
					/>
				</div>

				<div className="w-full flex justify-center items-center gap-5">
					<hr className="w-full"></hr>
					<strong>OR</strong>
					<hr className="w-full"></hr>
				</div>
				<div className="w-full ">
					<Input
						label="Custom Type of Payment"
						placeholder="Enter Custom Type of Payment"
					/>
				</div>
			</div>

			<Button
				className={`bg-primary-500`}
				buttonText="Confirm"
				onClick={(): void => {
					if (handleConfirm) {
						handleConfirm();
					}
				}}
			/>
		</div>
	);
};
