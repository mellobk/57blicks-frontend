import { type FC, useEffect, useState, useMemo, useCallback } from "react";
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
	internal?: boolean;
}

export const ChatBox: FC<Props> = ({ idTicket, internal = false }) => {
	const [chatList, setChatList] = useState<Array<Chat>>([]);
	const [message, setMessage] = useState<string>("");
	const queryClient = useQueryClient();
	const queryKey = useMemo(() => ["get-Chat-list"], []);

	const fetchChatList = useCallback(() => ManageChatService.getChat(), []);

	const queryChatDetails = useQuery(queryKey, fetchChatList, {
		onSuccess: useCallback(
			(data: Chat) => {
				if (data?.data) {
					setChatList(
						data?.data?.filter((chat) => chat.isInternal === internal)
					);
				}
			},
			[internal]
		),
	});

	const mutation = useMutation(sentTicket, {
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["get-Chat-list"] });
		},
	});

	useEffect(() => {
		void queryChatDetails.refetch();
	}, []);

	const handleMessagesent = () => {
		console.log("Message:", message);
		const isInternal = internal ? true : false;
		mutation.mutate({ id: idTicket, newMessage: message, isInternal });
	};

	return (
		<>
			<div
				className="overflow-y-auto"
				style={{
					height: "400px",
				}}
			>
				<MessagesChat
					data={chatList.filter((chat) => chat.ticketId === idTicket)}
				/>
			</div>
			<div
				className="flex flex-row h-30 justify-between"
				style={{ paddingTop: "50px" }}
			>
				<div className="w-full " style={{ marginRight: "10px" }}>
					<TextArea
						data-testid="general-information-investment-summary"
						value={message}
						onChange={(event) => setMessage(event.target.value)}
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
						name={mutation.isLoading ? "loading" : "send"}
						onClick={() => {
							handleMessagesent();
						}}
						width="30"
						height="full"
					/>
				</div>
			</div>
		</>
	);
};
