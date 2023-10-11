import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import type { Meta, StoryObj } from "@storybook/react";
import { Title } from "./Title";
import "../../../styles/tailwind.css";

const meta: Meta<typeof Title> = {
	component: Title,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Title>;

export const NormalTitle: Story = {
	args: {
		text: "Title",
	},
};

export const ColorTitle: Story = {
	args: {
		color: "text-gold-500",
		text: "Color Title",
	},
};
