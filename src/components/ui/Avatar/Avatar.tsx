import {Avatar as PrimeReactAvatar} from 'primereact/avatar';
import IconTemplate from "../../../assets/icons/icons.tsx";
import '../../utils/StoryBookCssExport.tsx'
interface AvatarProps {
    image?: string;
    name?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({image, name = null}) => {
    const getLabel = () => {
        if (!name) return "";

        const initials = name.split(' ').map(part => part.charAt(0).toUpperCase()).join('');
        return initials.length > 2 ? initials.substring(0, 2) : initials;
    };

    return <PrimeReactAvatar
        image={image}
        label={getLabel()}
        icon={<IconTemplate name="user"/>}
        shape="circle"
        size="large"
        className={!image && !name ? 'bg-opacity-20 p-2': ''}
    />
}

export default Avatar;
