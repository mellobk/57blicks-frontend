import type { FC } from "react";
import type { PDFList } from "@/types/api/pdf-list";
import PDF from "@/assets/images/png/PDF.png";
interface Props {
	data?: Array<PDFList>;
}

export const PDFListItems: FC<Props> = ({ data }) =>
	data?.map((pdf, key) => (
		<div
			className="flex justify-between items-center"
			style={{
				backgroundColor: key % 2 === 0 ? "" : "#F4F7F9",
				borderBottom: "1px solid var(--default-input, #EDF3F5)",
				paddingTop: "15px"
			}}
		>
			<div className="w-[80px] h-20 flex justify-center items-center ">
				<div className="w-10 h-10 rounded-3xl bg-gray-200  align-middle items-center flex justify-center ">
					<img height="24px" width="24px" src={PDF} alt="support Empty" />
				</div>
			</div>
			<div className="w-full h-20  ">
				<div>
					<p className="text-[16px] " style={{ fontWeight: "600" }}>
						{pdf.name}
					</p>
				</div>
				<div style={{ color: "#B0B4BA", fontWeight: "400", fontSize: "13px" }}>
					{pdf.size}
				</div>
				<div
					className="flex justify-between items-center w-full"
					style={{ color: "#B0B4BA", fontWeight: "400", fontSize: "13px", width: "100%", paddingRight: "10px"}}
				>
					<span>{pdf.upload}</span>
					<span>{pdf.time}</span>
				</div>
			</div>
		</div>
	));
