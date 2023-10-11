/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type FC, useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import {
	ApprovalStateType,
	type LedgerFormValues,
	type Ledgers,
} from "../types";
import { useFieldArray } from "react-hook-form";
import { useZodForm } from "../UseZodForm";
import { validationSchema } from "../schema";
import { LedgerAdd } from "./LedgerAdd";
import { Button } from "@/components/ui/Button";
import { TypeOfPayment } from "../../TypeOfPayment/TypeOfPayment";
import { formatCurrency } from "@/utils/common-funtions";
import { useMutation } from "@tanstack/react-query";
import ManageLedgerService from "@/features/servicing/api/ledger";
import { v4 as uuidv4 } from "uuid";
interface LedgerComponentProps {
	loan?: string;
	ledgersData?: Array<Ledgers>;
}

export const LedgerComponent: FC<LedgerComponentProps> = ({
	loan,
	ledgersData,
}) => {
	const [openClassModal, setOpenClassModal] = useState<boolean>();
	const [currentIndex, setCurrentIndex] = useState<number>();
	const [ledgers] = useState<Array<Ledgers>>(ledgersData || []);

	const createLedger = useMutation(
		(data: LedgerFormValues) => {
			return ManageLedgerService.createLedger(data);
		},
		{
			onSuccess: () => {
				//remove all rews
				remove();
			},
			onError: (error) => {
				console.log("🚀 ~ file: LedgerComponent.tsx:50 ~ error:", error);
				// setErrorMessage(`${error.response.data.message}`);
				// setTimeout(() => {
				// 	clearErrorMessage();
				// }, 500);
			},
		}
	);

	const [totals, setTotals] = useState({
		debits: 0,
		credits: 0,
		balances: 0,
	});

	const {
		handleSubmit,
		register,
		watch,
		setValue,
		control,
		formState: { errors },
		reset,
	} = useZodForm({
		schema: validationSchema,
		// @ts-ignore
		defaultValues: { ledgers },
		mode: "onChange",
	});

	const allFields = watch();

	useEffect(() => {
		console.log("🚀 ~ file: LedgerComponent.tsx:73 ~ errors:", errors);
	}, [errors]);

	const { fields, append, remove } = useFieldArray({
		name: "ledgers",
		control,
	});

	const handleRemove = (index: number): void => {
		remove(index);
	};

	useEffect(() => {
		remove();
		if (ledgersData && ledgersData.length > 0) {
			let debits = 0;
			let credits = 0;
			let balances = 0;
			ledgersData.forEach((ledger) => {
				append(ledger as never);
				if (ledger.debit) {
					debits += Number(ledger.debit);
				}
				if (ledger.credit) {
					credits += Number(ledger.credit);
				}
				if (ledger.balance) {
					balances += Number(ledger.balance);
				}

				const totals = {
					debits,
					credits,
					balances,
				};
				setTotals(totals);
			});
		}
	}, [ledgersData]);
	useEffect(() => {
		handleTotals();
	}, [ledgers]);

	const handleAddRow = (): void => {
		const newRow: Ledgers = {
			id: uuidv4(),
			editable: true,
			new: true,
			approvalState: ApprovalStateType.PENDING,
			order: allFields.ledgers.length + 1,
		};
		append(newRow as never);
		//append(exampleLedger as never);
	};

	const handleOpenModal = (open: boolean, id: number): void => {
		setCurrentIndex(id);
		setOpenClassModal(open);
	};

	const handleTotals = (): void => {
		let debits = 0;
		let credits = 0;
		let balances = 0;

		allFields.ledgers.forEach((row) => {
			if (row.debit) {
				debits += Number(row.debit);
			}
			if (row.credit) {
				credits += Number(row.credit);
			}
			if (row.balance) {
				balances += Number(row.balance);
			}
		});

		const totals = {
			debits,
			credits,
			balances,
		};
		setTotals(totals);
	};

	const handleSetValue = (name: string, value: string, index: number): void => {
		setValue(`ledgers.${index}.${name}` as never, value as never);
		if (name === "credit") {
			setValue(`ledgers.${index}.debit` as never, 0 as never);
			setValue(`ledgers.${index}.type` as never, "Credit" as never);
		} else if (name === "debit") {
			setValue(`ledgers.${index}.credit` as never, 0 as never);
			setValue(`ledgers.${index}.type` as never, "Debit" as never);
		}
		setValue(
			`ledgers.${index}.balance` as never,
			Number.parseInt(value) as never
		);

		handleTotals();
	};

	useEffect(() => {}, [allFields]);

	return (
		<div className="h-full w-full">
			<form
				autoComplete="off"
				onSubmit={handleSubmit((data) => {
					//convert  ledgerDate to date
					const sanedData: LedgerFormValues = {
						ledgers: [],
						loan: loan,
					};
					data.ledgers.forEach((ledger) => {
						if (ledger.editable) {
							const date = ledger.ledgerDate;
							const year = date.slice(4);
							const month = date.slice(0, 2);
							const day = date.slice(2, 4);
							sanedData.ledgers.push({
								...ledger,
								ledgerDate: `${month}-${day}-${year}`,
							});
						}
					});

					createLedger.mutate({ ...sanedData, loan: loan });
					reset(data);
				})}
			>
				<div
					className="h-full w-full rounded-xl bg-white flex flex-col justify-between "
					style={{ overflow: "overlay" }}
				>
					<table>
						<thead className="bg-gray-200 h-10">
							<tr className="bg-gray-200 text-[12px] border-2">
								<th className="font-semibold text-gray-600">Date </th>
								<th className="font-semibold text-gray-600">Class</th>
								<th className="font-semibold text-gray-600">Debit/Credit</th>
								<th className="font-semibold text-gray-600">Memo</th>
								<th className="font-semibold text-gray-600">Debit</th>
								<th className="font-semibold text-gray-600">Credit</th>
								<th className="font-semibold text-gray-600">Balance</th>
								<th className="font-semibold text-gray-600">Delete</th>
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
											control={control as never}
											errors={errors}
											register={register as never}
										/>
									</>
								);
							})}
						</tbody>
					</table>
					<div className="absolute bottom-[5px]">
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
										{formatCurrency(totals.debits) || "$ 0"}
									</td>
									<td style={{ width: "220px", paddingLeft: "20px" }}>
										{formatCurrency(totals.credits) || "$ 0"}
									</td>
									<td style={{ width: "150px", paddingLeft: "20px" }}>
										{formatCurrency(totals.balances) || "$ 0"}
									</td>
									<td style={{ width: "80px" }}></td>
								</tr>
							</tfoot>
						</table>
					</div>
				</div>

				<Button
					variant={"gray"}
					className="absolute top-[25px] right-[102px]"
					type="submit"
				>
					Save
				</Button>
				<Button
					variant={"gold"}
					type="button"
					className="absolute top-[25px] right-[172px]"
					onClick={handleAddRow}
				>
					Add row
				</Button>
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
