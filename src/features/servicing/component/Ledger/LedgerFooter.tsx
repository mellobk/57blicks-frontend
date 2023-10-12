import type { LedgerInput } from "./types";
import type React from "react";

interface LedgerFooterProps {
	data: Array<LedgerInput>;
}
const LedgerFooter: React.FC<LedgerFooterProps> = ({ data }) => {
	return (
		<div className="absolute bottom-10">
			<table className="w-full    ">
				<footer className="bg-gray-200 h-10 ">
					<tr>
						<td
							style={{
								width: "150px",
								paddingLeft: "20px",
							}}
						></td>
						<td
							style={{
								width: "160px",
								paddingLeft: "20px",
								verticalAlign: "middle",
								textAlign: "center",
								paddingTop: "5px",
							}}
						>
							Totals: {data.length}
						</td>
						<td style={{ width: "100px", paddingLeft: "20px" }}></td>
						<td style={{ width: "220px", paddingLeft: "20px" }}>5000</td>
						<td style={{ width: "220px", paddingLeft: "20px" }}>6000</td>
						<td style={{ width: "150px", paddingLeft: "20px" }}>11000</td>
						<td style={{ width: "180px", paddingLeft: "20px" }}></td>
						<td style={{ width: "180px", paddingLeft: "220px" }}></td>
					</tr>
				</footer>
			</table>
		</div>
	);
};

export default LedgerFooter;
