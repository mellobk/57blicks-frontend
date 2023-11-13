import type { FC } from "react";
import { ToggleButton } from "../ToggleButton";

interface NotificationOptionsProps {
	sms: boolean;
	email: boolean;
	notes: boolean;
	setNotes: (notes: boolean) => void;
	setSms: (sms: boolean) => void;
	setEmail: (email: boolean) => void;
}

const NotificationOptions: FC<NotificationOptionsProps> = ({
	notes,
	sms,
	email,
	setNotes,
	setSms,
	setEmail,
}) => {
	return (
		<>
			<div className="flex flex-row gap-2 pl-2 text-[10px] 	">
				<div>
					<ToggleButton
						checked={notes}
						offColor="bg-green-500/[.12]"
						offIconColor="#00BA35"
						offIconName="plus"
						offLabel="Add Notes"
						offTextColor="text-green-500"
						onChange={(): void => {
							setNotes(!notes);
						}}
						onIconName="note"
						onLabel="Notes"
					/>
				</div>
				<div>
					<ToggleButton
						checked={sms}
						offIconName="cellphone"
						offLabel="SMS"
						onChange={(): void => {
							setSms(!sms);
						}}
						lineThrough
					/>
				</div>
				<div>
					<ToggleButton
						checked={email}
						offIconName="email"
						offLabel="EMAIL"
						onChange={(): void => {
							setEmail(!email);
						}}
						lineThrough
					/>
				</div>
			</div>
		</>
	);
};

export default NotificationOptions;
