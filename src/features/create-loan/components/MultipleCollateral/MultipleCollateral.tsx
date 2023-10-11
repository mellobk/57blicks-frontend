import type { FC } from "react";
import {
	Control,
	FieldArrayWithId,
	FieldErrors,
	UseFieldArrayAppend,
	UseFieldArrayRemove,
	UseFormRegister,
} from "react-hook-form";
import { Dropdown } from "@/components/forms/Dropdown";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Title } from "@/components/ui/Title/Title";
import { Loan } from "@/features/create-loan/types/fields";
import { ASSET_TYPES } from "@/features/create-loan/utils/selects";
import { IconButton } from "@/components/ui/IconButton";
import { MaskInput } from "@/components/forms/MaskInput";

interface Props {
	append: UseFieldArrayAppend<Loan, "collaterals">;
	control: Control<Loan>;
	errors: FieldErrors<Loan>;
	fields: FieldArrayWithId<Loan, "collaterals">[];
	register: UseFormRegister<Loan>;
	remove: UseFieldArrayRemove;
}

export const MultipleCollateral: FC<Props> = ({
	append,
	control,
	errors,
	fields,
	register,
	remove,
}) => (
	<div className="pl-6">
		<div className="flex flex-row justify-between">
			<Title text="Multiple Collateral" />
			<IconButton
				color="#0E2130"
				name="plus"
				onClick={() =>
					append({
						address: "",
						assetType: "",
						insuranceExpirationDate: "",
						link: "",
						taxUrl: "",
					})
				}
				width="12"
			/>
		</div>
		<div className="max-h-[1000px] overflow-y-auto">
			{fields.length > 1 ? (
				<div className="flex flex-col gap-4 divide-y divide-gray-200">
					{fields.map((item, index) => (
						<div key={item.id}>
							{index > 0 && (
								<>
									<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6">
										<Input
											error={errors?.collaterals?.[index]?.address?.message}
											label="Collateral Address"
											placeholder="Enter Collateral Address"
											register={register(`collaterals.${index}.address`)}
											wrapperClassName="lg:mt-4 mt-6"
											required
										/>
										<div className="flex gap-6">
											<MaskInput
												error={
													errors?.collaterals?.[index]?.insuranceExpirationDate
														?.message
												}
												label="Insurance Expiration"
												mask="99-99-9999"
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
									<Input
										error={errors?.collaterals?.[index]?.link?.message}
										label="Link (Google Drive)"
										placeholder="Enter Collateral Link"
										register={register(`collaterals.${index}.link`)}
										wrapperClassName="mt-6"
										required
									/>
									<Dropdown
										control={control}
										error={errors?.collaterals?.[index]?.assetType?.message}
										className="mt-6"
										label="Asset Type"
										name={`collaterals.${index}.assetType`}
										options={ASSET_TYPES}
										required
									/>
								</>
							)}
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
