import { useState, type FC, useEffect, type MutableRefObject } from "react";
import type { LoanHistory } from "../../../types/api";
import moment from "moment";

interface ExtendedLoanListProps {
	extended: Array<LoanHistory>;
	date: Date;
	extendedData: MutableRefObject<Array<Date>>;
}

const findDate = (extended: Array<LoanHistory>, date: Date): Date => {
	let dateFound = "";

	for (const element of extended) {
		if (
			moment(element.maturityDate).isBefore(date) ||
			moment(element.maturityDate).isSame(date)
		) {
			//if (element.maturityDate < date) {
			dateFound = String(element.maturityDate);
		}
	}

	return moment(dateFound).toDate();
};

const ExtendedLoanList: FC<ExtendedLoanListProps> = ({
	extended,
	date,
	extendedData,
}) => {
	const [datePrint, setDatePrint] = useState<Date>();

	useEffect(() => {
		const dateFound = findDate(extended, date);

		let found = false;
		extendedData.current.forEach((element) => {
			if (moment(element).isSame(moment(dateFound))) {
				found = true;
				return;
			}
		});

		if (!found) {
			extendedData.current.push(dateFound);
			if (moment(dateFound).isValid()) {
				setDatePrint(moment(dateFound).toDate());
			}
		}
	}, [extendedData]);

	useEffect(() => {}, [datePrint]);

	if (extended.length === 0) return <li></li>;
	return (
		<>
			<li>
				{datePrint && (
					<>Extended {moment(datePrint).format("MM/DD/YYYY").toString()}</>
				)}
			</li>
		</>
	);
};

export default ExtendedLoanList;
