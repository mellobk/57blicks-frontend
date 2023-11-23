import "@testing-library/jest-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";

import { AddParticipant } from "./AddParticipant";
import InvestorsService from "@/api/investors";
import React from "react";
import userEvent from "@testing-library/user-event";

interface Props {
	openModal?: boolean;
}

jest.mock("@/api/investors.ts", () => ({
	__esModule: true,
	default: {
		getInvestors: jest.fn(),
	},
}));

const mockAppend = jest.fn();
const mockSetOpenModal = jest.fn();

const WrappedAddParticipant: React.FC<Props> = ({ openModal = true }) => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<AddParticipant
				append={mockAppend}
				openModal={openModal}
				setOpenModal={mockSetOpenModal}
			/>
		</QueryClientProvider>
	);
};

describe("AddParticipant", () => {
	beforeEach(() => {
		jest.resetAllMocks();
		(InvestorsService.getInvestors as jest.Mock).mockResolvedValue([
			{ id: "1", user: { firstName: "John", lastName: "Doe" } },
			{ id: "2", user: { firstName: "Jane", lastName: "Doe" } },
		]);
	});

	it("renders correctly when openModal is true", () => {
		render(<WrappedAddParticipant />);
		expect(screen.getByText("Participant")).toBeInTheDocument();
	});

	it("does not render when openModal is false", () => {
		render(<WrappedAddParticipant openModal={false} />);
		expect(screen.queryByText("Participant")).not.toBeInTheDocument();
	});

	it("renders the select and button", () => {
		render(<WrappedAddParticipant />);
		expect(screen.getByTestId("add-participant-select")).toBeInTheDocument();
		expect(screen.getByTestId("add-participant-button")).toBeInTheDocument();
	});

	it("updates selected participant on select change", async () => {
		render(<WrappedAddParticipant />);

		const dropdown = await screen.findByTestId("add-participant-select");
		void userEvent.click(dropdown);

		const option = await screen.findByText("Jane Doe");
		void userEvent.click(option);

		expect(screen.getByText("Jane Doe")).toBeInTheDocument();
	});

	it("calls append and setOpenModal when a participant is added", async () => {
		render(<WrappedAddParticipant />);

		const dropdown = await screen.findByTestId("add-participant-select");
		void userEvent.click(dropdown);

		const option = await screen.findByText("John Doe");
		void userEvent.click(option);

		void userEvent.click(screen.getByText("Add"));

		await waitFor(() => {
			expect(mockAppend).toHaveBeenCalledWith({
				amount: "",
				investorId: "1",
				lenderName: "John Doe",
				prorated: "0",
				rate: "",
				regular: "0",
				type: "Servicing",
			});
		});
		expect(mockSetOpenModal).toHaveBeenCalledWith(false);
	});

	it("does not call append and setOpenModal when selected participant is undefined", async () => {
		render(<WrappedAddParticipant />);

		void userEvent.click(screen.getByText("Add"));

		expect(mockAppend).not.toBeCalled();
		expect(mockSetOpenModal).not.toBeCalled();
	});
});
