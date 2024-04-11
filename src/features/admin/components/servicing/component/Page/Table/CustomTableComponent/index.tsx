/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { useState, type FC, useEffect } from "react";
import { Row } from "primereact/row";
import { compareFormatOriginationDate, moneyFormat } from "@/utils/formats";
import {
	getIsSameMonthYear,
	getIsSamePreviousMonthYear,
	isDateInFuture,
} from "@/utils/common-functions";
import type { FundingBreakdown } from "../../../../types/api";
import moment from "moment";

import { Toggle } from "@/components/ui/Toggle";
import { LoanStatusType } from "@/types/api/notifications";
import {
	currentValuePayableInvestor,
	nextValuePayableInvestor,
} from "../Table";

interface CustomTableComponentProps {
	data: any;
	handleTax: (id: string, data: boolean) => void;
	handleDefault: (id: string, data: string) => void;
	onRowClicked: (row: FundingBreakdown) => void;
	totals: {
		total: number;
		totalRegularLoan: number;
		totalRegular: number;
		totalPrevious: number;
		totalRow: number;
	};
}

interface ServicingTable {
	id: string;
	borrower: string;
	collaterals: string;
	totalLoan: number;
	rate: string;
	regular: string;
	originationDate: string;
	maturityDate?: string;
	insuranceExpirationDate?: string;
	taxesPaid?: string;
	status?: string;
	currentValue?: any;
	nextValue?: any;
	data: any;
}

const borrowerTemplate = (rowData: any) => {
	return (
		<div className="w-[290px] break-words whitespace-normal p-2">
			{rowData.borrower}
		</div>
	);
};

const collateralAddressTemplate = (rowData: any) => {
	return (
		<div className="w-[290px] break-words whitespace-normal p-2">
			{rowData.collaterals}
		</div>
	);
};

const templateTotalLoan = (rowData: any) => {
	return (
		<div className="left-0">
			{moneyFormat(Number.parseInt(rowData.data.loan.principal || ""))}
		</div>
	);
};

const templateRate = (rowData: any) => {
	return `${Number.parseInt(rowData.rate).toFixed(0)}%`;
};

const templateRegularPayment = (rowData: any) => {
	return moneyFormat(Number.parseFloat(rowData.regular || "0"));
};

const templateOriginationDate = (rowData: any) => {
	const dateInt = rowData.originationDate;
	const year = dateInt.slice(0, 4);
	const month = dateInt.slice(4, 6);
	const day = dateInt.slice(6, 8);

	return `${month}-${day}-${year}`;
};

const templateMaturityDate = (rowData: any) => {
	const dateInt = rowData.maturityDate;
	const year = dateInt.slice(0, 4);
	const month = dateInt.slice(4, 6);
	const day = dateInt.slice(6, 8);
	const value = isDateInFuture(`${day}-${month}-${year}`);

	return (
		<div
			style={{
				color: value ? "" : "#fe3d64",
				backgroundColor: value ? "" : "#fbf4f7",
				height: "35px",
				textAlign: "center",
				verticalAlign: "middle",
				paddingTop: "8px",
			}}
		>{`${month}-${day}-${year}`}</div>
	);
};

const templateInsuranceExpirationDate = (rowData: any) => {
	const dateInt = rowData.insuranceExpirationDate;
	const year = dateInt.slice(0, 4);
	const month = dateInt.slice(4, 6);
	const day = dateInt.slice(6, 8);
	const value = isDateInFuture(`${day}-${month}-${year}`);

	return (
		<div
			style={{
				color: value ? "" : "#fe3d64",
				backgroundColor: value ? "" : "#fbf4f7",
				height: "35px",
				textAlign: "center",
				verticalAlign: "middle",
				paddingTop: "8px",
			}}
		>{`${month}-${day}-${year}`}</div>
	);
};

const templateCurrentValue = (rowData: any) => {
	const loanEndDateMoment = moment(rowData.data.loan.endDate).month();
	const loanCurrentMonth = moment().subtract(1, "months").month();

	let value = 0;
	value =
		currentValuePayableInvestor(rowData.data.loan) || rowData.data.loan.regular;

	if (rowData.data?.loan?.status === "DEFAULT") return "Default";

	if (rowData.data.loan.endDate && loanEndDateMoment < loanCurrentMonth) {
		return Number.parseFloat("0");
	}

	if (compareFormatOriginationDate(rowData.data.loan.originationDate)) {
		return Number.parseFloat("0");
	}
	return moneyFormat(value);
};

const templateNextValue = (rowData: any) => {
	const loanEndDateMoment = moment(rowData.data.loan.endDate).month();
	const loanCurrentMonth = moment().month();

	let value =
		nextValuePayableInvestor(rowData.data.loan) || rowData.data.loan.regular;

	if (!value || value === 0) {
		value = getIsSameMonthYear(
			rowData?.data.loan?.originationDate as unknown as string
		)
			? rowData.data.loan.prorated
			: rowData.data.loan.regular;
	}
	if (rowData?.data.loan?.status === "DEFAULT") return "Default";

	if (rowData.data.loan.endDate && loanEndDateMoment < loanCurrentMonth) {
		return Number.parseFloat("0");
	}

	return moneyFormat(Number.parseFloat(value.toString()));
};

const getCurrentValue = (rowData: any) => {
	const data = getIsSamePreviousMonthYear(
		rowData.loan.originationDate as unknown as string
	);
	let value = "0";
	if (data === 0) {
		value = rowData.loan.prorated || "0";
	} else if (data === -1) {
		value = rowData.loan.regular || "0";
	}

	if (rowData?.loan?.status === "DEFAULT") return "Default";

	return Number.parseFloat(value);
};

const getNextValue = (rowData: any) => {
	let data = getIsSameMonthYear(
		rowData.loan.originationDate as unknown as string
	)
		? rowData.loan.prorated
		: rowData.loan.regular;

	if (rowData.loan.status === "DEFAULT") {
		data = /* String((Number(rowData.loan.principal) * 18) / 100 / 12) */ "0";
	}

	if (rowData.loan.endDate) data = "0";

	return Number.parseFloat(data || "0");
};

const CustomTableComponent: FC<CustomTableComponentProps> = ({
	data,
	totals,
	handleTax,
	handleDefault,
	onRowClicked,
}) => {
	const [values, setValues] = useState<Array<ServicingTable>>([]);

	const currentMonthName = moment().add(1, "months").format("MMMM");
	const previousMonthName = moment().format("MMMM");

	useEffect(() => {
		const newValues: Array<ServicingTable> = [];

		data.map((values: any) => {
			newValues.push({
				id: values.loan.id,
				borrower:
					values.loan.borrower.llc ||
					`${values.loan.borrower.user.firstName} ${values.loan.borrower.user.lastName}`,
				collaterals: values?.loan?.collaterals[0]?.address,
				totalLoan: values.loan.totalLoanAmount,
				rate: values?.loan.interestRate,
				regular: values?.loan?.regular || "0",
				originationDate: values?.loan?.originationDate
					.toString()
					.split("-")
					.join(""),
				maturityDate: values.loan.maturityDate.toString().split("-").join(""),
				insuranceExpirationDate:
					values.loan.collaterals[0]?.insuranceExpirationDate
						.toString()
						.split("-")
						.join(""),
				taxesPaid: values.loan.taxesPaid,
				status: values.loan.status,
				currentValue: getCurrentValue(values),
				nextValue: getNextValue(values),
				data: values,
			});
		});
		setValues(newValues);
	}, [data]);

	const templateTaxesPaid = (rowData: any) => {
		return (
			<Toggle
				checked={rowData.taxesPaid}
				onChecked={(data): void => {
					handleTax(rowData.id || "", data.target.checked);
				}}
				checkedClassName="bg-green-500"
				label="Paid"
				labelClassName="text-black text-[13px]"
			/>
		);
	};

	const templateInDefault = (rowData: any) => {
		return (
			<Toggle
				checked={rowData.status === LoanStatusType.DEFAULT}
				onChecked={(): void => {
					if (rowData.status === LoanStatusType.DEFAULT)
						handleDefault(rowData.id || "", LoanStatusType.APPROVED);
				}}
				checkedClassName="bg-orange-500"
				label=""
				labelClassName="text-black text-[13px]"
			/>
		);
	};

	const footerGroup = (
		<ColumnGroup>
			<Row>
				<Column footer="Total:" footerStyle={{ textAlign: "left" }} />
				<Column footer={`${totals.totalRow}`} />
				<Column
					footer={`${moneyFormat(totals.total)}`}
					style={{
						textAlign: "left",
					}}
				/>
				<Column footer={""} />
				<Column
					footer={`${moneyFormat(totals.totalRegularLoan)}`}
					style={{
						textAlign: "left",
					}}
				/>
				<Column footer={""} colSpan={5} />
				<Column
					footer={`${moneyFormat(totals.totalPrevious)}`}
					style={{
						textAlign: "left",
					}}
				/>
				<Column
					footer={`${moneyFormat(totals.totalRegular)}`}
					style={{
						textAlign: "left",
					}}
				/>
			</Row>
		</ColumnGroup>
	);

	const rowClass = (data: ServicingTable) => {
		return {
			"bg-orange-600 text-orange-400 border border-orange-600":
				data.status === LoanStatusType.DEFAULT,
		};
	};

	return (
		<>
			<div>
				<DataTable
					value={values}
					size={"small"}
					rowClassName={rowClass}
					footerColumnGroup={footerGroup}
					scrollable
					resizableColumns
					scrollHeight={"calc(100vh - 150px)"}
					width={"100%"}
					style={{
						fontSize: "14px",
					}}
					selectionMode="single"
					onSelectionChange={(e) => {
						const tagName = e.originalEvent.target;

						const element = tagName.toString();
						if (element !== "[object HTMLSpanElement]") {
							onRowClicked(e.value.data as FundingBreakdown);
						}
					}}
				>
					<Column
						field="borrower"
						header="Borrower"
						body={borrowerTemplate}
						sortable
						style={{
							width: "300px",
						}}
					/>
					<Column
						field="collaterals"
						header="Collateral Address"
						body={collateralAddressTemplate}
						sortable
						style={{
							width: "300px",
						}}
					/>
					<Column
						field="totalLoan"
						header="Total Loan"
						body={templateTotalLoan}
						style={{
							textAlign: "left",
							width: "150px",
						}}
						sortable
					/>
					<Column
						field="rate"
						header="Rate"
						body={templateRate}
						sortable
						style={{
							width: "100px",
						}}
					/>
					<Column
						field="regular"
						header="Regular Payment"
						body={templateRegularPayment}
						sortable
						style={{
							textAlign: "left",
							width: "150px",
						}}
					/>
					<Column
						field="originationDate"
						header="Origination Date"
						body={templateOriginationDate}
						sortable
					/>
					<Column
						field="maturityDate"
						header="Maturity Date"
						body={templateMaturityDate}
						style={{
							width: "150px",
							padding: "0 !important",
							margin: "0 !important",
						}}
						sortable
					/>
					<Column
						field="insuranceExpirationDate"
						header="Insurance Expiration Date"
						body={templateInsuranceExpirationDate}
						sortable
					/>
					<Column
						field="taxesPaid"
						header="Taxes Paid"
						sortable
						body={templateTaxesPaid}
					/>
					<Column
						field="status"
						header="In Default"
						body={templateInDefault}
						sortable
					/>

					<Column
						field="currentValue"
						header={`${previousMonthName} (Current)`}
						sortable
						body={templateCurrentValue}
						style={{
							width: "150px",
							color: "#C79E63",
							textAlign: "left",
							backgroundColor: "#C79E631F",
						}}
					/>
					<Column
						field="nextValue"
						header={`${currentMonthName}`}
						sortable
						body={templateNextValue}
						style={{
							minWidth: "150px",
							color: "#C79E63",
							textAlign: "left",
							backgroundColor: "#C79E631F",
						}}
					/>
				</DataTable>
			</div>
		</>
	);
};

export default CustomTableComponent;
