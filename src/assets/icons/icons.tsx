import type { FC } from "react";
import IconItems from "./icon-dictionary";

type Props = {
	name: string;
	width?: string;
	color?: string;
};

const IconTemplate: FC<Props> = ({ name, width, color }: Props) => {
	return <IconItems name={name} width={width} color={color} />;
};

export default IconTemplate;
