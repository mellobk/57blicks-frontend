import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from "./SearchBar.tsx";
import "../../../styles/tailwind.css";

const meta: Meta<typeof SearchBar> = {
	component: SearchBar,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const ClosedSearchBar: Story = {
	args: {
		value: "",
	},
};

export const OpenedSearchBar: Story = {
	args: {
		value: "Opened",
	},
};
