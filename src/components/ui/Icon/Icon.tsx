import type { ReactElement } from "react";
import ArrowDown from "@/assets/icons/arrow-down.tsx";
import ArrowLeft from "@/assets/icons/arrow-left.tsx";
import Bank from "@/assets/icons/bank.tsx";
import Clock from "@/assets/icons/clock.tsx";
import CloseEye from "@/assets/icons/close-eye.tsx";
import CloseEyes from "@/assets/icons/closes-eyes.tsx";
import Column from "@/assets/icons/column.tsx";
import Date from "@/assets/icons/date.tsx";
import DeleteBack from "@/assets/icons/delete-back.tsx";
import Loading from "@/assets/icons/loading.tsx";
import MenuTable from "@/assets/icons/menu-table.tsx";
import Notification from "@/assets/icons/notification.tsx";
import Ok from "@/assets/icons/ok.tsx";
import OpenEye from "@/assets/icons/open-eye.tsx";
import Plus from "@/assets/icons/plus.tsx";
import Search from "@/assets/icons/search.tsx";
import Shield from "@/assets/icons/shield.tsx";
import Star from "@/assets/icons/star.tsx";
import TrashBin from "@/assets/icons/trash-bin.tsx";
import User from "@/assets/icons/user.tsx";
import Wrong from "@/assets/icons/wrong.tsx";
import IconNames from "./IconNames.tsx";

interface Props {
	name: (typeof IconNames)[number];
	width?: string;
	color?: string;
}

interface IconProps {
	name: string;
	icon: ReactElement;
}

interface IconMap {
	[key: string]: IconProps;
}

const Icon = ({ name, width, color }: Props): ReactElement => {
	const icons: IconMap = {
		arrowDown: {
			name: "arrowDown",
			icon: <ArrowDown width={width} color={color} />,
		},
		arrowLeft: {
			name: "arrowLeft",
			icon: <ArrowLeft width={width} color={color} />,
		},
		bank: {
			name: "bank",
			icon: <Bank width={width} color={color} />,
		},
		clock: {
			name: "clock",
			icon: <Clock width={width} color={color} />,
		},
		closeEye: {
			name: "closeEye",
			icon: <CloseEye width={width} color={color} />,
		},
		closesEyes: {
			name: "closesEyes",
			icon: <CloseEyes width={width} color={color} />,
		},
		column: {
			name: "column",
			icon: <Column width={width} color={color} />,
		},
		date: {
			name: "date",
			icon: <Date width={width} color={color} />,
		},
		deleteBack: {
			name: "deleteBack",
			icon: <DeleteBack width={width} color={color} />,
		},
		loading: {
			name: "loading",
			icon: <Loading width={width} color={color} />,
		},
		menuTable: {
			name: "menuTable",
			icon: <MenuTable width={width} color={color} />,
		},
		notification: {
			name: "notification",
			icon: <Notification width={width} color={color} />,
		},
		ok: {
			name: "ok",
			icon: <Ok width={width} color={color} />,
		},
		openEye: {
			name: "openEye",
			icon: <OpenEye width={width} color={color} />,
		},
		plus: {
			name: "plus",
			icon: <Plus width={width} color={color} />,
		},
		search: {
			name: "search",
			icon: <Search width={width} color={color} />,
		},
		shield: {
			name: "shield",
			icon: <Shield width={width} color={color} />,
		},
		star: {
			name: "star",
			icon: <Star width={width} color={color} />,
		},
		trashBin: {
			name: "trashBin",
			icon: <TrashBin width={width} color={color} />,
		},
		user: {
			name: "user",
			icon: <User width={width} color={color} />,
		},
		wrong: {
			name: "wrong",
			icon: <Wrong width={width} color={color} />,
		},
	};

	return icons[name]?.icon || <></>;
};

export default Icon;
