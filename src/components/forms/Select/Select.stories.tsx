import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";
import "@/utils/story-book-css-export";
import "@/styles/tailwind.css";

const meta: Meta<typeof Select> = {
	component: Select,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

const OPTIONS = [
	{ name: "Saving", code: "Saving" },
	{ name: "Checking", code: "Checking" },
];

export const NormalSelect: Story = {
	args: {
		options: OPTIONS,
	},
};
