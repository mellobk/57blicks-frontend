import { type FC, useEffect, useState } from "react";

import type { Ledger, LedgerFormValues } from "../types";
import type {
	Control,
	FieldArrayWithId,
	FieldErrors,
	UseFormRegister,
} from "react-hook-form";
import { CellInputDate } from "@/components/table/CellInputDate";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { InputNumber } from "@/components/forms/InputNumber";
import { formatCurrency } from "@/utils/common-funtions";
import { dateWithFormatUS } from "@/utils/formats";

interface LedgerAddProps {
	field: FieldArrayWithId<Ledger>;
	index: number;
	errors: FieldErrors<LedgerFormValues>;
	control: Control<LedgerFormValues>;
	data: LedgerFormValues;
	handleSetValue: (
		field: string,
		value: string | number | boolean,
		index: number
	) => void;
	handleEdit: (
		field: string,
		value: string | number | boolean,
		index: number
	) => void;
	handleDeleteLedger?: (id: string) => void;
	register: UseFormRegister<LedgerFormValues>;
	handleRemove: (index: number, id: string) => void;
	handleOpenModal: (value: boolean, index: number) => void;
}

export const LedgerAdd: FC<LedgerAddProps> = ({
	field,
	index,
	errors,
	control,
	data,
	handleSetValue,
	handleEdit,
	register,
	handleRemove,
	handleOpenModal,
}) => {
	const [dataLedgers, setDataLedgers] = useState<Ledger>();
	// @ts-ignore
	const { editable } = field;

	useEffect(() => {
		if (data) {
			// @ts-ignore
			setDataLedgers({
				...data.ledgers[index],
			});
		}
	}, [data]);

	return (
		<tr
			key={`ledger-${index}`}
			className={`relative border-b border-gray-200 h-12 ${
				dataLedgers && dataLedgers.editable ? "bg-gray-50" : ""
			} `}
		>
			<td style={{ paddingLeft: "20px", width: "150px" }}>
				{editable ? (
					<CellInputDate
						control={control}
						error={
							errors?.ledgers?.[index]?.ledgerDate
								? // @ts-ignore
								  errors?.ledgers?.[index]?.ledgerDate.message
								: ""
						}
						max={10}
						placeholder="MM-DD-YYYY"
						format="date"
						name={`ledgers.${index}.ledgerDate`}
					/>
				) : (
					dataLedgers &&
					dataLedgers.ledgerDate &&
					dateWithFormatUS(dataLedgers.ledgerDate ?? "", "MM-DD-YYYY")
				)}
			</td>
			<td style={{ paddingLeft: "20px", width: "160px" }}>
				<div
					className={`flex justify-between items-center ${
						errors?.ledgers?.[index]?.typeOfPayment
							? "   border-2 border-red-ERROR h-[43px]   "
							: ""
					}`}
				>
					{dataLedgers &&
						dataLedgers.action === "show" &&
						dataLedgers.approvalState === "Pending" && (
							<div className="absolute text-[8px] top-0 w-24  text-red-400">
								Pending
							</div>
						)}
					{editable ? (
						<>
							{dataLedgers && dataLedgers.typeOfPayment ? (
								<div>{dataLedgers.typeOfPayment}</div>
							) : (
								<div className="text-gray-400">Type of Payment</div>
							)}
							<div
								className="cursor-pointer pl-4"
								onClick={(): void => {
									handleOpenModal(true, index);
								}}
							>
								<Icon name="pencil" width="15" color="black" />
							</div>
						</>
					) : (
						<>{dataLedgers && dataLedgers.typeOfPaymentDescription}</>
					)}
				</div>
			</td>
			<td style={{ paddingLeft: "20px", width: "100px" }}>
				<div>
					{dataLedgers && dataLedgers.debit && dataLedgers.debit > 0 ? (
						<Tag variant="success" text="Debit" />
					) : (
						dataLedgers &&
						dataLedgers.credit &&
						dataLedgers.credit > 0 && <Tag variant="danger" text="Credit" />
					)}
				</div>
			</td>
			<td style={{ paddingLeft: "20px", width: "220px" }}>
				{editable ? (
					<input
						{...register(`ledgers.${index}.memo` as const)}
						placeholder="Enter a text.."
						className={`h-full w-full py-3 px-4 bg-transparent ${
							errors?.ledgers?.[index]?.memo ? " border-2 border-red-ERROR" : ""
						} hover:bg-gray-200 focus-visible:border-gold-500 focus-visible:border-2 focus-visible:outline-none items-center font-inter text-[13px] text-primary-300 leading-4 tracking-[-0.65px]`}
						type="text"
					/>
				) : (
					dataLedgers && dataLedgers.memo
				)}
			</td>
			<td style={{ paddingLeft: "20px", width: "220px" }}>
				{editable ? (
					<InputNumber
						{...register(`ledger.${index}.debit` as never)}
						placeholder="Debit"
						defaultValue={dataLedgers ? dataLedgers.debit : 0}
						error={
							errors?.ledgers?.[index]?.debit
								? // @ts-ignore
								  errors?.ledgers?.[index]?.debit.message
								: ""
						}
						customValue={dataLedgers ? dataLedgers.debit : 0}
						handleChange={(value): void => {
							handleSetValue(`debit`, value.toString(), index);
						}}
					/>
				) : (
					dataLedgers &&
					dataLedgers.debit &&
					formatCurrency(dataLedgers.debit || 0)
				)}
			</td>
			<td style={{ paddingLeft: "20px", width: "220px" }}>
				{editable ? (
					<InputNumber
						{...register(`ledger.${index}.credit` as never)}
						placeholder="Credit"
						error={
							errors?.ledgers?.[index]?.credit
								? // @ts-ignore }
								  errors?.ledgers?.[index]?.credit.message
								: ""
						}
						defaultValue={dataLedgers ? dataLedgers.credit : 0}
						customValue={dataLedgers ? dataLedgers.credit : 0}
						handleChange={(value): void => {
							handleSetValue(`credit`, value.toString(), index);
						}}
					/>
				) : (
					dataLedgers &&
					dataLedgers.credit &&
					formatCurrency(dataLedgers.credit || 0)
				)}
			</td>
			<td style={{ paddingLeft: "20px", width: "150px" }}>
				{dataLedgers && dataLedgers.balance
					? formatCurrency(dataLedgers.balance as number)
					: "0.00"}
			</td>
			<td style={{ paddingRight: "30px", width: "80px" }}>
				<div className="flex justify-between items-center gap-6">
					<div
						key={`edit-${index}`}
						onClick={(): void => {
							handleEdit(`editable`, true, index);
						}}
					>
						{
							// @ts-ignore
							dataLedgers && !dataLedgers.edit && (
								<Icon
									name={"pencil"}
									color={dataLedgers.editable ? "red" : "gray"}
									width="14"
								/>
							)
						}
					</div>
					<div
						key={`delete-${index}`}
						onClick={(): void => {
							// @ts-ignore
							handleRemove(index, `${dataLedgers.id}`);
						}}
					>
						<Icon name="trashBin" color="red" width="20" />
					</div>
				</div>
			</td>
		</tr>
	);
};
