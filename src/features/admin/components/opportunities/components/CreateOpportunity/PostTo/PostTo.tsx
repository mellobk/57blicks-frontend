/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type FC, useEffect, useState } from "react";
import {
	type Control,
	useFieldArray,
	type UseFormReset,
	type UseFormSetValue,
	useWatch,
} from "react-hook-form";
import { pdf } from "@react-pdf/renderer";
import { useMutation, useQuery } from "@tanstack/react-query";

import InvestorsService from "@/api/investors";
import OpportunitiesService from "@/api/opportunities";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { SearchBar } from "@/components/ui/SearchBar";
import { Title } from "@/components/ui/Title";
import { ToggleButton } from "@/components/ui/ToggleButton";
import { DocumentPreview } from "@/features/admin/components/opportunities/components/CreateOpportunity/DocumentPreview/DocumentPreview";
import type { Opportunity } from "@/features/admin/components/opportunities/types/fields";
import type { Investor } from "@/types/api/investor";
import { nameFormat } from "@/utils/formats";
import userStore from "@/stores/user-store";

interface Props {
	control: Control<Opportunity>;
	openModal: boolean;
	reset: UseFormReset<Opportunity>;
	setOpenModal: (openModal: boolean) => void;
	setOpenSuccessModal: (openModal: boolean) => void;
	setValue: UseFormSetValue<Opportunity>;
}

export const PostTo: FC<Props> = ({
	control,
	openModal,
	reset,
	setOpenModal,
	setOpenSuccessModal,
	setValue,
}) => {
	const userLoggedInfo = userStore((state) => state.loggedUserInfo);
	const [searchValue, setSearchValue] = useState<string>("");
	/* 	const [formUsers, setFormUsers] = useState<any>([]); */
	const [selectedInvestor, setSelectedInvestor] = useState<{
		investor: Investor;
		opportunityInvestorIndex: number;
	} | null>(null);
	const { append, remove } = useFieldArray({
		control,
		name: "investorsNotifications",
	});

	const investorsNotifications = useWatch({
		control,
		name: "investorsNotifications",
		defaultValue: [],
	});

	const form = useWatch({ control });

	const investorsQuery = useQuery(
		["investors-query", searchValue],
		() => InvestorsService.getInvestors(searchValue),
		{ enabled: openModal }
	);

	const createOpportunityMutation = useMutation((data: Opportunity) => {
		return OpportunitiesService.createOpportunity(data);
	});

	const createUniqueUsersMutation = useMutation((data: any) => {
		return OpportunitiesService.uniqueUsers(data);
	});

	const uploadOpportunityMutation = useMutation((file: Blob) => {
		return OpportunitiesService.uploadOpportunity(file);
	});

	const createUsersNotificationMutation = useMutation((data: any) => {
		return OpportunitiesService.userNotifications(data);
	});
	const allEmail = () => {
		investorsNotifications.map((_, index) => {
			setValue(`investorsNotifications.${index}.email`, true);
		});
	};

	const allSMS = () => {
		investorsNotifications.map((_, index) => {
			setValue(`investorsNotifications.${index}.sms`, true);
		});
	};

	const findIndex = (investorId: string) =>
		investorsNotifications.findIndex(
			(opportunityInvestor) => opportunityInvestor.investorId === investorId
		);

	const onPost = async () => {
		try {
			const pdfDocument = pdf(<DocumentPreview control={control} />);
			const blob = await pdfDocument?.toBlob();

			if (blob) {
				uploadOpportunityMutation.mutate(blob, {
					onSuccess: (data) => {
						const formData = form;
						formData.documentS3Path = data.s3Path;

						createOpportunityMutation.mutate(formData as Opportunity);
					},
				});
			}
		} catch (error) {
			console.error("Error al generar PDF:", error);
		}
	};

	const openNote = (investor: Investor) => {
		const index = findIndex(investor.id);
		const opportunityInvestorIndex =
			index < 0 ? investorsNotifications.length : index;
		const note =
			`Hi (${investor.user?.firstName}),\n` +
			"\n" +
			"DKC Lending now has a new investment opportunity available for your review.\n" +
			"\n" +
			"Please log into your portal to review, and/or email david@dkclending.com for more details.\n" +
			"\n" +
			`Offer Link: [Google Drive Link]\n` +
			"\n" +
			"Thank you!\n" +
			"DKC Lending team";

		if (index < 0) {
			append({
				email: true,
				sms: false,
				note,
				investorId: investor.id,
				userId: investor?.user?.id,
			});
		} else {
			setValue(`investorsNotifications.${index}.email`, true);
			setValue(`investorsNotifications.${index}.note`, note);
		}

		setSelectedInvestor({
			investor,
			opportunityInvestorIndex,
		});
	};

	const setNote = (index: number, note: string) => {
		setValue(`investorsNotifications.${index}.note`, note);
	};

	const toggleEmail = (investorId: string, userId: string) => {
		const index = findIndex(investorId);

		if (index < 0) {
			append({
				email: true,
				sms: false,
				investorId,
				userId,
			});
		} else {
			setValue(
				`investorsNotifications.${index}.email`,
				!investorsNotifications[index]?.email
			);
		}
	};

	const toggleInvestor = (investorId: string, userId: string) => {
		const index = findIndex(investorId);

		if (index < 0) {
			append({
				email: false,
				sms: false,
				investorId,
				userId,
			});
		} else {
			remove(index);
		}

		setSelectedInvestor(null);
	};

	const toggleSMS = (investorId: string, userId: string) => {
		const index = findIndex(investorId);

		if (index < 0) {
			append({
				email: false,
				sms: true,
				investorId,
				userId,
			});
		} else {
			setValue(
				`investorsNotifications.${index}.sms`,
				!investorsNotifications[index]?.sms
			);
		}
	};

	const createNotifications = async (
		userId: string,
		notificationId: string
	) => {
		createUsersNotificationMutation.mutate({
			userId: userId,
			notificationId: notificationId,
			status: "SENT",
		});
	};

	const createNotificationUser = async () => {
		if (form?.investorsNotifications?.length) {
			for (const promise of form?.investorsNotifications) {
				try {
					const result = await createUniqueUsersMutation.mutateAsync({
						title: "Offer",
						timestamp: new Date(),
						content: `New offer created`,
						additionalData: `{"investorId": "${promise.investorId}", "opportunityId": "${createOpportunityMutation?.data?.id}" }`,
						userFullName: `${userLoggedInfo.firstName} ${userLoggedInfo.lastName}`,
						priority: "HIGH",
						type: "ALERT",
						roles: [],
					});
					await createNotifications(
						promise?.userId as unknown as string,
						result as unknown as string
					);
				} catch (error) {
					console.error("Error en la mutación:", error);
					// Puedes manejar el error según tus necesidades
				}
			}
		}
	};

	useEffect(() => {
		if (createOpportunityMutation.isSuccess) {
			reset();
			createOpportunityMutation.reset();
			setOpenModal(false);
			setOpenSuccessModal(true);

			void createNotificationUser();
		}
	}, [createOpportunityMutation.isSuccess]);

	useEffect(() => {
		if (createOpportunityMutation.isError) {
			createOpportunityMutation.reset();
		}
	}, [createOpportunityMutation.isError]);

	return (
		openModal && (
			<div className="fixed inset-0 flex items-center justify-center z-50">
				<div className="bg-black opacity-60 absolute inset-0"></div>
				<div
					className={`grid ${
						selectedInvestor ? "grid-cols-2 w-[900px]" : "grid-cols-1 w-[450px]"
					} relative shadow-lg z-50`}
				>
					<div
						className={`${
							selectedInvestor ? "rounded-l-2xl" : "rounded-2xl"
						} flex flex-col gap-6 divide-y divide-gray-200 bg-white p-6`}
					>
						<div className="flex flex-row justify-between">
							<Title text="Post to" />

							<div className="flex flex-row gap-2">
								<SearchBar setValue={setSearchValue} value={searchValue} />
								<IconButton
									className={selectedInvestor ? "hidden" : ""}
									color="#0E2130"
									name="wrong"
									onClick={() => {
										setOpenModal(false);
									}}
									width="12"
								/>
							</div>
						</div>
						<div className="flex flex-col h-full pt-6 justify-between">
							<div className="flex flex-col gap-2 divide-y divide-gray-200 h-full">
								<div className="grid grid-cols-7 gap-1 mr-3 divide-x divide-gray-200 font-inter font-semibold text-blue-200 text-xs leading-[15px] tracking-[-0.6]">
									<div className="col-span-5">Select Investors</div>
									<button className="pl-1" onClick={allSMS}>
										All SMS
									</button>
									<button className="pl-1" onClick={allEmail}>
										All SMS
									</button>
								</div>
								<div className="flex flex-col divide-y divide-gray-200 h-[300px] overflow-y-auto">
									{investorsQuery.data?.map((investor, index) => {
										const opportunityInvestor = investorsNotifications.find(
											(opportunityInvestor) =>
												investor.id === opportunityInvestor.investorId
										);

										return (
											<div
												key={`investor-${index}`}
												className={`grid grid-cols-7 gap-1 p-3 items-center ${
													selectedInvestor?.investor.id === investor.id
														? "bg-gray-150"
														: ""
												}`}
											>
												<div className="col-span-5 flex flex-row justify-between">
													<div className="flex flex-row items-center">
														<input
															checked={!!opportunityInvestor}
															onChange={() => {
																toggleInvestor(
																	investor.id,
																	investor?.user?.id || ""
																);
															}}
															type="checkbox"
														/>
														<div className="ml-1 font-inter text-gray-1000 text-[13px] leading-4 tracking-[-0.65]">
															{nameFormat(
																`${
																	investor.user?.entityName &&
																	investor.user?.entityName !== ""
																		? investor.user?.entityName
																		: investor.user?.firstName +
																		  " " +
																		  investor.user?.lastName
																}
																 `
															)}
														</div>
													</div>
													<ToggleButton
														checked={!!opportunityInvestor?.note}
														offColor="bg-green-500/[.12]"
														offIconColor="#00BA35"
														offIconName="plus"
														offLabel="Add Notes"
														offTextColor="text-green-500"
														onChange={() => {
															openNote(investor);
														}}
														onIconName="note"
														onLabel="Notes"
													/>
												</div>
												<div>
													<ToggleButton
														checked={!!opportunityInvestor?.sms}
														offIconName="cellphone"
														offLabel="SMS"
														onChange={() => {
															toggleSMS(investor.id, investor?.user?.id || "");
														}}
														lineThrough
													/>
												</div>
												<div>
													<ToggleButton
														checked={!!opportunityInvestor?.email}
														offIconName="email"
														offLabel="EMAIL"
														onChange={() => {
															toggleEmail(
																investor.id,
																investor?.user?.id || ""
															);
														}}
														lineThrough
													/>
												</div>
											</div>
										);
									})}
								</div>
							</div>
							<Button
								buttonText="Post"
								className="bg-primary-500 w-full mt-6 px-8 py-[11px] font-inter font-semibold text-base text-white leading-[19px] tracking-tighter"
								onClick={onPost}
								disabled={investorsNotifications.length === 0}
								type="button"
							/>
						</div>
					</div>
					{selectedInvestor && (
						<div className="rounded-r-2xl flex flex-col gap-6 divide-y divide-gray-1300 bg-primary-300 p-6">
							<div className="flex flex-row justify-between">
								<Title
									color="text-white"
									text={`${selectedInvestor.investor.user?.firstName}’s Opportunity`}
								/>

								<div className="flex flex-row gap-2">
									<IconButton
										bgColor="bg-gray-1300"
										color="#FBFEFF"
										name="arrowLeft"
										onClick={() => {
											setSelectedInvestor(null);
										}}
										width="12"
									/>
									<IconButton
										bgColor="bg-gray-1300"
										color="#FBFEFF"
										name="wrong"
										onClick={() => {
											setOpenModal(false);
										}}
										width="12"
									/>
								</div>
							</div>
							<div className="flex flex-col gap-2 pt-6 h-full">
								<div className="font-inter font-semibold text-white text-sm leading-[17px] tracking-[-0.7]">
									Opportunity Notes
								</div>
								<textarea
									className="h-full rounded-lg py-3 px-4 bg-gray-1300 resize-none focus:outline-none font-inter text-white text-[13px] leading-4 tracking-[-0.65]"
									onChange={(e) => {
										setNote(
											selectedInvestor.opportunityInvestorIndex,
											e.target.value
										);
									}}
									value={
										investorsNotifications[
											selectedInvestor.opportunityInvestorIndex
										]?.note
									}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		)
	);
};
