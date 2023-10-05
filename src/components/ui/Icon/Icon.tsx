import { FC } from "react";

import ArrowDown from "@/assets/icons/arrow-down";
import ArrowLeft from "@/assets/icons/arrow-left";
import Bank from "@/assets/icons/bank";
import Cellphone from "@/assets/icons/cellphone";
import Chart from "@/assets/icons/chart";
import Clock from "@/assets/icons/clock";
import ClockReverse from "@/assets/icons/clock-reverse";
import Close from "@/assets/icons/close";
import CloseEye from "@/assets/icons/close-eye";
import CloseEyes from "@/assets/icons/closes-eyes";
import Column from "@/assets/icons/column";
import Date from "@/assets/icons/date";
import DeleteBack from "@/assets/icons/delete-back";
import DoorOut from "@/assets/icons/door-out";
import Download from "@/assets/icons/download";
import Email from "@/assets/icons/email";
import Hamburger from "@/assets/icons/hamburger";
import LinkCopy from "@/assets/icons/link-copy";
import Loading from "@/assets/icons/loading";
import MenuTable from "@/assets/icons/menu-table";
import MoneyBag from "@/assets/icons/money-bag";
import Note from "@/assets/icons/note";
import Notification from "@/assets/icons/notification";
import Ok from "@/assets/icons/ok";
import Open from "@/assets/icons/open";
import OpenEye from "@/assets/icons/open-eye";
import PasswordProfile from "@/assets/icons/password-profile";
import Plus from "@/assets/icons/plus";
import Search from "@/assets/icons/search";
import Shield from "@/assets/icons/shield";
import Star from "@/assets/icons/star";
import Success from "@/assets/icons/success";
import TimeUsage from "@/assets/icons/time-usage";
import TrashBin from "@/assets/icons/trash-bin";
import Upload from "@/assets/icons/upload";
import User from "@/assets/icons/user";
import UserProfile from "@/assets/icons/user-profile";
import Wrong from "@/assets/icons/wrong";

export const ICONS = {
	arrowDown: ArrowDown,
	arrowLeft: ArrowLeft,
	bank: Bank,
	cellphone: Cellphone,
	chart: Chart,
	clock: Clock,
	clockReverse: ClockReverse,
	close: Close,
	closeEye: CloseEye,
	closesEyes: CloseEyes,
	column: Column,
	date: Date,
	deleteBack: DeleteBack,
	doorOut: DoorOut,
	download: Download,
	email: Email,
	hamburger: Hamburger,
	linkCopy: LinkCopy,
	loading: Loading,
	menuTable: MenuTable,
	moneyBag: MoneyBag,
	note: Note,
	notification: Notification,
	ok: Ok,
	open: Open,
	openEye: OpenEye,
	passwordProfile: PasswordProfile,
	plus: Plus,
	search: Search,
	shield: Shield,
	star: Star,
	success: Success,
	timeUsage: TimeUsage,
	trashBin: TrashBin,
	upload: Upload,
	user: User,
	userProfile: UserProfile,
	wrong: Wrong,
};

export interface IconProps {
	color?: string;
	height?: string;
	name: keyof typeof ICONS;
	width?: string;
}

export const Icon: FC<IconProps> = ({ name, ...props }) => {
	const IconComponent = ICONS[name];

	return IconComponent ? <IconComponent {...props} /> : <></>;
};
