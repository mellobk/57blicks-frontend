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
    buttonText: "Button Primary",
    className: "bg-primary-500",
    disabled: false,
    iconName: "user",
    loading: false,
  },
};

export const ButtonLoading: Story = {
	args: {
    buttonText: "Button Primary",
    className: "w-full",
    disabled: false,
    iconName: "user",
    loading: true,
  },
};

export const ButtonDisabled: Story = {
	args: {
    buttonText: "Button Primary",
    className: "w-full",
    disabled: true,
    iconName: "user",
    loading: false,
  },
};

export const ButtonColor: Story = {
	args: {
    buttonText: "Button Primary",
    className: "w-full",
    disabled: false,
    iconName: "user",
    loading: false,
  },
};
