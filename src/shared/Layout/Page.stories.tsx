import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './Page';
import { PageHeader } from './PageHeader';

const meta = {
  component: Page,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

const Placeholder = () => (
  <div className="flex w-full border-3 border-dashed border-gray">
    <div className="flex items-center justify-center min-h-200">
      <h1 className="font-md">Placeholder</h1>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    children: [
      <PageHeader
        key="1"
        title="Software Frontend Developer"
        description="Specialization: JavaScript, TypeScript, React, Nextjs"
      />,
      <Placeholder key="2" />,
      <Placeholder key="3" />,
    ],
  },
};

export const WithCustomWidth: Story = {
  args: {
    ...Default.args,
    maxW: 'container.md',
  },
};
