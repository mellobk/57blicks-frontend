import "@testing-library/jest-dom";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoanSchema } from "@/features/admin/components/create-loan/schemas/LoanSchema";
import type { Loan } from "@/features/admin/components/create-loan/types/fields";
import { defaultValues } from "@/features/admin/components/create-loan/utils/values";
import { BorrowerInformation } from "./BorrowerInformation";

const DATA_TEST_IDS = {
  borrowerLLC: "borrower-information-llc",
  firstName: "borrower-information-first-name",
  lastName: "borrower-information-last-name",
  phoneNumber: "borrower-information-phone-number",
  emailAddress: "borrower-information-email",
  ssnEin: "borrower-Information-ssn-ein",
  mailingAddress: "borrower-Information-mailing-address",
};

const FORM_DATA = {
  borrowerLLC: "Lender B",
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "(555) 555-5555",
  emailAddress: "john.doe@example.com",
  ssnEin: "123456789",
  mailingAddress: "123 Main St, Anytown, USA",
};

jest.mock("@/features/admin/components/create-loan/utils/selects", () => ({
  LENDERS: [
    { code: "1", name: "Lender A" },
    { code: "2", name: "Lender B" },
  ],
}));

const WrappedBorrowerInformation: React.FC = () => {
  const {
    control,
    formState: { errors },
    register,
  } = useForm<Loan>({
    defaultValues,
    resolver: zodResolver(LoanSchema),
  });

  return (
    <BorrowerInformation control={control} errors={errors} register={register} />
  );
};

describe("BorrowerInformation", () => {
  it("renders without crashing", () => {
    render(<WrappedBorrowerInformation />);
    expect(screen.getByText("Borrower Information")).toBeInTheDocument();
  });

  Object.entries(DATA_TEST_IDS).forEach(([key, testId]) => {
    it(`registers ${key} input correctly`, () => {
      render(<WrappedBorrowerInformation />);
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
  });

  Object.entries(FORM_DATA).forEach(([key, value]) => {
    it(`sets ${key} form value correctly`, async () => {
      render(<WrappedBorrowerInformation />);

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
