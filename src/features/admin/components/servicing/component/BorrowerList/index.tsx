import type { BorrowerCustomResponse } from "../../api/borrowers";
import BorrowerListDetail from "./BorrowerListDetail";
import type { FC } from "react";

interface BorrowerListProps {
	borrowers: Array<BorrowerCustomResponse>;
	showNotes: boolean;
	handleChange: (borrower: BorrowerCustomResponse) => void;
}

const BorrowerList: FC<BorrowerListProps> = ({
	borrowers,
	showNotes,
	handleChange,
}) => {
	return (
		<>
			{borrowers.map((borrower) => {
				return (
					<BorrowerListDetail
						borrower={borrower}
						handleChange={handleChange}
						showNotes={showNotes}
					/>
				);
			})}
		</>
	);
};

export default BorrowerList;
