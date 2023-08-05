import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'primereact/button';

import { InternalErrorResult } from './InternalErrorResult';

const meta = {
  component: InternalErrorResult,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof InternalErrorResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    children: <Button>Try again</Button>,
  },
};
