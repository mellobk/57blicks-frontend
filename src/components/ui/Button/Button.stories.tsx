import type { Meta, StoryObj } from "@storybook/react";
import "@/utils/story-book-css-export";
import { Button } from "./Button";
import { Icon } from "@/components/ui/Icon";

const meta: Meta<typeof Button> = {
	component: Button,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const ButtonStandar: Story = {
	args: {
		buttonText: "Button Primary",
		className: "bg-primary-500",
		disabled: false,
		loading: false,
	},
};

export const ButtonLoading: Story = {
	args: {
		buttonText: "Button Primary",
		className: "w-full",
		disabled: false,
		loading: true,
	},
};

export const ButtonDisabled: Story = {
	args: {
		buttonText: "Button Primary",
		className: "w-full",
		disabled: true,
		loading: false,
	},
};

export const ButtonColor: Story = {
	args: {
		buttonText: "Button Primary",
		className: "w-full",
		disabled: false,
		loading: false,
	},
};

export const ButtonWithIcon: Story = {
	args: {
		buttonText: "Button Primary",
		className: "w-full",
		icon: <Icon name="user" />,
		disabled: false,
		loading: false,
	},
};
