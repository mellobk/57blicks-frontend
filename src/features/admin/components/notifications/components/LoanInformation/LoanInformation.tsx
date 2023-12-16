import type {
	Collateral,
	Loan,
} from "@/features/admin/components/servicing/types/api";
import { formatDate, moneyFormat } from "@/utils/formats";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useState } from "react";

import type { FC } from "react";
import { Input } from "@/components/forms/Input";
import { LOAN_TYPES } from "../../../create-loan/utils/selects";
import { LoanCard } from "../LoanCard";
import { LoanLinkCard } from "../LoanLinkCard";
import { Select } from "@/components/forms/Select";
import { useForm } from "react-hook-form";
import userStore from "@/stores/user-store";

interface LoanInformationProps {
	data?: Loan | any;
	edit?: boolean;
	setValidApprove?: (validApprove: boolean) => void;
}

export const LoanInformation: FC<LoanInformationProps> = ({
	data,
	edit,
	setValidApprove,
}) => {
	const userLoggedInfo = userStore((state) => state.loggedUserInfo);
	const [type, setType] = useState<string>(data?.type || "");
	const [loanData, setLoanData] = useState<Loan>(data || []);

	const userEditLoan = userStore((state) => state.setEditLoan);

	useEffect(() => {
		userEditLoan(loanData as any);
	}, [loanData]);

	const {
		register,
		watch,
		setValue,
		formState: { errors },
	} = useForm<any>();

	useEffect(() => {
		if (data) {
			setValue("loanType", data?.type);
			setValue("totalLoanAmount", data?.totalLoanAmount);
			setValue("interestRate", data?.interestRate);
			setValue("prepaymentPenalty", data?.prepaymentPenalty);
			setValue("originationDate", data?.originationDate.toString());
			setValue("maturityDate", data?.maturityDate.toString());
			setValue("constructionHoldBack", data?.constructionHoldback);
			setValue("amountDrawn", data?.amountDrawn);
			setValue("ltv", Number.parseFloat(data?.ltv.toString() || "").toFixed(0));
		}
		setValidApprove && setValidApprove(true);
	}, [data]);

	useEffect(() => {
		if (watch("loanType")) {
			setLoanData((previous) => ({
				...previous,
				type: watch("loanType"),
			}));
		}

		if (watch("totalLoanAmount")) {
			setLoanData((previous) => ({
				...previous,
				totalLoanAmount: watch("totalLoanAmount"),
			}));
		}
		if (watch("interestRate")) {
			setLoanData((previous) => ({
				...previous,
				interestRate: watch("interestRate"),
			}));
		}
		if (watch("prepaymentPenalty")) {
			setLoanData((previous) => ({
				...previous,
				prepaymentPenalty: watch("prepaymentPenalty"),
			}));
		}
		if (watch("originationDate")) {
			setLoanData((previous) => ({
				...previous,
				originationDate: watch("originationDate"),
			}));
		}
		if (watch("maturityDate")) {
			setLoanData((previous) => ({
				...previous,
				maturityDate: watch("maturityDate"),
			}));
		}

		if (watch("constructionHoldBack")) {
			setLoanData((previous) => ({
				...previous,
				constructionHoldback: watch("constructionHoldBack"),
			}));
		}
		if (watch("amountDrawn")) {
			setLoanData((previous) => ({
				...previous,
				amountDrawn: watch("amountDrawn"),
			}));
		}
		if (watch("ltv")) {
			setLoanData((previous) => ({
				...previous,
				ltv: watch("ltv"),
			}));
		}
	}, [
		watch("loanType"),
		watch("totalLoanAmount"),
		watch("interestRate"),
		watch("prepaymentPenalty"),
		watch("originationDate"),
		watch("maturityDate"),
		watch("constructionHoldBack"),
		watch("amountDrawn"),
		watch("ltv"),
	]);

	const setCollateralData = (data: string, index: number, type: string) => {
		const newCollaterals = loanData.collaterals.map(
			(dataCollateral, indexCollateral: number) => {
				if (indexCollateral === index) {
					const collateral = {
						...dataCollateral,
						[type]: data,
					};
					return collateral;
				}
				return dataCollateral;
			}
		);

		setLoanData((previous) => ({
			...previous,
			collaterals: newCollaterals,
		}));
	};
	return (
		<div
			className={` flex  w-full   gap-5 text-gray-1000  justify-center p-[5px] rounded-[16px]  overflow-hidden`}
			style={{ height: "80vh !important" }}
		>
			<div
				className={`w-[33.33%]  border-r border-gray-200 pr-4 ${
					!edit && "opacity-40"
				}`}
			>
				<div className="mb-10 flex gap-2 flex-col">
					{edit ? (
						<Select
							key={"loan-information-loan-type"}
							options={LOAN_TYPES}
							label="Loan Type"
							error={
								errors?.["loanType"] &&
								(errors?.["loanType"]?.message as string)
							}
							placeholder="Select Loan Type"
							register={register("loanType")}
							value={type}
							onChange={(event): void => {
								setType(event.target.value as string);
							}}
							required
						/>
					) : (
						<LoanCard title="Loan Type" text={loanData?.type} />
					)}
				</div>

				<div className="flex gap-2 flex-col">
					{/* 		{edit ? (
						<Input
							type="number"
							error={
								errors?.["totalLoanAmount"] &&
								(errors?.["totalLoanAmount"]?.message as string)
							}
							label="Total Loan Amount"
							placeholder="Enter Total Loan Amount"
							register={register("totalLoanAmount")}
							required
						/>
					) : (
						<LoanCard
							title="Total Loan Amount"
							text={moneyFormat(
								Number.parseInt(loanData?.totalLoanAmount || "")
							)}
						/>
					)} */}

					<LoanCard
						title="Total Loan Amount"
						text={moneyFormat(Number.parseInt(loanData?.totalLoanAmount || ""))}
					/>

					{/* {edit ? (
						<Input
							type="number"
							error={
								errors?.["interestRate"] &&
								(errors?.["interestRate"]?.message as string)
							}
							label="Interest Rate"
							placeholder="Enter Interest Rate"
							register={register("interestRate")}
							required
						/>
					) : (
						<LoanCard
							title="Interest Rate"
							text={`${loanData?.interestRate}%`}
							background
						/>
					)} */}

					<LoanCard
						title="Interest Rate"
						text={`${loanData?.interestRate}%`}
						background
					/>

					{edit ? (
						<Input
							error={
								errors?.["prepaymentPenalty"] &&
								(errors?.["prepaymentPenalty"]?.message as string)
							}
							label="Prepayment Penalty"
							placeholder="Enter Prepayment Penalty"
							register={register("prepaymentPenalty")}
							required
						/>
					) : (
						<LoanCard
							title="Prepayment Penalty"
							text={loanData?.prepaymentPenalty}
						/>
					)}
				</div>
			</div>

			<div
				className={`w-[33.33%] flex gap-2 flex-col ${!edit && "opacity-40"}`}
			>
				{/* 	{edit ? (
					<Input
						type="date"
						error={
							errors?.["originationDate"] &&
							(errors?.["originationDate"]?.message as string)
						}
						label="Origination Date"
						register={register("originationDate")}
						required
					/>
				) : (
					<LoanCard
						title="Origination Date"
						text={formatDate(loanData?.originationDate.toString() || "")}
					/>
				)} */}
				<LoanCard
					title="Origination Date"
					text={formatDate(loanData?.originationDate.toString() || "")}
				/>
				{edit ? (
					<Input
						type="date"
						error={
							errors?.["maturityDate"] &&
							(errors?.["maturityDate"]?.message as string)
						}
						label="Maturity Date"
						register={register("maturityDate")}
						required
					/>
				) : (
					<LoanCard
						title="Maturity Date"
						text={formatDate(loanData?.maturityDate.toString())}
						background
					/>
				)}
				{edit ? (
					<Input
						type="number"
						error={
							errors?.["constructionHoldBack"] &&
							(errors?.["constructionHoldBack"]?.message as string)
						}
						label="Construction Holdback"
						register={register("constructionHoldBack")}
						required
					/>
				) : (
					<LoanCard
						title="Construction Holdback"
						text={moneyFormat(
							Number.parseInt(loanData?.constructionHoldback || "")
						)}
					/>
				)}
				{edit ? (
					<Input
						type="number"
						error={
							errors?.["amountDrawn"] &&
							(errors?.["amountDrawn"]?.message as string)
						}
						label="Amount Drawn"
						register={register("amountDrawn")}
						required
					/>
				) : (
					<LoanCard
						title="Amount Drawn"
						text={moneyFormat(Number.parseInt(loanData?.amountDrawn || ""))}
						background
					/>
				)}
				{edit ? (
					<Input
						type="number"
						error={errors?.["ltv"] && (errors?.["ltv"]?.message as string)}
						label="LTV"
						register={register("ltv")}
						required
					/>
				) : (
					<LoanCard
						title="LTV"
						text={`${Number.parseFloat(loanData?.ltv.toString() || "").toFixed(
							0
						)}%`}
						background
					/>
				)}

				<div>
					{userLoggedInfo?.role?.name === "admin" && (
						<LoanCard title="Comment" text={loanData?.comment} background />
					)}
				</div>
			</div>

			<div
				className={`w-[33.33%]  flex gap-2 flex-col overflow-auto border-l border-gray-200 pl-3.5  ${
					!edit && "opacity-40"
				}`}
			>
				{loanData?.collaterals.map((data: Collateral, index: number) => {
					return (
						<div
							className={`flex flex-col    text-gray-1000  p-[5px] gap-2 border-b border-gray-200`}
						>
							{edit ? (
								<Input
									label="Collateral Address"
									placeholder="Enter Collateral Address"
									value={data?.address}
									onChange={(data) => {
										setCollateralData(data.target.value, index, "address");
									}}
									required
								/>
							) : (
								<LoanCard
									title="Collateral Address"
									text={data?.address}
									background
								/>
							)}

							{edit ? (
								<Input
									type="date"
									label="Insurance Expiration Date"
									required
									value={data?.insuranceExpirationDate.toString()}
									onChange={(data) => {
										setCollateralData(
											data.target.value,
											index,
											"insuranceExpirationDate"
										);
									}}
								/>
							) : (
								<LoanCard
									title="Insurance Expiration Date"
									text={formatDate(data?.insuranceExpirationDate.toString())}
									background
								/>
							)}

							{edit ? (
								<Input
									label="Tax URL"
									value={data?.taxUrl}
									onChange={(data) => {
										setCollateralData(data.target.value, index, "taxUrl");
									}}
									required
								/>
							) : (
								<a
									href={data?.taxUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									<LoanLinkCard
										title="Tax URL"
										text={data?.taxUrl}
										background="#f4f2ec"
										colorIcon="#cda874"
									/>
								</a>
							)}

							{edit ? (
								<Input
									label="Collateral Link (Google Drive)"
									value={data?.link}
									onChange={(data) => {
										setCollateralData(data.target.value, index, "link");
									}}
									required
								/>
							) : (
								<a
									href={data?.taxUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									<LoanLinkCard
										title="Collateral Link (Google Drive)"
										text={data?.link}
										background="#dcefff"
										colorIcon="#0085ff"
									/>
								</a>
							)}

							{edit ? (
								<Input
									label="Asset Class"
									value={data?.assetType}
									onChange={(data) => {
										setCollateralData(data.target.value, index, "assetType");
									}}
									required
								/>
							) : (
								<LoanCard title="Asset Class" text={data?.assetType} />
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};
