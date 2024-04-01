/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type FC, useEffect } from "react";
/* import { useMutation } from "@tanstack/react-query"; */
import { Icon } from "@/components/ui/Icon";

import ManageLoanConsultantService from "../../../servicing/api/loan-consultant";
import { useMutation } from "@tanstack/react-query";

interface AddInvestorProps {
	name?: string;
	id?: number;
	handleSuccess?: () => void;
}

export const Consultant: FC<AddInvestorProps> = ({
	id,
	name,
	handleSuccess,
}) => {
	const deleteLoanConsultantMutation = useMutation(() => {
		return ManageLoanConsultantService.deleteLoanConsultant(
			id?.toString() || ""
		);
	});

	useEffect(() => {
		if (deleteLoanConsultantMutation.isSuccess && handleSuccess) {
			handleSuccess();
		}
	}, [deleteLoanConsultantMutation.isLoading]);

	return (
		<div className="flex justify-between items-center w-full gap-2">
			<div>{name}</div>
			<div className="flex gap-1">
				<div
					className="cursor-pointer"
					onClick={() => {
						deleteLoanConsultantMutation.mutate();
					}}
				>
					<Icon name="trashBin" width="20" color="red" />
				</div>
			</div>
		</div>
	);
};
