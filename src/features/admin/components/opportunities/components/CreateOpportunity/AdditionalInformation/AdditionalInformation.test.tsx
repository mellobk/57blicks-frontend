import "@testing-library/jest-dom";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OpportunitySchema } from "@/features/admin/components/opportunities/schemas/OpportunitySchema";
import type { Opportunity } from "@/features/admin/components/opportunities/types/fields";
import { defaultValues } from "@/features/admin/components/opportunities/utils/values";
import { AdditionalInformation } from "./AdditionalInformation";

const DATA_TEST_IDS = {
	additionalInformation: "additional-information",
};

const FORM_DATA = {
	additionalInformation:
		"A brief summary of the investment opportunity, within 2000 characters",
};

const WrappedAdditionalInformation: React.FC = () => {
	const {
		formState: { errors },
		register,
	} = useForm<Opportunity>({
		defaultValues,
		resolver: zodResolver(OpportunitySchema),
	});

	return <AdditionalInformation errors={errors} register={register} />;
};

describe("AdditionalInformation", () => {
	it("renders without crashing", () => {
		render(<WrappedAdditionalInformation />);
		expect(screen.getByTestId(DATA_TEST_IDS.additionalInformation)).toBeInTheDocument();
	});

	Object.entries(DATA_TEST_IDS).forEach(([key, testId]) => {
		it(`registers ${key} input correctly`, () => {
			render(<WrappedAdditionalInformation />);
			expect(screen.getByTestId(testId)).toBeInTheDocument();
		});
	});

	Object.entries(FORM_DATA).forEach(([key, value]) => {
		it(`sets ${key} form value correctly`, async () => {
			render(<WrappedAdditionalInformation />);

			const testId = DATA_TEST_IDS[key as keyof typeof DATA_TEST_IDS];
			const element = screen.getByTestId(testId);

			if (element.className.includes("p-dropdown")) {
				void userEvent.click(element);

				const option = await screen.findByText(value);
				void userEvent.click(option);

				expect(screen.getByText(value)).toBeInTheDocument();
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
