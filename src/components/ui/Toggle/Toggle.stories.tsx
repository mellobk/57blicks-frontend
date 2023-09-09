import type { Meta, StoryObj } from "@storybook/react";
import "../../../styles/tailwind.css";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
	component: Toggle,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const CheckedFalse: Story = {
	args: {
		checked: false,
		onChecked: (value) => {
			console.log(value);
		},
	},
};

export const CheckedTrue: Story = {
	args: {
		checked: true,
		onChecked: (value) => {
			console.log(value);
		},
		checkedClassName: "bg-primary-500",
		checkLabel: "Checked",
		checkLabelClassName: "checkLabelClassName",
	},
};
