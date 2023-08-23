import type { ReactElement } from "react";
import SearchIcon from "./components/search-icon";
import UserIcon from "./components/user-icon";
import DateIcon from "./components/date-icon";
import ClockIcon from "./components/clock-icon";
import StarIcon from "./components/star-icon";
import CloseEyeIcon from "./components/close-eye";
import OpenEyeIcon from "./components/open-eye";
import ArrowDown from "./components/arrow-down";
import CloseEyes from "./components/closes-eyes-icon";
import LoadingIcon from "./components/loading-icon";
import Ok from "./components/ok-arrow-icon";
import Wrong from "./components/wrong-icon";
import ShieldIcon from "./components/shield-icon";
import Notification from "./components/notification";

interface Props {
	name: string;
	width?: string;
	color?: string;
}

interface IconData {
	name: string;
	Icon: ReactElement;
}

interface IconMap {
	[key: string]: IconData;
}

const IconItems = ({ name, width, color }: Props): ReactElement => {
	const icons: IconMap = {
		search: {
			name: "search",
			Icon: <SearchIcon width={width} color={color} />,
		},
		user: {
			name: "user",
			Icon: <UserIcon width={width} color={color} />,
		},
		date: {
			name: "date",
			Icon: <DateIcon width={width} color={color} />,
		},
		clock: {
			name: "clock",
			Icon: <ClockIcon width={width} color={color} />,
		},
		star: {
			name: "star",
			Icon: <StarIcon width={width} color={color} />,
		},
		closeEye: {
			name: "closeEye",
			Icon: <CloseEyeIcon width={width} color={color} />,
		},
		openEye: {
			name: "openEye",
			Icon: <OpenEyeIcon width={width} color={color} />,
		},
		closesEyes: {
			name: "closesEyes",
			Icon: <CloseEyes width={width} color={color} />,
		},
		loader: {
			name: "loadingIcon",
			Icon: <LoadingIcon width={width} color={color} />,
		},
		arrowDown: {
			name: "arrowDown",
			Icon: <ArrowDown width={width} color={color} />,
		},
		ok: {
			name: "ok",
			Icon: <Ok width={width} color={color} />,
		},
		wrong: {
			name: "wrong",
			Icon: <Wrong width={width} color={color} />,
		},
		shield: {
			name: "shield",
			Icon: <ShieldIcon width={width} color={color} />,
		},
		notification: {
			name: "notification",
			Icon: <Notification width={width} color={color} />,
		},
	};
	const Icon = icons[name]?.Icon;
	return Icon || <></>;
};

// export icons to storybook mapping
export const storyBooksIconsNames: Array<string> = [
	"search",
	"clock",
	"user",
	"date",
	"star",
	"closeEye",
	"openEye",
	"closesEyes",
	"loader",
	"arrowDown",
	"ok",
	"wrong",
	"shield",
];

export default IconItems;
