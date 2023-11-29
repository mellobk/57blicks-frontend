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
		<div className="flex w-full bg-white justify-center   rounded-3xl">
			<div className="flex w-full bg-white justify-center flex-wrap rounded-3xl">
				<div className="flex flex-col items-center  w-[50%]   bg-white p-2">
					<AllDefaultReport />
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
			</div>
		</div>
	);
};
