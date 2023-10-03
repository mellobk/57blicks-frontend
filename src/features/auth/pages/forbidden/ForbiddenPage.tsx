import type { FC } from "react";
import { Icon } from "@/components/ui/Icon";

export const ForbiddenPage: FC = () => {
	return (
		<div className="flex flex-col items-center h-full w-full bg-white">
			<div className="">
				<Icon name="clock" width="400" color="red" />
			</div>
			<div>Texto</div>
			<a href="/">Go to home</a>
		</div>
	);
};
