import { FC, useEffect, useState } from "react";
import {
	Control,
	useFieldArray,
	UseFormReset,
	UseFormSetValue,
	useWatch,
} from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SearchBar } from "@/components/ui/SearchBar";
import { Title } from "@/components/ui/Title";
import { ToggleButton } from "@/components/ui/ToggleButton";
import OpportunitiesService from "@/features/opportunities/api/investors";
import { Investor } from "@/features/opportunities/types/api";
import { Opportunity } from "@/features/opportunities/types/fields";
import { nameFormat } from "@/utils/formats";
import useStore from "@/stores/app-store";

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
	const [searchValue, setSearchValue] = useState<string>("");
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
	const investorQuery = useQuery(
		["investor-query", searchValue],
		() => OpportunitiesService.getInvestors(searchValue),
		{ enabled: openModal }
	);
	const {
		error,
		isError,
		isSuccess,
		mutate,
		reset: resetMutation,
	} = useMutation((data: Opportunity) => {
		return OpportunitiesService.createOpportunity(data);
	});
	const setErrorMessage = useStore((state) => state.setErrorMessage);

	const findIndex = (investorId: string) =>
		investorsNotifications.findIndex(
			(opportunityInvestor) => opportunityInvestor.investorId === investorId
		);

	const onPost = (): void => {
		const formData = form as Opportunity;

		setValue(
			"documentS3Path",
			"opportunities/aaa52541-143e-4e6d-a7e2-a5706c85bd89.pdf"
		);
		mutate(formData);
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

	const toggleEmail = (investorId: string) => {
		const index = findIndex(investorId);

		if (index < 0) {
			append({
				email: true,
				sms: false,
				investorId,
			});
		} else {
			setValue(
				`investorsNotifications.${index}.email`,
				!investorsNotifications[index]?.email
			);
		}
	};

	const toggleInvestor = (investorId: string) => {
		const index = findIndex(investorId);

		if (index < 0) {
			append({
				email: false,
				sms: false,
				investorId,
			});
		} else {
			remove(index);
		}

		setSelectedInvestor(null);
	};

	const toggleSms = (investorId: string) => {
		const index = findIndex(investorId);

		if (index < 0) {
			append({
				email: false,
				sms: true,
				investorId,
			});
		} else {
			setValue(
				`investorsNotifications.${index}.sms`,
				!investorsNotifications[index]?.sms
			);
		}
	};

	useEffect(() => {
		if (isSuccess) {
			reset();
			resetMutation();
			setOpenModal(false);
			setOpenSuccessModal(true);
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isError && (error as Error)) {
			const currentError = error as Error;

			setErrorMessage(currentError?.message);
			resetMutation();
		}
	}, [isError]);

	return (
		openModal && (
			<div className="fixed inset-0 flex items-center justify-center z-50">
				<div className="bg-black opacity-60 absolute inset-0"></div>
				<div
					className={`grid ${
						selectedInvestor ? "grid-cols-2 w-[900px]" : "grid-cols-1 w-[450px]"
					} h-[500px] relative shadow-lg z-50`}
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
								<Button
									className={`${
										selectedInvestor ? "hidden" : ""
									} rounded-3xl pl-3 pr-1 h-[34px] bg-gray-200`}
									icon={<Icon name="wrong" color="#0E2130" width="12" />}
									onClick={() => setOpenModal(false)}
									type="button"
								/>
							</div>
						</div>
						<div className="flex flex-col h-full pt-6 justify-between">
							<div className="flex flex-col gap-2 divide-y divide-gray-200 h-full">
								<div className="grid grid-cols-7 gap-1 mr-3 divide-x divide-gray-200 font-inter font-semibold text-blue-200 text-xs leading-[15px] tracking-[-0.6]">
									<div className="col-span-5">Select Investors</div>
									<div className="pl-1">All SMS</div>
									<div className="pl-1">All Email</div>
								</div>
								<div className="grid grid-cols-1 divide-y divide-gray-200 overflow-y-auto">
									{investorQuery.data?.map((investor, index) => {
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
															onChange={() => toggleInvestor(investor.id)}
															type="checkbox"
														/>
														<div className="ml-1 font-inter text-gray-1000 text-[13px] leading-4 tracking-[-0.65]">
															{nameFormat(
																`${investor.user?.firstName} ${investor.user?.lastName}`
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
														onChange={() => openNote(investor)}
														onIconName="note"
														onLabel="Notes"
													/>
												</div>
												<div>
													<ToggleButton
														checked={!!opportunityInvestor?.sms}
														offIconName="cellphone"
														offLabel="SMS"
														onChange={() => toggleSms(investor.id)}
														lineThrough
													/>
												</div>
												<div>
													<ToggleButton
														checked={!!opportunityInvestor?.email}
														offIconName="email"
														offLabel="EMAIL"
														onChange={() => toggleEmail(investor.id)}
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
									<Button
										className="rounded-3xl pl-3 pr-1 h-[34px] bg-gray-1300"
										icon={<Icon name="arrowLeft" color="#FBFEFF" width="12" />}
										onClick={() => setSelectedInvestor(null)}
										type="button"
									/>
									<Button
										className="rounded-3xl pl-3 pr-1 h-[34px] bg-gray-1300"
										icon={<Icon name="wrong" color="#FBFEFF" width="12" />}
										onClick={() => setOpenModal(false)}
										type="button"
									/>
								</div>
							</div>
							<div className="flex flex-col gap-2 pt-6 h-full">
								<div className="font-inter font-semibold text-white text-sm leading-[17px] tracking-[-0.7]">
									Opportunity Notes
								</div>
								<textarea
									className="h-full rounded-lg py-3 px-4 bg-gray-1300 resize-none focus:outline-none font-inter text-white text-[13px] leading-4 tracking-[-0.65]"
									onChange={(e) =>
										setNote(
											selectedInvestor.opportunityInvestorIndex,
											e.target.value
										)
									}
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
