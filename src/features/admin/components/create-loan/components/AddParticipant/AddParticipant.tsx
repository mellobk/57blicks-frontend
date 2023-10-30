import { type FC, useState } from "react";
import type { UseFieldArrayAppend } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import InvestorsService from "@/api/investors.ts";
import { Select } from "@/components/forms/Select";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type { Loan } from "@/features/admin/components/create-loan/types/fields.ts";
import { nameFormat } from "@/utils/formats.ts";

interface Props {
	append: UseFieldArrayAppend<Loan, "participationBreakdown">;
	openModal: boolean;
	setOpenModal: (openModal: boolean) => void;
}

export const AddParticipant: FC<Props> = ({
	append,
	openModal,
	setOpenModal,
}) => {
	const [selectedParticipant, setSelectedParticipant] = useState<string>();

	const investorsQuery = useQuery(
		["investors-query"],
		() => InvestorsService.getInvestors(),
		{ enabled: openModal }
	);

	const addParticipant = () => {
		const participant = investorsQuery?.data?.find(
			(participant) => participant.id === selectedParticipant
		);

		if (participant) {
			append({
				amount: "",
				investorId: participant.id,
				lenderName: nameFormat(
					`${participant.user?.firstName} ${participant.user?.lastName}`
				),
				prorated: "0",
				rate: "",
				regular: "0",
			});
			setSelectedParticipant("");
			setOpenModal(false);
		}
	};

	return (
		<Modal
			onHide={() => {
				setOpenModal(false);
			}}
			title="Select Participant"
			visible={openModal}
		>
			<Select
				className="mt-6"
				label="Participant"
				onChange={(e) => {
					setSelectedParticipant(e.target.value);
				}}
				options={investorsQuery?.data?.map(({ id, user }) => ({
					code: id,
					name: nameFormat(`${user?.firstName} ${user?.lastName}`),
				}))}
				placeholder="Select Participant"
				required
			/>
			<Button
				buttonText="Add"
				className="bg-primary-500 w-full mt-6 px-8 py-[11px] font-inter font-semibold text-base text-white leading-[19px] tracking-tighter"
				onClick={addParticipant}
			/>
		</Modal>
	);
};
