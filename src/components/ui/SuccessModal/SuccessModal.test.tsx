import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { SuccessModal } from "./SuccessModal";

const mockSetOpenModal = jest.fn();
const mockOnClick = jest.fn();

describe("SuccessModal", () => {
	it("renders correctly when openModal is true", () => {
		render(
			<SuccessModal
				title="Success!"
				openModal={true}
				setOpenModal={mockSetOpenModal}
			/>
		);
		expect(screen.getByText("Success!")).toBeInTheDocument();
	});

	it("does not render when openModal is false", () => {
		render(
			<SuccessModal
				title="Success!"
				openModal={false}
				setOpenModal={mockSetOpenModal}
			/>
		);
		expect(screen.queryByText("Success!")).not.toBeInTheDocument();
	});

	it("displays the description when provided", () => {
		const description = "Everything went well!";

		render(
			<SuccessModal
				description={description}
				title="Success!"
				openModal={true}
				setOpenModal={mockSetOpenModal}
			/>
		);
		expect(screen.getByTestId("success-modal-description")).toHaveTextContent(
			description
		);
	});

	it("does not display a description when none is provided", () => {
		render(
			<SuccessModal
				title="Success!"
				openModal={true}
				setOpenModal={mockSetOpenModal}
			/>
		);
		expect(
			screen.getByTestId("success-modal-description")
		).toBeEmptyDOMElement();
	});

	it("calls onClick when the button is clicked and onClick is provided", () => {
		render(
			<SuccessModal
				title="Success!"
				openModal={true}
				setOpenModal={mockSetOpenModal}
				onClick={mockOnClick}
			/>
		);
		fireEvent.click(screen.getByTestId("success-modal-button"));
		expect(mockOnClick).toHaveBeenCalled();
	});

	it("calls setOpenModal with false when the button is clicked and onClick is not provided", () => {
		render(
			<SuccessModal
				title="Success!"
				openModal={true}
				setOpenModal={mockSetOpenModal}
			/>
		);
		fireEvent.click(screen.getByTestId("success-modal-button"));
		expect(mockSetOpenModal).toHaveBeenCalledWith(false);
	});

	it("closes the modal when the button is clicked", () => {
		render(
			<SuccessModal
				title="Success!"
				openModal={true}
				setOpenModal={mockSetOpenModal}
			/>
		);
		fireEvent.click(screen.getByTestId("success-modal-button"));
		expect(mockSetOpenModal).toHaveBeenCalledWith(false);
	});

	it("renders the success icon with the correct attributes", () => {
		render(
			<SuccessModal
				title="Success!"
				openModal={true}
				setOpenModal={mockSetOpenModal}
			/>
		);

		const iconId = screen.getByTestId("success-modal-icon");
		expect(iconId).toHaveAttribute("color", "#00BA35");
		expect(iconId).toHaveAttribute("name", "success");
		expect(iconId).toHaveAttribute("width", "200");
	});

	it("matches the snapshot", () => {
		const { asFragment } = render(
			<SuccessModal
				title="Snapshot Test"
				openModal={true}
				setOpenModal={mockSetOpenModal}
			/>
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
