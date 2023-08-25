import type { Meta, StoryObj } from "@storybook/react";
import "@/utils/StoryBookCssExport.tsx";
import { Button } from "./Button.tsx";

const meta: Meta<typeof Button> = {
	component: Button,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const ButtonStandar: Story = {
	args: {
		loading: false,
		iconName: "user",
		text: "Button Primary",
		disabled: false,
		className: "bg-primary-500",
	},
};

export const ButtonLoading: Story = {
	args: {
		loading: true,
		iconName: "user",
		text: "Button Primary",
		disabled: false,
		className: "w-full",
	},
};

export const ButtonDisabled: Story = {
	args: {
		loading: false,
		iconName: "user",
		text: "Button Primary",
		disabled: true,
		className: "w-full",
	},
};

export const ButtonColor: Story = {
	args: {
		loading: false,
		iconName: "user",
		text: "Button Primary",
		disabled: false,
		className: "w-full",
	},
};
