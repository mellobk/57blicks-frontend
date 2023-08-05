import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'primereact/button';

import { InternalServerErrorResult } from './InternalServerErrorResult';

const meta = {
  component: InternalServerErrorResult,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof InternalServerErrorResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    children: <Button>Try again</Button>,
  },
};
