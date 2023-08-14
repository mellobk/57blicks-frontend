import React from 'react';
import IconTemplate from './icons';
import { Meta, StoryObj } from '@storybook/react';
import IconList from './icon-list';
import { Icon } from '@/presentation/components';

const meta: Meta<typeof IconTemplate> = {
  component: IconTemplate
};

export default meta;
type Story = StoryObj<typeof meta>;

export const IconItem: Story = {
  args: {
    name: 'search',
    width: '40',
    color: 'red'
  }
};

export const IconLists: Story = {
  render: args => <IconList />
};
