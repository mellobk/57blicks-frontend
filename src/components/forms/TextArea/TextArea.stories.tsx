import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea.tsx";
import "../../../styles/tailwind.css";

const meta: Meta<typeof TextArea> = {
	component: TextArea,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const NormalTextArea: Story = {
	args: {
		label: "Username",
		placeholder: "Placeholder",
		required: false,
		iconName: "",
		error: "",
		defaultValue: "",
		className:
			"placeholder-gray-400 focus:outline-none bg-gray-200 font-normal font-weight-400 leading-normal tracking-wide flex w-full h-10 p-4 items-center self-stretch rounded-md",
		onChange: () => {},
		iconColor: "#000",
	},
};

export const IconTextArea: Story = {
	args: {
		label: "Username",
		placeholder: "Placeholder",
		required: false,
		iconName: "search",
		error: "",
		defaultValue: "",
		className:
			"placeholder-gray-400 focus:outline-none bg-gray-200 font-normal font-weight-400 leading-normal tracking-wide flex w-full h-10 p-4 items-center self-stretch rounded-md",
		onChange: () => {},
		iconColor: "#000",
	},
};

export const ErrorTextArea: Story = {
	args: {
		label: "Username",
		placeholder: "Placeholder",
		required: false,
		iconName: "",
		error: "Error message",
	},
};

export const RequiredTextArea: Story = {
	args: {
		label: "Username",
		placeholder: "Placeholder",
		required: true,
		iconName: "",
		error: "",
	},
};
