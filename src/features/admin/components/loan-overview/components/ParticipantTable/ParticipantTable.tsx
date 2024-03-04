/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, type FC } from "react";
import {
	Column,
	type ColumnEvent,
	type ColumnEditorOptions,
} from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { moneyFormat } from "@/utils/formats";
import { DataTable } from "primereact/datatable";
import type {
	IParticipantOverview,
	UpdateParticipationBreakdownDto,
} from "../../types/fields";
import { isPositiveInteger } from "@/utils/number";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTrustUnallocated } from "../../api/loan-overview";
import useToast from "@/hooks/use-toast";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";

type Props = {
	participants: Array<IParticipantOverview>;
};

const monetaryBodyTemplate = (
	rowData: IParticipantOverview,
	field: keyof IParticipantOverview
) => {
	return moneyFormat(rowData[field] as number);
};

export const ParticipantTable: FC<Props> = ({ participants }) => {
	const [openParticipantModal, setOpenParticipantModal] = useState(false);
	const [loanParticipants, setLoansParticipants] = useState([]);
	const queryClient = useQueryClient();
	const notify = useToast();

	const updateMutation = useMutation(
		({ id, body }: { id: string; body: UpdateParticipationBreakdownDto }) =>
			updateTrustUnallocated(id, body),
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ["loanOverview"] });
				notify("Trust unallocated updated successfully", "success");
			},
		}
	);

	const priceEditor = (options: ColumnEditorOptions) => {
		return (
			<InputNumber
				inputClassName="w-full h-full outline-none rounded-none border-gold	shadow-none w-full border-2	br-0 focus:bg-gray-200 h-[42px]"
				value={options.value}
				onValueChange={(event) => {
					options.editorCallback?.(event.value);
				}}
				mode="currency"
				currency="USD"
				locale="en-US"
			/>
		);
	};

	const onCellEditComplete = (event: ColumnEvent) => {
		const { rowData, newValue, field } = event;

		if (isPositiveInteger(newValue)) {
			rowData[field] = newValue;

			const updatePayload: UpdateParticipationBreakdownDto = {
				trustUnallocated: newValue,
			};
			updateMutation.mutate({ id: rowData.id, body: updatePayload });
		}
	};

	return (
		<>
			<DataTable
				value={participants}
				editMode="cell"
				className="p-3"
				stripedRows
				scrollable
				scrollHeight="400px"
			>
				<Column
					field="name"
					header="Loan"
					filter
					body={(rowData) => {
						const participants = rowData.participants.filter(
							(data: { type: string; investor: any }) =>
								data.type === "Investor"
						);
						console.log(participants);

						return (
							<div className="flex justify-center items-center gap-2">
								<div>{rowData.name}</div>
								<div
									className="cursor-pointer"
									onClick={() => {
										setOpenParticipantModal(true);
										setLoansParticipants(participants);
									}}
								>
									<Icon name="user" color="black" width="15" />
								</div>
							</div>
						);
					}}
				/>
				<Column
					sortable
					field="totalLoans"
					header="Total Loans"
					body={(rowData) =>
						monetaryBodyTemplate(rowData as IParticipantOverview, "totalLoans")
					}
				/>
				<Column
					sortable
					field="totalDrawnToDate"
					header="Total Drawn to Date"
					body={(rowData) =>
						monetaryBodyTemplate(
							rowData as IParticipantOverview,
							"totalDrawnToDate"
						)
					}
				/>
				<Column
					sortable
					field="trustUnallocated"
					header="Trust Unallocated"
					bodyClassName="hover:bg-gray-200 cursor-pointer"
					editor={priceEditor}
					onCellEditComplete={onCellEditComplete}
					body={(rowData) =>
						monetaryBodyTemplate(
							rowData as IParticipantOverview,
							"trustUnallocated"
						)
					}
				/>
				<Column
					sortable
					field="trustAllocated"
					header="Trust Allocated"
					body={(rowData) =>
						monetaryBodyTemplate(
							rowData as IParticipantOverview,
							"trustAllocated"
						)
					}
				/>
				<Column
					sortable
					field="dueToDraws"
					header="Construction Holdback"
					body={(rowData) =>
						monetaryBodyTemplate(rowData as IParticipantOverview, "dueToDraws")
					}
				/>
				<Column
					sortable
					field="totalFunds"
					header="Total Funds"
					body={(rowData) =>
						monetaryBodyTemplate(rowData as IParticipantOverview, "totalFunds")
					}
				/>
			</DataTable>
			<Modal
				visible={openParticipantModal}
				onHide={() => {
					setOpenParticipantModal(false);
				}}
				width="90vw"
				title="Default Loans"
			>
				<DataTable
					value={loanParticipants}
					editMode="cell"
					className="p-3"
					stripedRows
					scrollable
					scrollHeight="400px"
				>
					<Column
						field="name"
						header="Loan"
						filter
						body={(rowData) => {
							return (
								<div className="flex  items-center gap-2">
									<div>
										{rowData.investor.user.entityName ||
											`${rowData.investor.user.firstName} ${rowData.investor.user.lastName}`}
									</div>
								</div>
							);
						}}
					/>
					<Column
						sortable
						field="totalLoans"
						header="Total Amount"
						body={(rowData) => moneyFormat(rowData.amount)}
					/>
					<Column
						sortable
						field="totalDrawnToDate"
						header="Total Drawn to Date"
						body={(rowData) =>
							moneyFormat(
								Number.parseFloat(rowData.amount) -
									Number.parseFloat(rowData.constructionHoldback)
							)
						}
					/>
					<Column
						sortable
						field="dueToDraws"
						header="Construction Holdback"
						body={(rowData) => moneyFormat(rowData.constructionHoldback)}
					/>
				</DataTable>
			</Modal>
		</>
	);
};
