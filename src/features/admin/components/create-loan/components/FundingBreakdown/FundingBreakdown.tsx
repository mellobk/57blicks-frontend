import type { FC } from "react";
import { useEffect, useState } from "react";
import {
	type Control,
	type FieldErrors,
	type UseFormSetValue,
	useWatch,
} from "react-hook-form";
import type { TableColumn } from "react-data-table-component";
import { Cell } from "@/components/table/Cell";
import { CellInput } from "@/components/table/CellInput";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Title } from "@/components/ui/Title/Title";
import { Table } from "@/components/ui/Table/Table";
import { Footer } from "@/features/admin/components/create-loan/components/FundingBreakdown/Footer/Footer";
import type {
	FundingBreakdown as FundingBreakdownType,
	Loan,
} from "@/features/admin/components/create-loan/types/fields";
import { LENDERS } from "@/features/admin/components/create-loan/utils/selects";
import { calculateProrated, calculateRegular } from "@/utils/common-functions";
import { validateChangeParticipant } from "./utils/validate-change-participant";

interface Props {
	control: Control<Loan>;
	errors: FieldErrors<Loan>;
	remove: (index: number) => void;
	setOpenLenderModal: (openLenderModal: boolean) => void;
	setOpenParticipantModal: (openParticipantModal: boolean) => void;
	setValue: UseFormSetValue<Loan>;
}

export const FundingBreakdown: FC<Props> = ({
	control,
	errors,
	remove,
	setOpenLenderModal,
	setOpenParticipantModal,
	setValue,
}) => {
	const [error, setError] = useState<string | null>(null);

	const [
		constructionHoldback,
		fundingBreakdown,
		interestRate,
		originationDate,
		participationBreakdown,
		totalLoanAmount,
	] = useWatch({
		control,
		name: [
			"constructionHoldback",
			"fundingBreakdown",
			"interestRate",
			"originationDate",
			"participationBreakdown",
			"totalLoanAmount",
		],
	});

	const totals = [...fundingBreakdown, ...participationBreakdown].reduce(
		(accumulator, row) => {
			if (row) {
				if (row.type !== "YieldSpread" && row.type !== "Servicing") {
					accumulator.amount += Number(row.amount);
				}

				accumulator.constructionHoldback += Number(row.constructionHoldback);
				accumulator.prorated += Number(
					calculateProrated(row.amount, row.rate, originationDate)
				);
				accumulator.rate += Number(row.rate);
				accumulator.regular += Number(calculateRegular(row.amount, row.rate));
			}

			return accumulator;
		},
		{
			amount: 0,
			constructionHoldback: 0,
			prorated: 0,
			rate: 0,
			regular: 0,
		}
	);

	const disabled =
		Number(totalLoanAmount) <= 0 || totals.amount !== Number(totalLoanAmount);

	const disabledConstructionHoldback =
		Number(constructionHoldback) - totals.constructionHoldback !== 0;
	const handleChangeParticipant = (): void => {
		const newParticipationBreakdown = validateChangeParticipant(
			participationBreakdown,
			fundingBreakdown,
			interestRate
		);
		setValue("participationBreakdown", newParticipationBreakdown);
	};

	const columns: Array<TableColumn<FundingBreakdownType>> = [
		{
			cell: (row, rowIndex): React.ReactNode => {
				if (rowIndex === 0) {
					return (
						<button
							data-testid="funding-breakdown-select-lender"
							className="h-full w-full py-3 px-4 bg-white hover:bg-gray-200"
							onClick={(): void => {
								setOpenLenderModal(true);
							}}
							type="button"
						>
							<div className="flex flex-row justify-between items-center">
								{row.lenderName}
								<Icon name="arrowDown" width="6" color="#656A74" />
							</div>
						</button>
					);
				}

				return <Cell format="text" value={row.lenderName} />;
			},
			name: "Lender",
			style: { padding: 0 },
		},
		{
			cell: (row, rowIndex): React.ReactNode => {
				if (row.investorId !== "servicing" && row.type !== "YieldSpread") {
					return (
						<CellInput
							control={control}
							error={
								rowIndex > 1
									? errors?.participationBreakdown?.[rowIndex - 2]?.amount
											?.message
									: errors?.fundingBreakdown?.[rowIndex]?.amount?.message
							}
							format="money"
							onKeyUp={(): void => {
								handleChangeParticipant();
							}}
							name={
								rowIndex > 1
									? `participationBreakdown.${rowIndex - 2}.amount`
									: `fundingBreakdown.${rowIndex}.amount`
							}
						/>
					);
				}

				return <Cell format="money" value={row.amount} />;
			},
			name: "Amount",
			style: { padding: 0 },
		},
		{
			cell: (row, rowIndex): React.ReactNode => {
				if (row.investorId !== "servicing" && row.type !== "YieldSpread") {
					let hasError: string | undefined = undefined;
					setError(null);
					if (Number(row.rate) < 0) {
						hasError = "Negative not allowed";
						setError(hasError);
					}
					if (Number(row.rate) >= Number(interestRate)) {
						hasError = "Higher than interest rate";
						setError(hasError);
					}

					if (row.type === "Investor" && Number(row.rate) <= 0) {
						hasError = "Required";
						setError(hasError);
					}
					return (
						<CellInput
							control={control}
							error={hasError}
							format="percentage"
							onKeyUp={(): void => {
								handleChangeParticipant();
							}}
							name={
								rowIndex > 1
									? `participationBreakdown.${rowIndex - 2}.rate`
									: `fundingBreakdown.${rowIndex}.rate`
							}
						/>
					);
				}
				return <Cell format="percentage" value={row.rate} />;
			},
			name: "Rate",
			style: {
				padding: 0,
			},
		},
		{
			cell: (row: FundingBreakdownType) => (
				<Cell
					format="money"
					value={calculateProrated(row.amount, row.rate, originationDate)}
				/>
			),
			name: "Prorated",
			style: {
				padding: 0,
			},
		},
		{
			cell: (row: FundingBreakdownType) => (
				<Cell format="money" value={calculateRegular(row.amount, row.rate)} />
			),
			name: "Regular",
			style: {
				padding: 0,
			},
		},
		{
			cell: (row, rowIndex): React.ReactNode => {
				if (row.investorId !== "servicing" && row.type !== "YieldSpread") {
					return (
						<CellInput
							control={control}
							error={
								rowIndex > 1
									? errors?.participationBreakdown?.[rowIndex - 2]
											?.constructionHoldback?.message
									: errors?.fundingBreakdown?.[rowIndex]?.constructionHoldback
											?.message
							}
							format="money"
							name={
								rowIndex > 1
									? `participationBreakdown.${
											rowIndex - 2
									  }.constructionHoldback`
									: `fundingBreakdown.${rowIndex}.constructionHoldback`
							}
						/>
					);
				}
				return <Cell format="money" value={row.constructionHoldback} />;
			},
			name: "Construction Holdback",
			style: {
				padding: 0,
			},
		},
		{
			cell: (row, rowIndex) => (
				<>
					{rowIndex > 1 && row.type !== "YieldSpread" && (
						<Button
							className="bg-white px-0 py-2 mr-2"
							icon={<Icon name="trashBin" color="#FF0033" width="24" />}
							onClick={(): void => {
								remove(rowIndex - 2);
							}}
							type="button"
						/>
					)}
				</>
			),
			name: "",
			right: true,
			style: {
				padding: 0,
			},
			width: "48px",
		},
	];

	const canAddParticipant = (): boolean => {
		const lender = fundingBreakdown[0]?.investorId === LENDERS[0]?.code;

		return lender && participationBreakdown.length < 8;
	};

	useEffect(() => {
		setValue("fundingBreakdown.1.amount", totalLoanAmount);
	}, [totalLoanAmount]);

	useEffect(() => {
		setValue(
			"fundingBreakdown.1.rate",
			String(Number(interestRate) - Number(fundingBreakdown?.[0]?.rate || 0))
		);
	}, [fundingBreakdown?.[0]?.rate, interestRate]);

	return (
		<>
			<div className="pt-6">
				<div className="flex flex-row justify-between">
					<Title text="Funding Breakdown" />
					<Button
						data-testid="funding-breakdown-add-participant"
						buttonText={
							<div className="ml-2 font-inter font-semibold text-sm text-primary leading-[17px] tracking-[-0.7px]">
								Add Participant
							</div>
						}
						className="rounded-2xl px-4 h-[34px] bg-gray-200"
						icon={<Icon name="plus" color="#0E2130" width="12" />}
						onClick={(): void => {
							setOpenParticipantModal(true);
						}}
						type="button"
						disabled={!canAddParticipant()}
					/>
				</div>
				<Table
					className="mt-6 rounded-3xl"
					columns={columns}
					data={[...fundingBreakdown, ...participationBreakdown]}
				/>
				<Footer disabled={disabled} totals={totals} />
			</div>
			<div>
				<Button
					buttonText="Save Loan"
					variant={"gold"}
					className="w-full "
					type="submit"
					disabled={disabled || error !== null || disabledConstructionHoldback}
				/>
			</div>
		</>
	);
};
