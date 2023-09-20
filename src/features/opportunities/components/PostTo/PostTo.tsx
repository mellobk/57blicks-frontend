import { FC, useState } from "react";
import {
	Control,
	useFieldArray,
	UseFormSetValue,
	useWatch,
} from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";
import { Title } from "@/components/ui/Title";
import { ToggleButton } from "@/components/ui/ToggleButton";
import OpportunitiesService from "@/features/opportunities/api/opportunities";
import { Opportunity } from "@/features/opportunities/types/fields";
import { nameFormat } from "@/utils/format";
import { Icon } from "@/components/ui/Icon";

interface Props {
	control: Control<Opportunity>;
	openModal: boolean;
	setOpenModal: (openModal: boolean) => void;
	setValue: UseFormSetValue<Opportunity>;
}

export const PostTo: FC<Props> = ({
	control,
	openModal,
	setOpenModal,
	setValue,
}) => {
	const [searchValue, setSearchValue] = useState<string>("");
	const [searchVisible, setSearchVisible] = useState<boolean>(false);
	const [selectedInvestor, setSelecteInvestor] = useState(true);
	const { append, remove } = useFieldArray({
		control,
		name: "investors",
	});
	const opportunitiesInvestors = useWatch({
		control,
		name: "investors",
		defaultValue: [],
	});
	const investorQuery = useQuery(
		["investor-query"],
		() => OpportunitiesService.getInvestors(),
		{ enabled: openModal }
	);

	const findIndex = (investorId: string) =>
		opportunitiesInvestors.findIndex(
			(opportunitiesInvestor) => opportunitiesInvestor.investorId === investorId
		);

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
				`investors.${index}.email`,
				!opportunitiesInvestors[index]?.email
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
			setValue(`investors.${index}.sms`, !opportunitiesInvestors[index]?.sms);
		}
	};

	const toggleNote = (investorId: string) => {
		const index = findIndex(investorId);

		if (index < 0) {
			append({
				email: false,
				sms: false,
				note: "okokok",
				investorId,
			});
		} else {
			setValue(`investors.${index}.note`, "okokok");
		}
	};

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
								<div
									className={`${
										searchVisible || searchValue
											? "w-[200px] bg-transparent"
											: "bg-transparent w-[30px]"
									} transition duration-500`}
									onMouseEnter={() => {
										setSearchVisible(true);
									}}
									onMouseLeave={() => {
										setSearchVisible(false);
									}}
								>
									<Input
										type="text"
										value={searchValue}
										placeholder="Search"
										iconColor={
											searchVisible || searchValue
												? "#0E2130"
												: "rgba(14, 33, 48, 0.5)"
										}
										iconWidth={searchValue ? "10" : "18"}
										iconName={searchValue ? "wrong" : "search"}
										onChange={(data) => {
											setSearchValue(data.target.value);
										}}
										clickIcon={() => {
											setSearchValue("");
										}}
										className={`${
											searchVisible || searchValue
												? "bg-gray-200"
												: "bg-transparent"
										} rounded-2xl w-full px-4 py-2 placeholder-primary-500/[.5] text-primary-500 text-[13px] leading-[18px] tracking-[-0.65px] caret-blue-200 items-center outline-none`}
									/>
								</div>
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
							<div className="flex flex-col h-full">
								<div className="grid grid-cols-7 gap-0.5 divide-x divide-gray-200 font-inter font-semibold text-blue-200 text-xs leading-[15px] tracking-[-0.6]">
									<div className="col-span-5">Select Investors</div>
									<div className="ml-0.5">All SMS</div>
									<div className="ml-0.5">All Email</div>
								</div>
								<div className="grid grid-cols-1 divide-y divide-gray-200 overflow-y-auto">
									{investorQuery.data?.map((investor, index) => {
										const opportunitiesInvestor = opportunitiesInvestors.find(
											(opportunitiesInvestor) =>
												investor.id === opportunitiesInvestor.investorId
										);

										return (
											<div
												key={`investor-${index}`}
												className="grid grid-cols-7 gap-1 py-3 items-center"
											>
												<div className="col-span-5 flex flex-row justify-between">
													<div className="flex flex-row items-center">
														<input
															checked={!!opportunitiesInvestor}
															onChange={() => toggleInvestor(investor.id)}
															type="checkbox"
														/>
														<div className="ml-1 font-inter text-gray-1000 text-[13px] leading-[16px] tracking-[-0.65]">
															{nameFormat(
																`${investor.user?.firstName} ${investor.user?.lastName}`
															)}
														</div>
													</div>
													<ToggleButton
														checked={!!opportunitiesInvestor?.note}
														offColor="bg-green-500/[.12]"
														offIconColor="#00BA35"
														offIconName="plus"
														offLabel="Add Notes"
														offTextColor="text-green-500"
														onChange={() => toggleNote(investor.id)}
														onIconName="note"
														onLabel="Notes"
													/>
												</div>
												<div>
													<ToggleButton
														checked={!!opportunitiesInvestor?.sms}
														offIconName="cellphone"
														offLabel="SMS"
														onChange={() => toggleSms(investor.id)}
														lineThrough
													/>
												</div>
												<div>
													<ToggleButton
														checked={!!opportunitiesInvestor?.email}
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
							/>
						</div>
					</div>
					<div
						className={`${
							selectedInvestor ? "" : "hidden"
						} rounded-r-2xl bg-primary-300 p-6`}
					>
						<div className="flex flex-row justify-between">
							<Title text="Post to" />

							<div className="flex flex-row gap-2">
								<Button
									className="rounded-3xl pl-3 pr-1 h-[34px] bg-gray-200"
									icon={<Icon name="arrowLeft" color="#0E2130" width="12" />}
									onClick={() => setSelecteInvestor(false)}
									type="button"
								/>
								<Button
									className="rounded-3xl pl-3 pr-1 h-[34px] bg-gray-200"
									icon={<Icon name="wrong" color="#0E2130" width="12" />}
									onClick={() => setOpenModal(false)}
									type="button"
								/>
							</div>
						</div>
						<div></div>
					</div>
				</div>
			</div>
		)
	);
};
