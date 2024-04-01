/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type FC, useEffect, useState } from "react";
/* import { useMutation } from "@tanstack/react-query"; */
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import ManageLoanConsultantService from "../../../servicing/api/loan-consultant";
import { Icon } from "@/components/ui/Icon";
import { Consultant } from "./Consultant";

interface AddInvestorProps {
	handleSuccess?: () => void;
}

export const CreateLoanConsultant: FC<AddInvestorProps> = ({
	handleSuccess,
}) => {
	const [createInput, setCreateInput] = useState<string>("");
	const [getAllConsultants, setGetAllConsultants] = useState<
		Array<{
			id: number;
			name: string;
		}>
	>();

	const createInvestorMutation = useMutation((data: { name: string }) => {
		return ManageLoanConsultantService.createNewLoanConsultant(data);
	});

	const loanConsultantQuery = useQuery(
		["all-loan-consultants"],
		() => {
			return ManageLoanConsultantService.getAllLoansConsultants();
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	const CreateLoanConsultant = () => {
		createInvestorMutation.mutate({
			name: createInput || "",
		});
	};

	const SuccessDelete = () => {
		void loanConsultantQuery.refetch();
	};

	useEffect(() => {
		if (createInvestorMutation.isSuccess) {
			void loanConsultantQuery.refetch();
			createInvestorMutation.reset();
			if (handleSuccess) {
				handleSuccess();
			}
		}
	}, [createInvestorMutation]);

	useEffect(() => {
		setGetAllConsultants(loanConsultantQuery?.data?.data as any);
	}, [loanConsultantQuery.isFetching]);

	useEffect(() => {
		if (getAllConsultants) {
			getAllConsultants.sort((a, b) => {
				// Assuming 'name' is the property by which you want to sort
				const nameA = a.name.toLowerCase(); // ignore upper and lowercase
				const nameB = b.name.toLowerCase(); // ignore upper and lowercase
				if (nameA < nameB) {
					return -1; //nameA comes first
				}
				if (nameA > nameB) {
					return 1; // nameB comes first
				}

				// names must be equal
				return 0;
			});

			console.log(getAllConsultants);

			setGetAllConsultants(getAllConsultants as any);
		}
	}, [getAllConsultants]);

	return (
		<div className="flex  flex-col justify-between w-full h-full gap-5">
			<div className="flex w-full justify-between items-end gap-2">
				{" "}
				<div className="w-full">
					<Input
						label="Name"
						placeholder="Loan consultant"
						onChange={(e) => {
							setCreateInput(e.target.value);
						}}
					/>
				</div>{" "}
				<div className="mb-1">
					<Button
						disabled={(createInput?.length as any) < 1}
						buttonText={"create"}
						onClick={() => {
							CreateLoanConsultant();
						}}
					/>
				</div>
			</div>
			<div className="h-[450px]  overflow-scroll flex  items-center flex-col">
				{loanConsultantQuery.isLoading ? (
					<Icon name="loading" width="50" color="black" />
				) : (
					getAllConsultants?.map((data) => {
						return (
							<div key={data.id} className="px-1 w-full">
								<Consultant
									name={data.name}
									id={data.id}
									handleSuccess={SuccessDelete}
								/>
								<hr
									className="w-full mt-2"
									style={{ height: "1px", padding: "10px 0" }}
								/>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};
