import { Calendar, type CalendarChangeEvent } from "primereact/calendar";

import { Dialog } from "primereact/dialog";
import type { FC } from "react";

interface Props {
	show: boolean;
	setShow: (show: boolean) => void;
	onClick?: () => void;
	setDate?: (date: string | Date | Array<Date> | null) => void;
	date?: string | Date | Array<Date> | null;
	closeOnSelect?: boolean;
}

export const CalendarModal: FC<Props> = ({
	show,
	date,
	closeOnSelect = true,
	setShow,
	setDate,
}): JSX.Element => {
	return (
		<div className="card flex justify-content-center">
			<Dialog
				header={"Select Date"}
				visible={show}
				onHide={(): void => {
					setShow(false);
				}}
				style={{ width: "520px", backgroundColor: "black" }}
			>
				<div className="card flex justify-content-center ">
					<Calendar
						value={date}
						onChange={(event: CalendarChangeEvent): void => {
							setDate
								? setDate(event.value as string | Date | Array<Date> | null)
								: null;
							if (closeOnSelect) {
								setShow(false);
							}
						}}
						inline
						showWeek
						style={{ width: "100%" }}
					/>
				</div>
			</Dialog>
		</div>
	);
};
