import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';


const meta: Meta<typeof Input> = {
  component: Input,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Input>;

export const NormalInput: Story = {
  args: {
    label: 'Username',
    placeHolder: 'Placeholder',
    required: false,
    iconName: '',
    error: '',
  }
};

export const IconInput: Story = {
    args: {
      label: 'Username',
      placeHolder: 'Placeholder',
      required: false,
      iconName: 'search',
      error: '',
    }
  };
  
  export const ErrorInput: Story = {
    args: {
      label: 'Username',
      placeHolder: 'Placeholder',
      required: false,
      iconName: '',
      error: 'Error message',
    }
  };
  

  export const RequiredInput: Story = {
    args: {
      label: 'Username',
      placeHolder: 'Placeholder',
      required: false,
      iconName: '',
      error: 'Error message',
    }
  };
  

