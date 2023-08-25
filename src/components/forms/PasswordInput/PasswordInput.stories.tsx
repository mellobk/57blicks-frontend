import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from "./PasswordInput";

const meta: Meta<typeof PasswordInput> = {
	component: PasswordInput,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const IconPasswordInput: Story = {
	args: {
		label: "Username",
		placeholder: "Placeholder",
		required: false,
		passWordValidations: [],
		error: "",
	},
};

export const IconPasswordInputGood: Story = {
	args: {
		label: "Username",
		placeholder: "Placeholder",
		required: false,
		passWordValidations: [
			{ message: "Must be at least 8 characters", complete: true },
			{ message: "Must be at least 8 characters", complete: true },
			{ message: "Must be at least 8 characters", complete: false },
		],
		error: "",
	},
};

export const IconPasswordInputGreat: Story = {
	args: {
		label: "Username",
		placeholder: "Placeholder",
		required: false,
		passWordValidations: [
			{ message: "Must be at least 8 characters", complete: true },
			{ message: "Must be at least 8 characters", complete: true },
			{ message: "Must be at least 8 characters", complete: true },
		],
		error: "",
	},
};

export const ErrorPasswordInput: Story = {
	args: {
		label: "Username",
		placeholder: "Placeholder",
		required: false,
		passWordValidations: [
			{ message: "Must be at least 8 characters", complete: true },
			{ message: "Must be at least 8 characters", complete: false },
			{ message: "Must be at least 8 characters", complete: false },
		],
		error: "Error message",
	},
};

export const RequiredPasswordInput: Story = {
	args: {
		label: "Username",
		placeholder: "Placeholder",
		required: true,
		passWordValidations: [
			{ message: "Must be at least 8 characters", complete: true },
			{ message: "Must be at least 8 characters", complete: false },
			{ message: "Must be at least 8 characters", complete: false },
		],
		error: "",
	},
};
