import { FC, useEffect, useState } from "react";
import { MessagesChat } from "@/features/admin/pages/Support/components/MessagesChat";
import { TextArea } from "@/components/forms/TextArea";
import { IconButton } from "@/components/ui/IconButton";
import type { Chat } from "src/features/admin/pages/Support/types/index.ts";
import { useQuery } from "@tanstack/react-query";
import ManageChatService from "@/features/admin/components/servicing/component/Tickets/Chat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sentTicket } from "../api/support";

interface Props {
	idTicket: string;
}

export const ChatBox: FC<Props> = ({ idTicket }) => {
	const [chatList, setChatList] = useState<Array<Chat>>([]);
	const [message, setMessage] = useState<string>(""); // State to store the TextArea value
	const queryClient = useQueryClient();

	const queryChatDetails = useQuery(
		["get-Chat-list"],
		() => {
			return ManageChatService.getChat();
		},
		{
			onSuccess: (data: Chat) => {
				console.log("data -->", data);
				if (data?.data) {
					setChatList(data?.data);
				}
			},
		}
	);

	const mutation = useMutation(sentTicket, {
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["get-Chat-list"] });
		},
	});

	useEffect(() => {
		void queryChatDetails.refetch();
	}, [chatList]);

	const handleMessagesent = () => {
		console.log("Message:", message);
		mutation.mutate({ id: idTicket, newMessage: message });
	};

	return (
		<>
			<div
				className="overflow-y-auto"
				style={{
					height: "450px",
				}}
			>
				<MessagesChat
					data={chatList.filter((chat) => chat.ticketId === idTicket)}
				/>
			</div>
			<div
				className="flex flex-row h-30 justify-between"
				style={{ paddingTop: "30px" }}
			>
				<div className="w-full " style={{ marginRight: "10px" }}>
					<TextArea
						data-testid="general-information-investment-summary"
						value={message} // Bind the value of the TextArea to the state
						onChange={(e) => setMessage(e.target.value)} // Update the state on change
						maxLength={1000}
						label={""}
						placeholder="Enter Message"
						wrapperClassName="mt-0"
						required
					/>
				</div>
				<div>
					<IconButton
						bgColor="bg-gold-100 "
						color="#C79E63"
						name="send"
						onClick={() => {
							handleMessagesent();
						}}
						width="50"
						height="full"
					/>
				</div>
			</div>
		</>
	);
};
