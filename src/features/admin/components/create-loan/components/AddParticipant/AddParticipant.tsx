/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
	FundingBreakdown,
	Loan,
} from "@/features/admin/components/create-loan/types/fields";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/forms/Dropdown";
import { useEffect, type FC, useState } from "react";
import { FormatInput } from "@/components/forms/FormatInput";
import InvestorsService from "@/api/investors";
import { Modal } from "@/components/ui/Modal";
import type { UseFieldArrayAppend } from "react-hook-form";
import { nameFormat } from "@/utils/formats";
import { useQuery } from "@tanstack/react-query";
import type { Investor } from "@/types/api/investor";

interface Props {
	append: UseFieldArrayAppend<Loan, "participationBreakdown">;
	constructionHoldbackValue: string;
	openModal: boolean;
	setOpenModal: (openModal: boolean) => void;
}

interface Participant {
	constructionHoldback?: string;
	amount?: string;
	participant?: string;
}

export const AddParticipant: FC<Props> = ({
	openModal,
	constructionHoldbackValue,
	append,
	setOpenModal,
}) => {
	const investorsQuery = useQuery(
		["investors-query"],
		() => InvestorsService.getInvestors(),
		{ enabled: openModal }
	);
	const { control, handleSubmit, reset } = useForm<Participant>();
	const [userData, setUserData] = useState<Array<Investor>>([]);

	useEffect(() => {
		if (investorsQuery.data) {
			const filterData = investorsQuery.data.sort((a, b) => {
				// Assuming 'name' is the property by which you want to sort
				const nameA =
					a.user?.entityName ||
					`${a.user?.firstName} ${a.user?.lastName}`.toUpperCase(); // ignore upper and lowercase
				const nameB =
					b.user?.entityName ||
					`${b.user?.firstName} ${b.user?.lastName}`.toUpperCase(); // ignore upper and lowercase
				if (nameA < nameB) {
					return -1; //nameA comes first
				}
				if (nameA > nameB) {
					return 1; // nameB comes first
				}

				// names must be equal
				return 0;
			});

			setUserData(filterData as any);
		}
	}, [investorsQuery.data]);

	const [participant] = useWatch({
		control,
		name: ["participant"],
	});
	const onSubmit = (data: Participant): void => {
		const participant = investorsQuery?.data?.find(
			(participant) => participant.id === data.participant
		);

		if (participant) {
			const lenderName = nameFormat(
				`${
					participant.user?.entityName && participant.user?.entityName !== ""
						? participant.user?.entityName
						: participant.user?.firstName + " " + participant.user?.lastName
				} `
			);

			const newFundingBreakdown: FundingBreakdown = {
				constructionHoldback: data.constructionHoldback || "0",
				amount: data.amount || "0",
				investorId: participant.id,
				lenderName,
				prorated: "0",
				rate: "",
				regular: "0",
				type: "Investor",
			};
			const yieldSpread: FundingBreakdown = {
				constructionHoldback: "0",
				amount: data.amount || "0",
				investorId: participant.id,
				lenderName: `Y/S ${lenderName} `,
				prorated: "0",
				rate: "",
				regular: "0",
				type: "YieldSpread",
			};

			append(newFundingBreakdown);
			append(yieldSpread);
			reset();
			setOpenModal(false);
		}
	};

	return (
		<Modal
			onHide={(): void => {
				setOpenModal(false);
			}}
			title="Select Participant"
			visible={openModal}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Dropdown
					data-testid="add-participant-select"
					control={control}
					className="mt-6"
					label="Participant"
					name="participant"
					options={userData?.map(({ id, user }) => ({
						code: id,
						name: nameFormat(
							`
              ${
								user?.entityName && user?.entityName !== ""
									? user?.entityName
									: user?.firstName + " " + user?.lastName
							}

              `
						),
					}))}
					placeholder="Select Participant"
					required
				/>
				<FormatInput
					control={control}
					format="money"
					label="Amount"
					name="amount"
					wrapperClassName="mt-6"
					required
				/>
				{constructionHoldbackValue &&
					Number.parseInt(constructionHoldbackValue) > 0 && (
						<FormatInput
							control={control}
							format="money"
							label="Construction Holdback"
							name="constructionHoldback"
							wrapperClassName="mt-6"
							required
						/>
					)}

				<Button
					data-testid="add-participant-button"
					buttonText="Add"
					className="bg-primary-500 w-full mt-6 px-8 py-[11px] font-inter font-semibold text-base text-white leading-[19px] tracking-tighter"
					disabled={!participant}
					type="submit"
				/>
			</form>
		</Modal>
	);
};
