import type { Meta, StoryObj } from "@storybook/react";
import "@/utils/story-book-css-export.ts";
import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
	component: Modal,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const ModalStandard: Story = {
	args: {
		visible: true,
	},
};
