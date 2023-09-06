import { FC, useEffect, useState } from "react";
import { FieldArrayWithId, UseFormSetValue } from "react-hook-form";
import { Option, Select } from "@/components/forms/Select";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { LoanFields } from "@/features/create-loan/types/fields";
import { lenders } from "@/features/create-loan/utils/selects";

interface Props {
	fields: FieldArrayWithId<LoanFields, "fundingBreakdown">[];
	openModal: boolean;
	setOpenModal: (openModal: boolean) => void;
	setValue: UseFormSetValue<LoanFields>;
}

export const SelectLender: FC<Props> = ({
	fields,
	openModal,
	setOpenModal,
	setValue,
}) => {
	const [selectedLender, setSelectedLender] = useState<Option>();

	useEffect(() => {
		const lender = lenders.find(
			(lender: Option) => lender.code === fields[0]?.lenderId
		);
		setSelectedLender(lender);
	}, []);

	const selectLender = () => {
		if (selectedLender) {
			setValue("fundingBreakdown.0.lender", selectedLender.name);
			setValue("fundingBreakdown.0.lenderId", selectedLender.code);
			setOpenModal(false);
		}
	};

	return (
		<Modal
			onHide={() => setOpenModal(false)}
			title="Select Lender"
			visible={openModal}
		>
			<Select
				className="mt-6"
				label="Lender"
				onChange={(e) => setSelectedLender(e.target.value)}
				options={lenders}
				placeholder="Select Lender"
				value={selectedLender}
				required
			/>
			<Button
				buttonText="Select"
				className="bg-primary-500 w-full mt-6 px-8 py-[11px] font-inter font-semibold text-base text-white leading-[19px] tracking-tighter"
				onClick={selectLender}
			/>
		</Modal>
	);
};
