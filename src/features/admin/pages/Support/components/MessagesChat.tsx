import userStore from "@/stores/user-store";
import type { FC } from "react";
import type { Chat } from "src/features/admin/pages/Support/types/index.ts";
import { formatTime } from "@/utils/formats";

interface Props {
	data?: Array<Chat>;
	internal?: boolean;
}

export const MessagesChat: FC<Props> = ({ data }) => {
	const userLoggedInfo = userStore((state) => state.loggedUserInfo);

	return data?.map((message) => (
		<div
			key={message.id}
			className="flex"
			style={{
				flexDirection: "column",
				alignItems: userLoggedInfo?.id === message?.createdBy ? "flex-end" : "",
			}}
		>
			<div
				style={{
					height: "auto",
					width: "auto",
					marginTop: "35px",
					maxWidth: "300px",
				}}
			>
				<div
					className={`flex items-center justify-between`}
					style={{
						color: "#B0B4BA",
					}}
				>
					<span className="">{userLoggedInfo.firstName}</span>
					<span className="">{formatTime(message?.createdAt?.toString())}</span>
				</div>
				<div
					className="rounded-2xl"
					style={{
						height: "auto",
						paddingTop: "10px",
						paddingLeft: "10px",
						paddingBottom: "10px",
						paddingRight: "10px",
						backgroundColor:
							userLoggedInfo.id === message.createdBy
								? "rgba(199, 158, 99, 0.12)"
								: "#F4F7F9",
						color:
							userLoggedInfo.id === message.createdBy ? "#C79E63" : "#656A74",
					}}
				>
					{message.content}
				</div>
			</div>
		</div>
	));
};
