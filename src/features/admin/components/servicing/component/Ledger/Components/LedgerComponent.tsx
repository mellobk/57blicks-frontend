/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type FC, useEffect, useState, useRef } from "react";
import { Modal } from "@/components/ui/Modal";
import {
	ApprovalStateType,
	type LedgersTotals,
	type LedgerFormValues,
	type Ledgers,
	LedgerTypeOfPayment,
} from "../types";
import { useFieldArray } from "react-hook-form";
import { useZodForm } from "../UseZodForm";
import { validationSchema } from "../schema";
import { LedgerAdd } from "./LedgerAdd";
import { Button } from "@/components/ui/Button";
import { TypeOfPayment } from "../../TypeOfPayment/TypeOfPayment";
import { useMutation } from "@tanstack/react-query";
import ManageLedgerService from "@/features/admin/components/servicing/api/ledger";
import { v4 as uuidv4 } from "uuid";
import { dateWithFormat } from "@/utils/formats";
import { calculateBalance } from "../utils/calculate-balance";
import type {
	Loan,
	LoanHistory,
} from "@/features/admin/components/servicing/types/api";
import { toast } from "react-toastify";
import { validateDataLedger } from "../utils/validate-data";
import ManageNotificationService, {
	type UpdateLedgerProps,
} from "@/features/admin/components/notifications/api/notification";
import { getLocalStorage } from "@/utils/local-storage";
import { userName } from "@/utils/constant";
import moment from "moment";
import LedgerFooter1 from "./footer/LedgerFooter1";
import LedgerFooter2 from "./footer/LedgerFooter2";
import Header from "./header";
import ExtendedLoanList from "./ExtendedLoanList";
import { ApprovalLedgerStateType } from "@/types/api/notifications";
import userStore from "@/stores/user-store";
import { RoleType } from "@/types/api/permissions-type";
import LoansService from "@/api/loans";

interface LedgerComponentProps {
	loan: Loan;
	ledgersData?: Array<Ledgers>;
	extended?: Array<LoanHistory>;
	refetchLedgers?: () => void;
	orderLedgers?: (orderBy: string) => void;
	handleDeleteLedger?: (id: string) => void;
	handleRefreshData?: () => void;
}

export const LedgerComponent: FC<LedgerComponentProps> = ({
	loan,
	ledgersData,
	extended,
	refetchLedgers,
	handleDeleteLedger,
	handleRefreshData,
}) => {
	const userInfo = userStore((state) => state.loggedUserInfo);
	const scrollAdd = useRef<null | HTMLElement>(null);
	const localUserName = getLocalStorage(userName);
	const createLedgerQuery = useMutation(async (body: any) => {
		return ManageNotificationService.createNotifications(body);
	});

	const updateLoanQuery = useMutation(async (body: any) => {
		return LoansService.updateLoan(body.id || "", body as any);
	});

	const updateLedgerQuery = useMutation(async (body: UpdateLedgerProps) => {
		return ManageNotificationService.putLedger(body);
	});

	const createNotificationsLedger = (data: LedgerFormValues): void => {
		data.ledgers.map((value) => {
			if (value.typeOfPayment === "Principal") {
				if (userInfo.role?.name === RoleType.SUPER_ADMIN) {
					updateLedgerQuery.mutate({
						id: value.id,
						approvalState: ApprovalLedgerStateType.APPROVED,
						typeOfPayment: LedgerTypeOfPayment.PRINCIPAL,
					} as unknown as UpdateLedgerProps);
				} else {
					const dataNotification = { id: data.loanId, ledgerId: value.id };
					createLedgerQuery.mutate({
						title: "Approve Ledger",
						timestamp: new Date(),
						content: `${localUserName} is creating a Principal payment and needs confirmation.`,
						additionalData: JSON.stringify(dataNotification),
						userFullName: localUserName,
						priority: "HIGH",
						type: "LEDGER",
						roles: ["super-admin"],
					});
				}
			}
		});
	};

	const [openClassModal, setOpenClassModal] = useState<boolean>();
	const [openLedgerData, setLedgerData] = useState<any>();
	const [currentIndex, setCurrentIndex] = useState<number>();
	const [ledgers] = useState<Array<Ledgers>>(ledgersData || []);
	const extendedData = useRef([]);

	useEffect(() => {
		if (updateLedgerQuery.isSuccess) {
			refetchLedgers && refetchLedgers();
			handleRefreshData && handleRefreshData();
		}
		updateLedgerQuery.reset();
	}, [updateLedgerQuery.isSuccess]);

	const createLedger = useMutation(
		(data: LedgerFormValues) => {
			return ManageLedgerService.createLedger(data);
		},
		{
			onSuccess: (data) => {
				if (data) {
					refetchLedgers && refetchLedgers();
					createNotificationsLedger(openLedgerData);
				}
			},
		}
	);

	const [, setTotals] = useState<LedgersTotals>({
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
			ledgersData.forEach((ledger) => {
				append(ledger as never);
				if (ledger.debit) {
					debits += Number(ledger.debit);
				}
				if (ledger.credit) {
					credits += Number(ledger.credit);
				}
			});

			const totals = {
				debits,
				credits,
				balance: ledgersData.at(-1)?.balance || 0,
			};

			setTotals(totals);
		}
	}, [ledgersData]);

	const handleAddRow = (): void => {
		const newRow: Ledgers = {
			id: uuidv4(),
			editable: true,
			new: true,
			approvalState: ApprovalStateType.PENDING,
			order: allFields.ledgers.length + 1,
			action: "add",
		};
		append(newRow as never);
		//append(exampleLedger as never);
	};

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
		if (balance < 0) {
			toast.warn("Balance error!", {
				position: "top-right",
				autoClose: 1000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
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

		const newDate = new Date(value);
		newDate.setMonth(newDate.getMonth());

		setValue(
			`ledgers.${index}.month` as never,
			moment(newDate).format("YYYY-MM-DD") as never
		);
	};

	const handleSetMonth = (name: string, value: Date, index: number): void => {
		setValue(
			`ledgers.${index}.${name}` as never,
			moment(value).format("YYYY-MM-DD") as never
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

	useEffect(() => {}, [extended]);

	useEffect(() => {
		console.log(ledgersData);
		if (createLedger.isSuccess && ledgersData) {
			const dataLedger = ledgersData || [];

			const findConstructionHoldBack = dataLedger?.some(
				(data) => data.typeOfPayment === "Construction Holdback"
			);

			const successCreateLedger = ledgersData || [];

			if (findConstructionHoldBack && createLedger.data) {
				const constructionHoldBacks = successCreateLedger?.filter(
					(value) => value.typeOfPayment === "Construction Holdback"
				);

				const debits = constructionHoldBacks.reduce(
					(accumulator: number, data) =>
						accumulator + Number.parseFloat(data.debit?.toString() || "0"),
					0
				);

				const credits = constructionHoldBacks.reduce(
					(accumulator: number, data) =>
						accumulator + Number.parseFloat(data.credit?.toString() || "0"),
					0
				);

				updateLoanQuery.mutate({
					id: loan?.id || " ",
					constructionHoldback: (debits - credits).toString(),
				});
			}
		}
	}, [createLedger.isLoading, ledgersData]);

	return (
		<div className="h-full w-full">
			<form
				autoComplete="off"
				onSubmit={handleSubmit((data) => {
					//convert  ledgerDate to date
					const validation = validateDataLedger(data.ledgers);
					if (validation !== "") {
						toast.warning("Error: " + validation, {
							position: "top-right",
							autoClose: 2000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "light",
						});
						return;
					}
					const sanedData: LedgerFormValues = {
						ledgers: [],
						loanId: loan?.id || "",
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
					createLedger.mutate({ ...sanedData, loanId: loan?.id || "" });
					setLedgerData({ ...sanedData, loanId: loan.id });
				})}
			>
				<ul
					style={{
						fontSize: "13px",
						overflow: "auto",
						height: "calc(100vh - 300px)",
						marginTop: "50px",
					}}
				>
					<Header />

					{fields.map((field, index) => {
						//if last row then send scroll to bottom
						let lastScrollAdd = null;
						if (index === fields.length - 1) {
							lastScrollAdd = scrollAdd;
							if (lastScrollAdd && lastScrollAdd.current) {
								lastScrollAdd.current.scrollIntoView({
									behavior: "smooth",
									block: "start",
								});
							}
						}

						return (
							<>
								{extended && field.ledgerDate && (
									<>
										<ExtendedLoanList
											extended={extended}
											date={moment(field.ledgerDate, "MMDDYYYY").toDate()}
											extendedData={extendedData}
										/>
									</>
								)}

								<LedgerAdd
									field={field}
									index={index}
									handleRemove={handleRemove}
									data={allFields as unknown as LedgerFormValues}
									loan={loan}
									handleOpenModal={handleOpenModal}
									handleSetValue={handleSetValue}
									handleSetDate={handleSetDate}
									handleSetMonth={handleSetMonth}
									handleEdit={handleEdit}
									handleDeleteLedger={handleDeleteLedger}
									refetchLedgers={refetchLedgers}
									control={control as never}
									errors={errors}
									register={register as never}
									lastScrollAdd={lastScrollAdd}
								/>
							</>
						);
					})}
				</ul>

				{ledgersData && (
					<>
						<LedgerFooter1 ledgers={ledgersData} />
						<LedgerFooter2 ledgers={ledgersData} />
					</>
				)}
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
