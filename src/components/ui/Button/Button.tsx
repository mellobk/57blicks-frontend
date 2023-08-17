import { Button as PrimeReactButton } from "primereact/button";
import IconTemplate from "../../../assets/icons/icons.tsx";

interface AvatarProps {
	loading?: boolean;
    disabled?: boolean;
	iconName?: string;
	text?: string;
	onClick?: () => void;
	className?: string;
    color?: string;
}

const Button: React.FC<AvatarProps> = ({
	loading,
    disabled,
	iconName = "",
	text,
	onClick,
	className,
    color='#0e2130'
}) => {

	return (
		<PrimeReactButton
			onClick={onClick}
            disabled={loading ||disabled}
            style={{backgroundColor: color}}
			className={` w-full ${className}`}
		>
           
			<div className="w-full flex flex-row items-center justify-center gap-2">
            { loading ? <IconTemplate name="loader" width="25" color="white"/> :
            <>
            <div>{iconName && <IconTemplate name={iconName} width="25" color="white"/>}</div>
				{text}
            </> }
				
			</div>
		</PrimeReactButton>
	);
};

export default Button;
