import { type FC } from "react";
import type { UseFieldArrayAppend } from "react-hook-form";
import { useForm, useWatch } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import InvestorsService from "@/api/investors";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type {
	FundingBreakdown,
	Loan,
} from "@/features/admin/components/create-loan/types/fields";
import { nameFormat } from "@/utils/formats";
import { FormatInput } from "@/components/forms/FormatInput";
import { Dropdown } from "@/components/forms/Dropdown";

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

	const [constructionHoldback, participant, amount] = useWatch({
		control,
		name: ["constructionHoldback", "participant", "amount"],
	});

	const onSubmit = (data: Participant): void => {
		const participant = investorsQuery?.data?.find(
			(participant) => participant.id === data.participant
		);

		if (participant) {
			const newFundingBreakdown: FundingBreakdown = {
				constructionHoldback: data.constructionHoldback || "0",
				amount: data.amount || "0",
				investorId: participant.id,
				lenderName: nameFormat(
					`${participant.user?.firstName} ${participant.user?.lastName}`
				),
				prorated: "0",
				rate: "",
				regular: "0",
				type: "Investor",
				servicing: false,
			};
			const yieldSpread: FundingBreakdown = {
				constructionHoldback: "0",
				amount: data.amount || "0",
				investorId: participant.id,
				lenderName: "Y/S",
				prorated: "0",
				rate: "",
				regular: "0",
				type: "YieldSpread",
				servicing: false,
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
					options={investorsQuery?.data?.map(({ id, user }) => ({
						code: id,
						name: nameFormat(`${user?.firstName} ${user?.lastName}`),
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
