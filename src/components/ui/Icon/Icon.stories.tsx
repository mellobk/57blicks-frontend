import type { Meta, StoryObj } from "@storybook/react";
import { Icon, ICONS } from "./Icon";

const meta: Meta<typeof Icon> = {
	component: Icon,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const IconItem: Story = {
	args: {
		name: "search",
		width: "40",
		color: "red",
	},
};

export const IconLists: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "5px", textAlign: "center" }}>
			{Object.keys(ICONS).map((value, key) => (
				<div
					key={key}
					style={{
						display: "flex",
						gap: "5px",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Icon name={value as keyof typeof ICONS} />
					<div>{value}</div>
				</div>
			))}
		</div>
	),
};
