import type { ReactElement } from "react";
import ArrowDown from "@/assets/icons/arrow-down";
import ArrowLeft from "@/assets/icons/arrow-left";
import Bank from "@/assets/icons/bank";
import Clock from "@/assets/icons/clock";
import CloseEye from "@/assets/icons/close-eye";
import CloseEyes from "@/assets/icons/closes-eyes";
import Column from "@/assets/icons/column";
import Date from "@/assets/icons/date";
import DeleteBack from "@/assets/icons/delete-back";
import Loading from "@/assets/icons/loading";
import MenuTable from "@/assets/icons/menu-table";
import MoneyBag from "@/assets/icons/money-bag";
import Notification from "@/assets/icons/notification";
import Ok from "@/assets/icons/ok";
import Open from "@/assets/icons/open";
import OpenEye from "@/assets/icons/open-eye";
import Plus from "@/assets/icons/plus";
import Search from "@/assets/icons/search";
import Shield from "@/assets/icons/shield";
import Star from "@/assets/icons/star";
import TrashBin from "@/assets/icons/trash-bin";
import User from "@/assets/icons/user";
import Wrong from "@/assets/icons/wrong";
import IconNames from "./IconNames";

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
		moneyBag: {
			name: "moneyBag",
			icon: <MoneyBag width={width} color={color} />,
		},
		notification: {
			name: "notification",
			icon: <Notification width={width} color={color} />,
		},
		ok: {
			name: "ok",
			icon: <Ok width={width} color={color} />,
		},
		open: {
			name: "open",
			icon: <Open width={width} color={color} />,
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
