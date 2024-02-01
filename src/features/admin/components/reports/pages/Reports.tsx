/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, type FC, useState, type SetStateAction } from "react";
/* import PropertyInsurance from "../components/PropertyInsurance";
import PropertyTax from "../components/PropertyTax";
import PropertyInterest from "../components/PropertyInterest"; */
import { AllDefaultReport } from "../components/allDefaultReport";
import { emptyObject, findPermission } from "@/utils/common-functions";
import { useNavigate } from "@tanstack/router";
import userStore from "@/stores/user-store";
import { PermissionType } from "@/types/api/permissions-type";
import { PaidLoanReport } from "../components/paidLoanReport";
import { ConsultantLoanReport } from "../components/consultantLoanReport";
import { AssetLoanReport } from "../components/loanAssetstReport";
import { LoanProductReport } from "../components/loanProductReport";
/* import AverageLoan from "../components/AverageLoan"; */
import { AverageDaysPaidLoans } from "../components/averageDaysPaidLoans";
/* import PropertyUnauthorized from "../components/PropertyUnauthorized"; */
import { NewFoundedLoanReport } from "../components/newFoundedLoanReport";
import { InterestCollectionReport } from "../components/InterestCollectionReport";

import { Tabs } from "../../servicing/component/Tabs";
import { loansTabs } from "../../servicing/utils/tabs";
import { ExtendedLoanReport } from "../components/extendedFoundedLoanReport";
import { Int1999 } from "../components/int1999-";
import { Int1998 } from "../components/int1998-";
export const Reports: FC = () => {
	const navigate = useNavigate();
	const userLoggedInfo = userStore((state) => state.loggedUserInfo);
	const [actualTabData, setActualTabData] = useState<string>("consultants");

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
		<div className="flex w-full bg-white  rounded-3xl  flex-wrap  gap-3 justify-center p-2">
			<div className="flex flex-col items-center  w-[49%]   bg-white  border-8 rounded-2xl shadow-md">
				<InterestCollectionReport />
			</div>
			<div className="flex flex-col items-center  w-[49%]   bg-white border-8 rounded-2xl shadow-md">
				<AllDefaultReport />
			</div>
			<div className="flex flex-col items-center  w-[49%]   bg-white border-8 rounded-2xl shadow-md">
				<NewFoundedLoanReport />
				<hr className="h-[2px]  w-full mt-5"></hr>
				<PaidLoanReport />
				{/* 		<hr className="h-[2px] bg-black w-full"></hr> */}
			</div>
			{/* 			<div className="flex  w-[30%] p-2">
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
				</div> */}
			{/* 	<div className="flex  w-[100%] p-2">
					<AverageLoan />
				</div> */}
			<div className="flex flex-col items-center  w-[49%]   bg-white  border-8 rounded-2xl shadow-md">
				<div className="flex items-center justify-between w-full   bg-gray-200  g-3  h-[35px]">
					<Tabs
						tabs={loansTabs}
						actualTab={actualTabData}
						onClick={(value: SetStateAction<string>): void => {
							setActualTabData(value);
						}}
					/>
				</div>
				{actualTabData === "consultants" && (
					<div className="flex flex-col items-center  w-[100%]   bg-white ">
						<ConsultantLoanReport />
					</div>
				)}
				{actualTabData === "asset types" && (
					<div className="flex flex-col items-center   w-[100%]   bg-white ">
						<AssetLoanReport />
					</div>
				)}
				{actualTabData === "products" && (
					<div className="flex flex-col items-center   w-[100%]   bg-white ">
						<LoanProductReport />
					</div>
				)}
			</div>

			<div className="flex flex-col items-center  w-[49%]   bg-white border-8 rounded-2xl shadow-md">
				<AverageDaysPaidLoans />
			</div>

			<div className="flex flex-col items-center  w-[49%]   bg-white  border-8 rounded-2xl shadow-md">
				<ExtendedLoanReport />
			</div>

			{/* 			<div className="flex flex-col items-center  w-[49%]   bg-white border-8 rounded-2xl shadow-md">
				<Int1998 />
				<hr className="h-[2px]  w-full mt-1"></hr>
				<Int1999 />
			</div> */}
		</div>
	);
};
