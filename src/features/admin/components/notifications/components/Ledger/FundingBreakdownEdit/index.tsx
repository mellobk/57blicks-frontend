import type { FC } from 'react'
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { Loan } from "@/features/admin/components/create-loan/types/fields";
import { LoanSchema } from "@/features/admin/components/create-loan/schemas/LoanSchema";
import { FundingBreakdown } from "@/features/admin/components/create-loan/components/FundingBreakdown/FundingBreakdown";
import { calculateProrated, calculateRegular } from '@/utils/common-functions';
import LoansService from "@/api/loans";


interface FundingBreakdownEditProps {
  loan: Loan
}

const FundingBreakdownEdit: FC<FundingBreakdownEditProps> = ({ loan }) => {
  const {
		control,
		formState: { errors },
    handleSubmit,
		setValue,
	} = useForm<Loan>({
    defaultValues:  loan,
		resolver: zodResolver(LoanSchema),
	});

  const {
		isError,
		isSuccess,
		isLoading,
		mutate,
		reset: resetMutation,
		data,
	} = useMutation((data: Loan) => {
		return LoansService.updateLoan(data.id,data);
	});


  
	const onSubmit: SubmitHandler<Loan> = (data: Loan): void => {
		
		const fundingBreakdown = data.fundingBreakdown.map((breakdown) => ({
			...breakdown,
			prorated: calculateProrated(
				breakdown.amount,
				breakdown.rate,
				data.originationDate
			),
			regular: calculateRegular(breakdown.amount, breakdown.rate),
		}));

 
		const formatData = {
			...data,
			borrower: {
				...data.borrower,
				user: {
					...data.borrower.user,
				},
			},
			fundingBreakdown,
			participationBreakdown: loan.participationBreakdown,
		};

		mutate(formatData);
	};


  return (
    <>
        <form
            className="flex flex-col rounded-3xl bg-white gap-6 divide-y divide-gray-200 w-screen p-6 h-full overflow-y-auto"
            onSubmit={handleSubmit(onSubmit)}
		>
            <FundingBreakdown
                control={control}
                errors={errors}
                remove={()=>{}}
                setOpenLenderModal={()=>{}}
                setOpenParticipantModal={()=>{}}
                setValue={setValue}
            />
        </form>
    </>
  );
};

export default FundingBreakdownEdit;