import type { FC } from "react";
import {
	FieldArrayWithId,
	FieldErrors,
	UseFieldArrayAppend,
	UseFieldArrayRemove,
	UseFormRegister,
} from "react-hook-form";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Title } from "@/components/ui/Title/Title";
import { LoanFields } from "@/features/create-loan/types/fields";
import { assetTypes } from "@/features/create-loan/utils/selects";

interface Props {
	append: UseFieldArrayAppend<LoanFields, "collaterals">;
	errors: FieldErrors<LoanFields>;
	fields: FieldArrayWithId<LoanFields, "collaterals">[];
	register: UseFormRegister<LoanFields>;
	remove: UseFieldArrayRemove;
}

export const MultipleCollateral: FC<Props> = ({
	append,
	errors,
	fields,
	register,
	remove,
}) => {
	const collaterals = fields.slice(1);

	return (
		<div className="pl-6">
			<div className="flex flex-row justify-between">
				<Title text="Multiple Collateral" />
				<Button
					className="rounded-3xl px-3 h-[34px] bg-gray-200"
					icon={<Icon name="plus" color="#0E2130" width="12" />}
					onClick={() =>
						append({
							address: "",
							assetType: "",
							insuranceExpirationDate: "",
							link: "",
							taxUrl: "",
						})
					}
					type="button"
				/>
			</div>
			<div className="max-h-[1000px] overflow-y-auto">
				{collaterals.length ? (
					<div className="flex flex-col gap-4 divide-y divide-gray-200">
						{collaterals.map((item, index) => (
							<div key={item.id}>
								<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6 items-end">
									<Input
										error={
											errors?.collaterals?.[index]?.address?.message
										}
										label="Collateral Address"
										placeholder="Enter Collateral Address"
										register={register(
											`collaterals.${index}.address`
										)}
										wrapperClassName="lg:mt-4 mt-6"
										required
									/>
									<div className="flex gap-6">
										<Input
											error={
												errors?.collaterals?.[index]?.insuranceExpirationDate
													?.message
											}
											label="Insurance Expiration"
											placeholder="MM-DD-YYYY"
											register={register(
												`collaterals.${index}.insuranceExpirationDate`
											)}
											wrapperClassName="lg:mt-4 mt-6 w-full"
											required
										/>
										<div className="flex items-end">
											<Button
												className="bg-white px-0 py-2 mr-2"
												icon={
													<Icon name="trashBin" color="#FF0033" width="24" />
												}
												onClick={() => remove(index)}
												type="button"
											/>
										</div>
									</div>
								</div>
								<Input
									error={errors?.collaterals?.[index]?.taxUrl?.message}
									label="Tax URL"
									placeholder="Enter Tax URL"
									register={register(`collaterals.${index}.taxUrl`)}
									wrapperClassName="mt-6"
									required
								/>
								<Select
									className="mt-6"
									error={errors?.collaterals?.[index]?.assetType?.message}
									label="Asset Type"
									options={assetTypes}
									placeholder="Select Dropdown"
									register={register(`collaterals.${index}.assetType`)}
									required
								/>
							</div>
						))}
					</div>
				) : (
					<div className="flex flex-col h-[600px] mt-6 justify-center items-center rounded-xl border-[3px] border-dashed border-gray-200">
						<p className="font-inter text-[13px] text-primary-300 leading-4 tracking-[-0.65px]">
							No Collaterals added Yet
						</p>
						<Button
							buttonText="Add Collateral"
							className="rounded-lg bg-primary-500 mt-4 px-8 py-[11px] font-inter font-semibold text-base text-white leading-[19px] tracking-tighter"
							onClick={() =>
								append({
                  address: "",
									assetType: "",
									insuranceExpirationDate: "",
									link: "",
									taxUrl: "",
								})
							}
							type="button"
						/>
					</div>
				)}
			</div>
		</div>
	);
};
