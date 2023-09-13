import type { Meta, StoryObj } from "@storybook/react";
import "@/utils/story-book-css-export.ts";
import { SuccessModal } from "./SuccessModal.tsx";

const meta: Meta<typeof SuccessModal> = {
	component: SuccessModal,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SuccessModal>;

export const ModalStandard: Story = {
	args: {
		description: "Description",
		openModal: true,
		title: "Title",
	},
};
