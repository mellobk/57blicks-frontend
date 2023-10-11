import type { FC } from "react";
import { Icon } from "@/components/ui/Icon";

export const Loading: FC = () => (
	<div className="flex justify-center items-center h-full w-full">
		<Icon name="loading" />
	</div>
);
