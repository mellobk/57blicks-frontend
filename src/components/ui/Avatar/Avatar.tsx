import type { FC } from "react";
import { Avatar as PrimeReactAvatar } from "primereact/avatar";
import IconTemplate from "@/assets/icons/icons.tsx";
import "./Avatar.css";

interface AvatarProps {
	image?: string;
	name?: string | null;
}

export const Avatar: FC<AvatarProps> = ({ image, name = null }) => {
	const getLabel = () => {
		if (!name) return "";

		const initials = name
			.split(" ")
			.map((part) => part.charAt(0).toUpperCase())
			.join("");
		return initials.length > 2 ? initials.slice(0, 2) : initials;
	};

	return (
		<PrimeReactAvatar
			image={image}
			label={getLabel()}
			icon={<IconTemplate name="user" color="white" />}
			shape="circle"
      className={!image && !name ? 'avatar-icon bg-opacity-20 p-2 ': ''}
		/>
	);
};
