import { FC } from "react";
import {
	Control,
	useFieldArray,
	UseFormSetValue,
	useWatch,
} from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ToggleButton } from "@/components/ui/ToggleButton";
import OpportunitiesService from "@/features/opportunities/api/opportunities";
import { Opportunity } from "@/features/opportunities/types/fields";
import { nameFormat } from "@/utils/format";

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
		<Modal
			onHide={() => setOpenModal(false)}
			title="Post to"
			visible={openModal}
			width="450px"
		>
			<div className="grid grid-cols-7 gap-0.5 divide-x divide-gray-200 font-inter font-semibold text-blue-200 text-xs leading-[15px] tracking-[-0.6]">
				<div className="col-span-5">Select Investors</div>
				<div className="ml-0.5">All SMS</div>
				<div className="ml-0.5">All Email</div>
			</div>
			<div className="grid grid-cols-1 divide-y divide-gray-200">
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
			<Button
				buttonText="Post"
				className="bg-primary-500 w-full mt-6 px-8 py-[11px] font-inter font-semibold text-base text-white leading-[19px] tracking-tighter"
			/>
		</Modal>
	);
};
