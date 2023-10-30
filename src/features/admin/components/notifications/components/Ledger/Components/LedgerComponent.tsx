import { type FC, useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import type { LedgerFormValues, Ledgers } from "../types";
import { useFieldArray } from "react-hook-form";
import { useZodForm } from "../UseZodForm";
import { validationSchema } from "../schema";
import { LedgerAdd } from "./LedgerAdd";

import { useMutation } from "@tanstack/react-query";
import ManageLedgerService from "@/features/admin/components/servicing/api/ledger";

import { Icon } from "@/components/ui/Icon";
import { dateWithFormat, moneyFormat } from "@/utils/formats";
import { calculateBalance } from "../utils/calculate-balance";
import { TypeOfPayment } from "@/features/admin/components/servicing/component/TypeOfPayment/TypeOfPayment";

interface LedgerComponentProps {
	loan?: string;
	ledgersData?: Array<Ledgers>;
	refetchLedgers?: () => void;
	orderLedgers?: (orderBy: string) => void;
	handleDeleteLedger?: (id: string) => void;
}

export const LedgerComponent: FC<LedgerComponentProps> = ({
	loan,
	ledgersData,
	orderLedgers,
	refetchLedgers,
	handleDeleteLedger,
}) => {
	const [openClassModal, setOpenClassModal] = useState<boolean>();
	const [currentIndex, setCurrentIndex] = useState<number>();
	const [ledgers] = useState<Array<Ledgers>>(ledgersData || []);

	const createLedger = useMutation(
		(data: LedgerFormValues) => {
			return ManageLedgerService.createLedger(data);
		},
		{
			onSuccess: (data) => {
				if (data) {
					refetchLedgers && refetchLedgers();
				}
			},
		}
	);

	const [totals, setTotals] = useState({
		debits: 0,
		credits: 0,
		balance: 0,
	});

	const {
		handleSubmit,
		register,
		watch,
		setValue,
		getValues,
		control,
		formState: { errors },
	} = useZodForm({
		schema: validationSchema,
		// @ts-ignore
		defaultValues: { ledgers },
		mode: "onChange",
	});

	const allFields = watch();

	useEffect(() => {}, [errors]);

	const { fields, append, remove } = useFieldArray({
		name: "ledgers",
		control,
	});

	const handleRemove = (index: number, id: string): void => {
		const action = getValues(`ledgers.${index}.action` as never);
		if (action !== "add") handleDeleteLedger && handleDeleteLedger(id);
		remove(index);
	};

	useEffect(() => {
		remove();
		if (ledgersData && ledgersData.length > 0) {
			let debits = 0;
			let credits = 0;
			let balance = 0;
			ledgersData.forEach((ledger) => {
				append(ledger as never);
				if (ledger.debit) {
					debits += Number(ledger.debit);
				}
				if (ledger.credit) {
					credits += Number(ledger.credit);
				}
				if (ledger.balance) {
					balance = Number(ledger.balance);
				}
			});
			const totals = {
				debits,
				credits,
				balance,
			};

			setTotals(totals);
		}
	}, [ledgersData]);

	const handleOpenModal = (open: boolean, id: number): void => {
		setCurrentIndex(id);
		setOpenClassModal(open);
	};

	const handleTotals = (): void => {
		const { debits, credits, balance } = calculateBalance(allFields.ledgers);

		const totals = {
			debits,
			credits,
			balance,
		};
		setTotals(totals);
	};

	const handleSetValue = (
		name: string,
		value: string | number | boolean,
		index: number
	): void => {
		setValue(`ledgers.${index}.${name}` as never, value as never);
		if (name === "credit") {
			setValue(`ledgers.${index}.debit` as never, 0 as never);
			setValue(`ledgers.${index}.type` as never, "Credit" as never);
		} else if (name === "debit") {
			setValue(`ledgers.${index}.credit` as never, 0 as never);
			setValue(`ledgers.${index}.type` as never, "Debit" as never);
		}
		append({} as never);
		remove(allFields.ledgers.length);
		handleTotals();
	};

	const handleSetDate = (name: string, value: Date, index: number): void => {
		setValue(
			`ledgers.${index}.${name}` as never,
			dateWithFormat(value.toISOString(), "MMDDYYYY") as never
		);
	};

	const handleEdit = (
		name: string,
		value: string | number | boolean,
		index: number
	): void => {
		setValue(`ledgers.${index}.${name}` as never, value as never);
		setValue(`ledgers.${index}.action` as never, "edit" as never);
		append({} as never);
		remove(allFields.ledgers.length);
		handleTotals();
	};

	useEffect(() => {
		handleTotals();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ledgers]);

	useEffect(() => {}, [allFields]);

	return (
		<div className="h-full w-full opacity-40">
			<form
				autoComplete="off"
				onSubmit={handleSubmit((data) => {
					//convert  ledgerDate to date
					const sanedData: LedgerFormValues = {
						ledgers: [],
						loanId: loan,
					};
					data.ledgers.forEach((ledger) => {
						if (ledger.editable) {
							const date = ledger.ledgerDate;
							const year = date.slice(4);
							const month = date.slice(0, 2);
							const day = date.slice(2, 4);
							sanedData.ledgers.push({
								...ledger,
								ledgerDate: `${year}-${month}-${day}`,
							});
						}
					});

					createLedger.mutate({ ...sanedData, loanId: loan });
				})}
			>
				<div
					className="h-full w-full rounded-xl bg-white flex flex-col justify-between "
					style={{ overflow: "overlay" }}
				>
					<table>
						<thead className="bg-gray-200 h-10">
							<tr className="bg-gray-200 text-[12px] border-2 items-start 	 ">
								<td className="font-semibold text-gray-600 pl-4">
									<div
										onClick={(): void => {
											orderLedgers && orderLedgers("date");
										}}
										className=""
									>
										Date
									</div>
								</td>
								<td className="font-semibold text-gray-600 pl-4">Class</td>
								<td className="font-semibold text-gray-600 pl-4">
									Debit/Credit
								</td>
								<td className="font-semibold text-gray-600 pl-4">Memo</td>
								<td className="font-semibold text-gray-600 pl-4">
									<div className="flex flex-row gap-2  align-middle">
										Debit
										<div className="pt-1">
											<Icon name="debit" width="10" color="grey" />
										</div>
									</div>
								</td>
								<td className="font-semibold text-gray-600 pl-4">
									<div className="flex flex-row gap-2  align-middle">
										Credit
										<div className="pt-1">
											<Icon name="credit" width="10" color="grey" />
										</div>
									</div>
								</td>
								<td className="font-semibold text-gray-600 pl-4">Balance</td>
							</tr>
						</thead>
						<tbody>
							{fields.map((field, index) => {
								return (
									<>
										<LedgerAdd
											field={field}
											index={index}
											handleRemove={handleRemove}
											data={allFields as unknown as LedgerFormValues}
											handleOpenModal={handleOpenModal}
											handleSetValue={handleSetValue}
											handleSetDate={handleSetDate}
											handleEdit={handleEdit}
											handleDeleteLedger={handleDeleteLedger}
											control={control as never}
											errors={errors}
											register={register as never}
										/>
									</>
								);
							})}
							<tr>
								<td colSpan={9}>&nbsp;</td>
							</tr>
							<tr>
								<td colSpan={9}>&nbsp;</td>
							</tr>
						</tbody>
					</table>
					<div className="w-[98%] absolute bottom-[5px] rounded-xl">
						<table className="w-full  rounded-xl bg-white flex flex-col justify-between  ">
							<tfoot className="bg-gray-200 h-10 ">
								<tr>
									<td
										style={{
											width: "180px",
											paddingLeft: "20px",
										}}
									></td>
									<td
										style={{
											width: "160px",
											paddingLeft: "20px",
											verticalAlign: "middle",
											textAlign: "center",
											paddingTop: "5px",
										}}
									>
										Totals: {allFields.ledgers.length}
									</td>
									<td style={{ width: "100px", paddingLeft: "20px" }}></td>
									<td style={{ width: "230px", paddingLeft: "20px" }}></td>
									<td style={{ width: "260px", paddingLeft: "20px" }}>
										{moneyFormat(totals.debits) || "$ 0"}
									</td>
									<td style={{ width: "220px", paddingLeft: "20px" }}>
										{moneyFormat(totals.credits) || "$ 0"}
									</td>
									<td style={{ width: "150px", paddingLeft: "20px" }}>
										{moneyFormat(totals.balance) || "$ 0"}
									</td>
									<td style={{ width: "10px" }}></td>
								</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</form>
			<Modal
				visible={openClassModal}
				title="Type of Payment"
				width="700px"
				onHide={(): void => {
					setOpenClassModal(false);
				}}
			>
				<TypeOfPayment
					handleConfirm={(typeOfPayment, typeOfPaymentDescription): void => {
						setValue(
							`ledgers.${currentIndex}.typeOfPayment` as never,
							typeOfPayment as never
						);
						setValue(
							`ledgers.${currentIndex}.typeOfPaymentDescription` as never,
							typeOfPaymentDescription as never
						);
						setOpenClassModal(false);
					}}
				/>
			</Modal>
		</div>
	);
};
