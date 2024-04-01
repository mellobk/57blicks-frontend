import type {
	Collateral,
	Loan,
} from "@/features/admin/components/servicing/types/api";
import {
	ASSET_TYPES,
	LEAD_SOURCES,
	LOAN_TYPES,
} from "../../../create-loan/utils/selects";
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
import { LoanCard } from "../LoanCard";
import { LoanLinkCard } from "../LoanLinkCard";
import { Select } from "@/components/forms/Select";
import { useForm } from "react-hook-form";
import userStore from "@/stores/user-store";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { CreateLoanConsultant } from "../../../create-loan/components/CreateLoanConsultant/CreateLoanConsultant";
import ManageLoanConsultantService from "../../../servicing/api/loan-consultant";
import { useQuery } from "@tanstack/react-query";
import { Dropdown } from "@/components/forms/Dropdown";

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
	const [openCreateLoanConsultant, setOpenCreateLoanConsultant] =
		useState<boolean>(false);
	const [getAllConsultants, setGetAllConsultants] = useState<
		Array<{
			code: string;
			id: number;
			name: string;
		}>
	>();
	const userLoggedInfo = userStore((state) => state.loggedUserInfo);
	const [type, setType] = useState<string>(data?.type || "");
	const [loanData, setLoanData] = useState<Loan>(data || []);

	const userEditLoan = userStore((state) => state.setEditLoan);

	useEffect(() => {
		userEditLoan(loanData as any);
	}, [loanData]);

	const loanConsultantQuery = useQuery(
		["all-loan-consultants-loan"],
		() => {
			return ManageLoanConsultantService.getAllLoansConsultants();
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	useEffect(() => {
		const consultantsOptions: any = loanConsultantQuery?.data
			?.data as unknown as Array<{ name: string }>;

		setGetAllConsultants(
			consultantsOptions?.map((data: { name: any }) => {
				return { code: data.name, name: data.name };
			})
		);
	}, [loanConsultantQuery.isFetching]);

	const {
		register,
		watch,
		setValue,
		control,
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
			setValue("loanConsultant", data?.loanConsultant);
			setValue("ltv", Number.parseFloat(data?.ltv.toString() || "").toFixed(0));
		}
		setValidApprove && setValidApprove(true);
	}, [data]);

	const [accountData, setAccountData] = useState<string>(
		loanData?.leadSource || ""
	);

	const [loanConsultantData, setLoanConsultantData] = useState<string>(
		loanData?.loanConsultant || ""
	);

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
		if (watch("loanConsultant")) {
			setLoanData((previous) => ({
				...previous,
				loanConsultant: watch("loanConsultant"),
			}));
		}
		if (watch("leadSource")) {
			setLoanData((previous) => ({
				...previous,
				leadSource:
					LEAD_SOURCES.find(
						(data) => data.name === (watch("leadSource") as string)
					)?.code || "",
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
		watch("leadSource"),
		watch("loanConsultant"),
	]);

	useEffect(() => {
		if (getAllConsultants) {
			const filterData = getAllConsultants.sort((a, b) => {
				// Assuming 'name' is the property by which you want to sort
				const nameA = a.code.toLowerCase(); // ignore upper and lowercase
				const nameB = b.code.toLowerCase(); // ignore upper and lowercase
				if (nameA < nameB) {
					return -1; //nameA comes first
				}
				if (nameA > nameB) {
					return 1; // nameB comes first
				}

				// names must be equal
				return 0;
			});

			setGetAllConsultants(filterData as any);
		}
	}, [getAllConsultants]);

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
					<div className="w-full">
						{edit ? (
							/* 	<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6">
								<Select
									register={register("loanConsultant")}
									className="flex flex-col gap-2 w-full"
									label="Loan Consultant"
									placeholder="Select Loan Consultant"
									value={loanConsultantData}
									options={getAllConsultants}
									onChange={(event): void => {
										setLoanConsultantData(event.target.value as string);
										setValue("loanConsultant", event.target.value);
									}}
								/>
								<Input
									data-testid="loan-information-loan-consultant"
									error={errors?.["loanConsultant"]?.message}
									label="Loan Consultant"
									placeholder="Enter Loan Consultant"
									register={register("loanConsultant")}
									wrapperClassName="mt-6"
									required
								/>
								<div
									style={{
										background: "transparent",
										width: "25px",
										height: "25px",
										borderRadius: "60px",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										marginBottom: "8px",
										cursor: "pointer",
									}}
								>
										<div
										onClick={() => {
											setOpenCreateLoanConsultant(true);
										}}
									>
										<Icon name="plus" width="15" />
									</div>
								</div>
							</div> */
							<Input
								data-testid="loan-information-loan-consultant"
								error={errors?.["loanConsultant"]?.message}
								label="Loan Consultant"
								placeholder="Enter Loan Consultant"
								register={register("loanConsultant")}
								wrapperClassName="mt-6"
								required
							/>
						) : (
							<LoanCard
								title="Loan Consultant "
								text={loanData?.loanConsultant}
								background
							/>
						)}
					</div>
					{edit ? (
						<Select
							register={register("leadSource")}
							className="flex flex-col gap-2"
							label="Lead Origin"
							placeholder="Select Lead Origin"
							value={accountData}
							options={LEAD_SOURCES}
							onChange={(event): void => {
								setAccountData(event.target.value as string);
								setValue("leadSource", event.target.value);
							}}
						/>
					) : (
						/* 		<Input
							type="text"
							error={
								errors?.["leadSource"] &&
								(errors?.["leadSource"]?.message as string)
							}
							label="Lead Origin"
							register={register("leadSource")}
							required
						/> */
						<LoanCard
							title="Lead Origin"
							text={
								LEAD_SOURCES.find((data) => data.code === accountData)?.name
							}
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
								<a href={data?.link} target="_blank" rel="noopener noreferrer">
									<LoanLinkCard
										title="Collateral Link (Google Drive)"
										text={data?.link}
										background="#dcefff"
										colorIcon="#0085ff"
									/>
								</a>
							)}

							{edit ? (
								<Select
									className="flex flex-col gap-2 q"
									label="Asset Type"
									placeholder="Select Asset Type"
									value={data?.assetType}
									options={ASSET_TYPES}
									onChange={(data): void => {
										setCollateralData(data.target.value, index, "assetType");
									}}
									required
								/>
							) : (
								<LoanCard title="Asset Type" text={data?.assetType} />
							)}
						</div>
					);
				})}
			</div>

			<Modal
				visible={openCreateLoanConsultant}
				onHide={() => {
					setOpenCreateLoanConsultant(false);
					void loanConsultantQuery.refetch();
				}}
				title="Create Loan Consultant"
				width="450px"
			>
				<CreateLoanConsultant />
			</Modal>
		</div>
	);
};
