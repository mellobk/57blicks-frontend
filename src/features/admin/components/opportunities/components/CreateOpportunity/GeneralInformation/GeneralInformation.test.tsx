import "@testing-library/jest-dom";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OpportunitySchema } from "@/features/admin/components/opportunities/schemas/OpportunitySchema";
import type { Opportunity } from "@/features/admin/components/opportunities/types/fields";
import { defaultValues } from "@/features/admin/components/opportunities/utils/values";
import { GeneralInformation } from "./GeneralInformation";

const DATA_TEST_IDS = {
  postTitle: "general-information-post-title",
  investmentCollateral: "general-information-investment-collateral",
  googleDriveLink: "general-information-google-drive-link",
  image: "general-information-image",
  investmentSummary: "general-information-investment-summary",
};

const FORM_DATA = {
  postTitle: "Amazing Investment Opportunity",
  investmentCollateral: "Property or Asset Details",
  googleDriveLink: "https://drive.google.com/drive/folders/example",
  image: "path/to/image.jpg",
  investmentSummary: "A brief summary of the investment opportunity, within 2000 characters.",
};

const WrappedGeneralInformation: React.FC = () => {
	const {
		formState: { errors },
		register,
	} = useForm<Opportunity>({
		defaultValues,
		resolver: zodResolver(OpportunitySchema),
	});

	return <GeneralInformation errors={errors} register={register} />;
};

describe("GeneralInformation", () => {
	it("renders without crashing", () => {
		render(<WrappedGeneralInformation />);
		expect(screen.getByText("General Information")).toBeInTheDocument();
	});

	Object.entries(DATA_TEST_IDS).forEach(([key, testId]) => {
		it(`registers ${key} input correctly`, () => {
			render(<WrappedGeneralInformation />);
			expect(screen.getByTestId(testId)).toBeInTheDocument();
		});
	});

	Object.entries(FORM_DATA).forEach(([key, value]) => {
		it(`sets ${key} form value correctly`, async () => {
			render(<WrappedGeneralInformation />);

			const testId = DATA_TEST_IDS[key as keyof typeof DATA_TEST_IDS];
			const element: HTMLInputElement = screen.getByTestId(testId);

			if (element.className.includes("p-dropdown")) {
				void userEvent.click(element);

				const option = await screen.findByText(value);
				void userEvent.click(option);

				expect(screen.getByText(value)).toBeInTheDocument();
			} else if (element.type === "file") {
        const file = new File(['(⌐□_□)'], 'image.png', { type: 'image/png' });

        fireEvent.change(element, { target: { files: [file] } });

        expect(element.files?.[0]).toBe(file);
        expect(element.files).toHaveLength(1);
			} else if (element.className.includes("p-inputmask")) {
				fireEvent.change(element, { target: { value } });
				expect(element).toHaveValue(value);
			} else {
				await userEvent.type(element, String(value));
				expect(element).toHaveValue(value);
			}
		});
	});
});
