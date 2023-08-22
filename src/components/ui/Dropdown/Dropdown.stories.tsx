import { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import '../../../styles/tailwind.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

type Story = StoryObj<typeof Dropdown>;

export const NormalDropdown: Story = {
	args: {
    options: [
      { label: 'First', value: 1 },
      { label: 'Second', value: 2 },
    ],
    // value: 1,
    placeholder: 'Placeholder',
  },
};

const meta: Meta<typeof Dropdown> = {
	component: Dropdown,
	tags: ['autodocs'],
};

export default meta;
