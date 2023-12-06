import ArrowDown from "@/assets/icons/arrow-down";
import ArrowLeft from "@/assets/icons/arrow-left";
import ArrowOrder from "@/assets/icons/arrow-order";
import ArrowPlay from "@/assets/icons/arrow-play";
import ArrowRight from "@/assets/icons/arrow-right";
import Bank from "@/assets/icons/bank";
import Cellphone from "@/assets/icons/cellphone";
import Chart from "@/assets/icons/chart";
import CheckBoxFalse from "@/assets/icons/check-box-false";
import CheckBoxTrue from "@/assets/icons/check-box-true";
import Clock from "@/assets/icons/clock";
import ClockReverse from "@/assets/icons/clock-reverse";
import Close from "@/assets/icons/close";
import CloseEye from "@/assets/icons/close-eye";
import CloseEyes from "@/assets/icons/closes-eyes";
import Column from "@/assets/icons/column";
import Credit from "@/assets/icons/credit";
import Date from "@/assets/icons/date";
import Debit from "@/assets/icons/debit";
import DeleteBack from "@/assets/icons/delete-back";
import DoorOut from "@/assets/icons/door-out";
import Download from "@/assets/icons/download";
import Email from "@/assets/icons/email";
import type { FC } from "react";
import Hamburger from "@/assets/icons/hamburger";
import Hidden from "@/assets/icons/hidden";
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
import Pdf from "@/assets/icons/pdf";
import Pencil from "@/assets/icons/pencil";
import Permission from "@/assets/icons/permission";
import Plus from "@/assets/icons/plus";
import Refresh from "@/assets/icons/refresh";
import SVG403 from "@/assets/images/svg/403";
import Search from "@/assets/icons/search";
import Send from "@/assets/icons/send";
import Shield from "@/assets/icons/shield";
import Star from "@/assets/icons/star";
import Success from "@/assets/icons/success";
import TimeUsage from "@/assets/icons/time-usage";
import TrashBin from "@/assets/icons/trash-bin";
import Upload from "@/assets/icons/upload";
import User from "@/assets/icons/user";
import UserProfile from "@/assets/icons/user-profile";
import Wrong from "@/assets/icons/wrong";
import Csv from "@/assets/icons/csv";
import Xlsx from "@/assets/icons/xlsx";
import New from "@/assets/icons/new";
import UploadFile from "@/assets/icons/upload-file"
import List from "@/assets/icons/list";
import Attach from "@/assets/icons/attach";
import Notes from "@/assets/icons/notes";

export const ICONS = {
	arrowDown: ArrowDown,
	arrowLeft: ArrowLeft,
	arrowRight: ArrowRight,
	arrowPlay: ArrowPlay,
	arrowOrder: ArrowOrder,
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
	hidden: Hidden,
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
	svg403: SVG403,
	timeUsage: TimeUsage,
	trashBin: TrashBin,
	upload: Upload,
	user: User,
	userProfile: UserProfile,
	wrong: Wrong,
	debit: Debit,
	credit: Credit,
	pencil: Pencil,
	pdf: Pdf,
	send: Send,
	refresh: Refresh,
	permission: Permission,
	checkBoxFalse: CheckBoxFalse,
	checkBoxTrue: CheckBoxTrue,
	csv: Csv,
	xlsx: Xlsx,
	new: New,
	uploadFile: UploadFile,
	list: List,
	attach: Attach,
	notes: Notes
};

export interface IconProps {
	color?: string;
	height?: string;
	name: keyof typeof ICONS;
	width?: string;
}

export const Icon: FC<IconProps> = (props) => {
	const IconComponent = ICONS[props.name];

	return IconComponent ? (
		<div {...props}>
			<IconComponent {...props} />
		</div>
	) : (
		<></>
	);
};
