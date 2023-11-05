import "@testing-library/jest-dom";

import React from "react";
import { useForm } from "react-hook-form";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Loan } from "@/features/admin/components/create-loan/types/fields";
import { defaultValues } from "@/features/admin/components/create-loan/utils/values.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoanSchema } from "@/features/admin/components/create-loan/schemas/LoanSchema.ts";
import { SelectLender } from "./SelectLender";

interface Props {
	openModal?: boolean;
}

jest.mock("@/features/admin/components/create-loan/utils/selects", () => ({
	LENDERS: [
		{ name: "Lender A", code: "lender_a" },
		{ name: "Lender B", code: "lender_b" },
	],
}));

const mockSetOpenModal = jest.fn();

const WrapperSelectLender: React.FC<Props> = ({ openModal = true }) => {
	const { control, setValue } = useForm<Loan>({
		defaultValues,
		resolver: zodResolver(LoanSchema),
	});

	return (
		<SelectLender
			control={control}
			openModal={openModal}
			setOpenModal={mockSetOpenModal}
			setValue={setValue}
		/>
	);
};

describe("SelectLender", () => {
	it("renders correctly when openModal is true", () => {
		render(<WrapperSelectLender />);
		expect(screen.getByText("Select Lender")).toBeInTheDocument();
	});

	it("does not render when openModal is false", () => {
		render(<WrapperSelectLender openModal={false} />);
		expect(screen.queryByText("Select Lender")).not.toBeInTheDocument();
	});

	it("renders the select and button", () => {
		render(<WrapperSelectLender />);
		expect(screen.getByTestId("select-lender-select")).toBeInTheDocument();
		expect(screen.getByTestId("select-lender-button")).toBeInTheDocument();
	});

	it("updates selected lender on select change", async () => {
		render(<WrapperSelectLender />);

		const dropdown = screen.getByTestId("select-lender-select");
		void userEvent.click(dropdown);

		const option = await screen.findByText("Lender B");
		void userEvent.click(option);

		const label = screen.getByText("Lender B");
		expect(label).toBeInTheDocument();
	});

	it("calls setOpenModal with false when the select button is clicked", async () => {
		render(<WrapperSelectLender />);
		fireEvent.click(screen.getByTestId("select-lender-button"));
		expect(mockSetOpenModal).toHaveBeenCalledWith(false);
	});
});
