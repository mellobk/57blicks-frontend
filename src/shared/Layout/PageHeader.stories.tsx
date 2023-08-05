import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'primereact/button';

import { PageHeader } from './PageHeader';

const meta = {
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Software Frontend Developer',
    description: 'Specialization: JavaScript, TypeScript, React, Nextjs',
    children: (
      <>
        <Button outlined className="pi pi-external-link" severity="info">
          See profile
        </Button>
        <Button severity="info" className="pi pi-comment">
          Contact
        </Button>
      </>
    ),
  },
};

export const LgSize: Story = {
  args: {
    ...Default.args,
  },
};
