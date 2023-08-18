import type {Meta, StoryObj} from '@storybook/react';
import { Avatar } from './Avatar';
import '../../../styles/tailwind.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';     
import 'primereact/resources/primereact.min.css';



const meta: Meta<typeof Avatar> = {
    component: Avatar,
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const ImageAvatar: Story = {
    args: {
        image: '../../src/assets/images/png/loginBg.png',
    }
};

export const NameAvatar: Story = {
    args: {
        name: 'John Doe',
    }
};

export const IconAvatar: Story = {
    args: {}
};


