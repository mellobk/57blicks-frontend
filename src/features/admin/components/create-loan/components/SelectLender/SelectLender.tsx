import { type FC, useEffect, useState } from "react";
import { type Control, type UseFormSetValue, useWatch } from "react-hook-form";
import { type Option, Select } from "@/components/forms/Select";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type { Loan } from "@/features/admin/components/create-loan/types/fields";
import { LENDERS } from "@/features/admin/components/create-loan/utils/selects";

interface Props {
	control: Control<Loan>;
	openModal: boolean;
	setOpenModal: (openModal: boolean) => void;
	setValue: UseFormSetValue<Loan>;
}

export const SelectLender: FC<Props> = ({
	control,
	openModal,
	setOpenModal,
	setValue,
}) => {
	const [selectedLender, setSelectedLender] = useState<string>();

	const fundingBreakdown = useWatch({
		control,
		name: "fundingBreakdown",
	});

	const selectLender = () => {
		const lender = LENDERS.find(
			(lender: Option) => lender.code === selectedLender
		);

		if (lender) {
			const newFundingBreakdown = [
				{
					amount: "",
					investorId: lender.code,
					lenderName: lender.name,
					prorated: "0",
					rate: "",
					regular: "0",
				},
				{
					amount: "",
					lenderName: "DKC Servicing Fee Income",
					prorated: "0",
					rate: "",
					regular: "0",
				},
			];

			if (lender.code === LENDERS[0]?.code) {
				newFundingBreakdown.push({
					amount: "",
					lenderName: "Yield Spread",
					prorated: "0",
					rate: "",
					regular: "0",
				});
			}

			setValue("fundingBreakdown", [...newFundingBreakdown]);
			setValue("participationBreakdown", []);
			setOpenModal(false);
		}
	};

	useEffect(() => {
		setSelectedLender(fundingBreakdown?.[0]?.investorId);
	}, [fundingBreakdown?.[0]?.investorId]);

	return (
		<Modal
			onHide={() => {
				setOpenModal(false);
			}}
			title="Select Lender"
			visible={openModal}
		>
			<Select
				data-testid="select-lender-select"
				className="mt-6"
				label="Lender"
				onChange={(e) => setSelectedLender(e.target.value)}
				options={LENDERS}
				placeholder="Select Lender"
				value={selectedLender}
				required
			/>
			<Button
				data-testid="select-lender-button"
				buttonText="Select"
				className="bg-primary-500 w-full mt-6 px-8 py-[11px] font-inter font-semibold text-base text-white leading-[19px] tracking-tighter"
				onClick={selectLender}
			/>
		</Modal>
	);
};
