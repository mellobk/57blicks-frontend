import type {Meta, StoryObj,} from '@storybook/react';
import { AuthenticateCode } from './AuthCode.tsx';
import '../../utils/StoryBookCssExport.tsx'


const meta: Meta<typeof AuthenticateCode> = {
    component: AuthenticateCode,
    tags: ['autodocs',],
};

export default meta;
type Story = StoryObj<typeof AuthenticateCode>;

export const Standard: Story = {
    args: {
        handleOnChange:()=>{return ''},
        title: 'Authenticate Code',
        required: true,
    },
};


