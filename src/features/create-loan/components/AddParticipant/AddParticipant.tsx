import { FC, useState } from "react";
import { UseFieldArrayAppend } from "react-hook-form";
import { Option, Select } from "@/components/forms/Select";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Loan } from "@/features/create-loan/types/fields";
import { participants } from "@/features/create-loan/utils/selects";

interface Props {
	append: UseFieldArrayAppend<Loan, "fundingBreakdown">;
	openModal: boolean;
	setOpenModal: (openModal: boolean) => void;
}

export const AddParticipant: FC<Props> = ({
	append,
	openModal,
	setOpenModal,
}) => {
	const [selectedParticipant, setSelectedParticipant] = useState<Option | null>(
		null
	);

	const addParticipant = () => {
		if (selectedParticipant) {
			append({
				amount: 0,
				lender: selectedParticipant.name,
				lenderId: selectedParticipant.code,
				rate: 0,
				type: "participant",
			});
			setSelectedParticipant(null);
			setOpenModal(false);
		}
	};

	return (
		<Modal
			onHide={() => setOpenModal(false)}
			title="Select Participant"
			visible={openModal}
		>
			<Select
				className="mt-6"
				label="Participant"
				onChange={(e) => setSelectedParticipant(e.target.value)}
				options={participants}
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
