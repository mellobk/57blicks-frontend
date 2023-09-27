import type { Meta, StoryObj } from "@storybook/react";
import { AuthenticateCode } from "./AuthenticateCode.tsx";
import "@/utils/story-book-css-export.ts";

const meta: Meta<typeof AuthenticateCode> = {
	component: AuthenticateCode,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AuthenticateCode>;

export const Standard: Story = {
	args: {
		handleOnChange: () => {
			return;
		},
		label: "Authenticate Code",
		required: true,
	},
};
