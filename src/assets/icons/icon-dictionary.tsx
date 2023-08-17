import SearchIcon from "./components/search-icon";
import UserIcon from "./components/user-icon";
import DateIcon from "./components/date-icon";
import ClockIcon from "./components/clock-icon";
import StarIcon from "./components/star-icon";
import CloseEyeIcon from "./components/close-eye";
import OpenEyeIcon from "./components/open-eye";
import CloseEyes from "./components/closes-eyes-icon";
import LoadingIcon from "./components/loading-icon";

type Props = {
	name: string;
	width?: number;
	color?: string;
};

const IconItems: any = ({ name, width, color }: Props) => {
	const icons = {
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
		closesEyes:{
			name: "closesEyes",
			Icon: <CloseEyes width={width} color={color} />
		},
		loader:{
			name:"loadingIcon",
			Icon: <LoadingIcon  width={width} color={color} />
		}
	};

	return icons[name]?.Icon || null;
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
	"loader"
];

export default IconItems;
