import type { FC } from "react";
import type { message } from "@/types/api/message";

interface Props {
	data?: Array<message>;
}

export const MessagesChat: FC<Props> = ({ data }) =>
	data?.map((message) => (
		<div
			className="flex"
			style={{
				flexDirection: "column",
				alignItems: message.type === "investor" ? "" : "flex-end",
			}}
		>
			<div
				style={{
					height: "58px",
					width: "auto",
					marginTop: "35px",
				}}
			>
				<div
					className={`flex items-center justify-between`}
					style={{
						color: "#B0B4BA",
					}}
				>
					<span className="">{message.name}</span>
					<span className="">{message.time}</span>
				</div>
				<div
					className=" rounded-2xl"
					style={{
						height: "58px",
						paddingTop: "10px",
						paddingLeft: "10px",
						color: message.type === "investor" ? "#656A74" : "#C79E63",
                        backgroundColor : message.type === "investor" ?  "#F4F7F9" : "rgba(199, 158, 99, 0.12)",
					}}
				>
					{message.message}
				</div>
			</div>
		</div>
	));