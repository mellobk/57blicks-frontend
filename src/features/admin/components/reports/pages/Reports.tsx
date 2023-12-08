/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, type FC } from "react";
import PropertyInsurance from "../components/PropertyInsurance";
import PropertyTax from "../components/PropertyTax";
import PropertyInterest from "../components/PropertyInterest";
import { AllDefaultReport } from "../components/allDefaultReport";
import { emptyObject, findPermission } from "@/utils/common-functions";
import { useNavigate } from "@tanstack/router";
import userStore from "@/stores/user-store";
import { PermissionType } from "@/types/api/permissions-type";
import { PaidLoanReport } from "../components/paidLoanReport";
import { ConsultantLoanReport } from "../components/consultantLoanReport";
import { AssetLoanReport } from "../components/loanAssetstReport";
import { LoanProductReport } from "../components/loanProductReport";
import AverageLoan from "../components/AverageLoan";
import { AverageDaysPaidLoans } from "../components/averageDaysPaidLoans";
import PropertyUnauthorized from "../components/PropertyUnauthorized";
export const Reports: FC = () => {
	const navigate = useNavigate();
	const userLoggedInfo = userStore((state) => state.loggedUserInfo);

	useEffect(() => {
		const find = findPermission(
			userLoggedInfo?.role,
			userLoggedInfo?.permissionGroup?.permissions || [],
			PermissionType.REPORTING
		);

		if (!find && !emptyObject(userLoggedInfo)) {
			void navigate({ to: `/loan-overview` });
		}
	}, [userLoggedInfo]);
	return (
		<div className="flex w-full bg-white justify-center   rounded-3xl h-[100vw] ">
			<div className="flex w-full bg-white justify-center flex-wrap rounded-3xl">
				<div className="flex flex-col items-center  w-[50%]   bg-white p-2">
					<AllDefaultReport />
				</div>
				<div className="flex flex-col items-center  w-[50%]   bg-white p-2">
					<PaidLoanReport />
				</div>
				<div className="flex  w-[30%] p-2">
					<PropertyInsurance />
				</div>
				<div className="flex  w-[30%] p-2">
					<PropertyInterest />
				</div>
				<div className="flex  w-[30%] p-2">
					<PropertyTax />
				</div>
				<div className="flex  w-[30%] p-2">
					<PropertyUnauthorized />
				</div>

				<div className="flex  w-[100%] p-2">
					<AverageLoan />
				</div>
				<div className="flex flex-col items-center  w-[30%]   bg-white p-2 ">
					<ConsultantLoanReport />
				</div>
				<div className="flex flex-col items-center  w-[30%]   bg-white p-2 ">
					<AssetLoanReport />
				</div>
				<div className="flex flex-col items-center  w-[30%]   bg-white p-2 ">
					<LoanProductReport />
				</div>
				<div className="flex flex-col items-center  w-[100%]   bg-white p-2 ">
					<AverageDaysPaidLoans />
				</div>
			</div>
		</div>
	);
};
