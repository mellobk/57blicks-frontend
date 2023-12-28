/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from "react";

import type { FC } from "react";
import { Icon } from "@/components/ui/Icon";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable unicorn/consistent-function-scoping */
import { Input } from "@/components/forms/Input";
import ManagePermissionGroupService from "@/features/admin/components/profile/api/permission";
import type { Opportunity } from "@/features/admin/components/opportunities/types/fields";
import type { User } from "@/features/admin/components/manage-user/types/api";
import { getLabel } from "@/utils/common-functions";
import { useDebounce } from "@/hooks/debounce";
import { useNavigate } from "@tanstack/router";
import { useQuery } from "@tanstack/react-query";
import type { Collateral } from "@/features/admin/components/servicing/types/api";
import {
	servicingInvestorTabs,
	servicingTabs,
} from "@/features/admin/components/servicing/utils/tabs";

interface GlobalSearchProps {
	handleOpenGlobalSearch?: () => void;
	loading?: boolean;
}

export const GlobalSearch: FC<GlobalSearchProps> = ({
	handleOpenGlobalSearch,
}) => {
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState<string>("");
	const debouncedSearchTerm = useDebounce(searchValue, 1500);

	const globalSearchQuery = useQuery(
		["global-search-query"],
		() => {
			return ManagePermissionGroupService.getGlobalSearchData(
				searchValue || ""
			);
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	useEffect(() => {
		if (debouncedSearchTerm.length >= 4) {
			void globalSearchQuery.refetch();
		} else if (debouncedSearchTerm === "") {
			void globalSearchQuery.refetch();
		}
	}, [debouncedSearchTerm]);

	const getPluralRole = (roleName: string) => {
		switch (roleName) {
			case "admin": {
				return "admins";
			}
			case "investor": {
				return "investors";
			}
			// For 'accounting', we return it as is.
			case "accounting": {
				return "accounting";
			}
			default: {
				return roleName;
			} // or handle any other default case
		}
	};

	const navigateUser = (data: User): void => {
		void navigate({
			to: `/manage-users/${getPluralRole(data.role?.name || "")}?id=${data.id}`,
		});

		if (handleOpenGlobalSearch) {
			handleOpenGlobalSearch();
		}
	};

	const navigateOpportunities = (id: string): void => {
		void navigate({
			to: `/opportunities//past-opportunities?id=${id}`,
		});

		if (handleOpenGlobalSearch) {
			handleOpenGlobalSearch();
		}
	};

	const navigateCollaterals = (
		id: string,
		servicingName?: string,
		borrower?: string
	): void => {
		/* 	 */

		const findData = servicingTabs.find((data) => {
			return data.label === servicingName;
		});

		if (findData) {
			void navigate({
				to: `/${findData.routeTo}?id=${id}${borrower ? "&tab=Borrower" : ""}`,
			});
		}

		if (handleOpenGlobalSearch) {
			handleOpenGlobalSearch();
		}
	};

	const navigateLender = (
		id: string,
		servicingName?: string,
		participationId?: string
	): void => {
		/* 	 */

		const findData = servicingInvestorTabs.find((data) => {
			return data.label === servicingName;
		});

		if (findData) {
			void navigate({
				to: `/${findData.routeTo}?id=${id}${
					servicingName === "DKC Lending LLC"
						? `&participationId=${participationId}`
						: ""
				}`,
			});
		}

		if (handleOpenGlobalSearch) {
			handleOpenGlobalSearch();
		}
	};

	return (
		<div
			style={{ backdropFilter: " blur(5px)" }}
			className="w-full h-full absolute z-30 "
		>
			<div
				style={{ backdropFilter: " blur(5px)" }}
				className="w-full h-full absolute z-30 "
				onClick={handleOpenGlobalSearch}
			></div>
			<div
				className="absolute rounded-3xl bg-white flex flex-col  opacity-80"
				style={{
					width: "70%",
					right: "0",
					top: "0",
					left: "0",
					bottom: "0",
					margin: "auto",
					zIndex: "100",
					height: "70vh",
				}}
			>
				<div className="h-full w-full rounded-3xl bg-gray-1800 flex flex-col justify-between ">
					<div className="h-[50px] flex items-center w-full gap-4 bg-gray-1700  p-[20px] rounded-t-3xl ">
						<Icon name="search" width="20" />
						<div className="w-full">
							<Input
								placeholder="Search for loans, investors, or invoices"
								className="h-[30px] w-[100%] focus:outline-none shadow-none bg-transparent"
								iconName="close"
								iconColor="black"
								iconWidth="12"
								clickIcon={handleOpenGlobalSearch}
								onChange={(data) => {
									setSearchValue(data.target.value);
								}}
							/>
						</div>
					</div>

					<div className="h-full w-full p-[20px] overflow-auto justify-start">
						{globalSearchQuery.isFetching ? (
							<div className="w-full h-full flex justify-center items-center">
								<Icon name="loading" width="34" color="black" />
							</div>
						) : (
							<div className="flex flex-col gap-2 justify-center">
								<div className="text-gray-2000 font-bold">Users</div>
								{globalSearchQuery.data?.users?.map((userData: User) => {
									return (
										<div
											key={userData.id}
											className="flex gap-3 items-center px-[5px] cursor-pointer"
											onClick={(): void => {
												navigateUser(userData);
											}}
										>
											<div className="w-[30px] h-[30px] flex items-center justify-center bg-blue-300 rounded-full ">
												<div className="text-white text-[12px]">
													{getLabel(
														`${userData.firstName} ${userData.lastName}`
													)}
												</div>
											</div>
											<div className="text-black font-bold">{`${userData.firstName} ${userData.lastName}`}</div>{" "}
											<div className="text-gray-1900">{userData.email}</div>
										</div>
									);
								})}
								<div className="border-t border-gray-1900 mt-3 opacity-20"></div>
								<div className="text-gray-2000 font-bold">Opportunities</div>
								{globalSearchQuery.data?.opportunities?.map(
									(opportunityData: Opportunity) => {
										return (
											<div
												key={opportunityData.id}
												className="flex gap-3 items-center px-[5px] cursor-pointer"
												onClick={(): void => {
													navigateOpportunities(opportunityData?.id || "");
												}}
											>
												<div>
													<Icon name="pdf" width="20" />
												</div>
												<div className="text-black font-bold">{`DKC_Opportunity_${opportunityData.referenceId}.pdf`}</div>{" "}
											</div>
										);
									}
								)}
								<div className="border-t border-gray-1900 mt-3 opacity-20"></div>

								<div className="text-gray-2000 font-bold">Collaterals</div>
								{globalSearchQuery.data?.collaterals?.map(
									(collateral: Collateral) => {
										return (
											<div
												key={collateral.id}
												className="flex gap-3 items-center px-[5px] cursor-pointer"
												onClick={(): void => {
													navigateCollaterals(
														(collateral &&
															collateral.loans &&
															collateral?.loans[0]?.id) ||
															"",
														(collateral &&
															collateral.loans &&
															collateral?.loans[0]?.fundingBreakDowns &&
															collateral?.loans[0]?.fundingBreakDowns[0]?.lender
																?.name) ||
															""
													);
												}}
											>
												<div>
													<Icon name="attach" width="20" />
												</div>
												<div className="text-black font-bold">
													{collateral.address}
												</div>{" "}
											</div>
										);
									}
								)}
								<div className="border-t border-gray-1900 mt-3 opacity-20"></div>

								<div className="text-gray-2000 font-bold">Borrowers</div>
								{globalSearchQuery.data?.borrowers?.map((borrower: any) => {
									return (
										<div
											key={borrower.id}
											className="flex gap-3 items-center px-[5px] cursor-pointer"
											onClick={(): void => {
												navigateCollaterals(
													(borrower &&
														borrower.loans &&
														borrower?.loans[0]?.id) ||
														"",
													(borrower &&
														borrower.loans &&
														borrower?.loans[0]?.fundingBreakDowns &&
														borrower?.loans[0]?.fundingBreakDowns[0]?.lender
															?.name) ||
														"",
													"borrower"
												);
											}}
										>
											<div>
												<Icon name="attach" width="20" />
											</div>
											<div className="text-black font-bold">{borrower.llc}</div>{" "}
										</div>
									);
								})}
								<div className="border-t border-gray-1900 mt-3 opacity-20"></div>

								<div className="text-gray-2000 font-bold">Investors</div>
								{globalSearchQuery.data?.lenders?.map((data: any) => {
									return data.fundingBreakdowns.map((value: any) => {
										return (
											<div
												key={value.id}
												className="flex gap-3 items-center px-[5px] cursor-pointer"
												onClick={(): void => {
													navigateLender(
														value?.loan?.id || "",
														data?.name || ""
													);
												}}
											>
												<div>
													<Icon name="attach" width="20" />
												</div>
												<div className="text-black font-bold">
													{value.loan.borrower.user.firstName}
												</div>{" "}
											</div>
										);
									});
								})}
								<div className="border-t border-gray-1900 mt-3 opacity-20"></div>
							</div>
						)}
					</div>
					<div className="h-[50px] flex items-center  justify-between w-full gap-4 bg-gray-1700  p-[20px] rounded-b-3xl">
						<div className="flex gap-2">
							<div className="text-gray-1900 font-bold">CTRL + F</div>{" "}
							<div className="text-black">Close Search</div>
						</div>
						<div className="flex gap-2">
							<div className="text-gray-1900 font-bold">CTRL + F</div>{" "}
							<div className="text-black">Open Search</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
