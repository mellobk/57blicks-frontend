import type { Meta, StoryObj } from "@storybook/react";
import Icon from "./Icon";
import IconNames from "./IconNames";

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
			{IconNames?.map((value, key) => {
				return (
					<div
						key={key}
						style={{
							display: "flex",
							gap: "5px",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Icon name={value} />
						<div>{value}</div>
					</div>
				);
			})}
		</div>
	),
};
