import type { Meta, StoryObj } from "@storybook/react";
import "../../../styles/tailwind.css";
import { MaskInput } from ".";

const meta: Meta<typeof MaskInput> = {
	component: MaskInput,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MaskInput>;

export const NormalInput: Story = {
	args: {
		label: "Username",
		placeholder: "Placeholder",
		required: false,
		mask: "99-999999",
		iconName: "",
		error: "",
		defaultValue: "",
		className:
			"placeholder-gray-400 focus:outline-none bg-gray-200 font-normal font-weight-400 leading-normal tracking-wide flex w-full h-10 p-4 items-center self-stretch rounded-md",
		onChange: () => {},
		iconColor: "#000",
	},
};

export const IconInput: Story = {
	args: {
		label: "Username",
		placeholder: "Placeholder",
		required: false,
		iconName: "search",
		error: "",
		mask: "99-999999",
		defaultValue: "",
		className:
			"placeholder-gray-400 focus:outline-none bg-gray-200 font-normal font-weight-400 leading-normal tracking-wide flex w-full h-10 p-4 items-center self-stretch rounded-md",
		onChange: () => {},
		iconColor: "#000",
	},
};

export const ErrorInput: Story = {
	args: {
		label: "Username",
		placeholder: "Placeholder",
		required: false,
		iconName: "",
		mask: "99-999999",
		error: "Error message",
	},
};

export const RequiredInput: Story = {
	args: {
		label: "Username",
		placeholder: "Placeholder",
		required: true,
		iconName: "",
		mask: "99-999999",
		error: "",
	},
};
