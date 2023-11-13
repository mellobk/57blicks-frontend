import type { BorrowerCustomResponse } from "../../api/borrowers";
import type { FC } from "react";
import { Icon } from "@/components/ui/Icon";
import { ToggleButton } from "@/components/ui/ToggleButton";

interface BorrowerListDetailProps {
	borrower: BorrowerCustomResponse;
	showNotes: boolean;
	handleChange: (borrower: BorrowerCustomResponse) => void;
}

const BorrowerListDetail: FC<BorrowerListDetailProps> = ({
	borrower,
	showNotes,
	handleChange,
}) => {
	const handleChangeBorrower = (
		type: "check" | "notes" | "sms" | "email"
	): void => {
		let notes = borrower.notes;
		let sms = borrower.sms;
		let email = borrower.email;
		switch (type) {
			case "check": {
				if (borrower.selected) {
					notes = false;
					sms = false;
					email = false;
				} else {
					notes = showNotes;
					sms = true;
					email = true;
				}
				handleChange({
					...borrower,
					selected: !borrower.selected,
					notes,
					sms,
					email,
				});

				break;
			}
			// case "notes": {
			// 	handleChange({
			// 		...borrower,
			// 		selected: true,
			// 		notes: !borrower.notes,
			// 	});

			// 	break;
			// }
			case "sms": {
				handleChange({
					...borrower,
					selected: true,
					sms: !borrower.sms,
				});

				break;
			}

			case "email": {
				handleChange({
					...borrower,
					selected: true,
					email: !borrower.email,
				});

				break;
			}
		}
	};

	return (
		<>
			<div className="flex flex-wrap relative border-b h-[40px] cursor-pointer hover:bg-gray-100">
				<div
					style={{ width: "35px" }}
					className="pt-[11px] pl-2"
					onClick={(): void => {
						handleChangeBorrower("check");
					}}
				>
					{borrower.selected ? (
						<Icon name="checkBoxTrue" width="15" color="#B0B4BA" />
					) : (
						<Icon name="checkBoxFalse" width="15" color="#B0B4BA" />
					)}
				</div>
				<div
					className={`${
						borrower.selected ? "font-semibold" : ""
					} flex-1 w-13 items-center justify-center pt-[5px] `}
					onClick={(): void => {
						handleChangeBorrower("check");
					}}
				>{`${borrower.user.firstName} ${borrower.user.lastName}`}</div>

				<div className="absolute right-0 flex gap-2 bg-white pt-[10px] pb-[10px] pr-2 h-full  pl-2 ">
					{showNotes && (
						<ToggleButton
							checked={showNotes}
							offColor="bg-green-500/[.12]"
							offIconColor="#00BA35"
							offIconName="plus"
							offLabel="Add Notes"
							offTextColor="text-green-500"
							onChange={(): void => {
								handleChange({
									...borrower,
									notes: !borrower.notes,
									selected: true,
								});

								//setNotes(!notes);
							}}
							onIconName="note"
							onLabel="Notes"
						/>
					)}

					<ToggleButton
						checked={borrower.sms}
						offIconName="cellphone"
						offLabel="SMS"
						onChange={(): void => {
							handleChangeBorrower("sms");
						}}
						lineThrough
					/>

					<ToggleButton
						checked={borrower.email}
						offIconName="email"
						offLabel="EMAIL"
						onChange={(): void => {
							handleChangeBorrower("email");
						}}
						lineThrough
					/>
				</div>
			</div>
		</>
	);
};

export default BorrowerListDetail;
