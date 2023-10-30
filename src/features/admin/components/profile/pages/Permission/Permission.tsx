import type { FC } from "react";
import { Permission } from "../../component/Permission/Permission.tsx";

export const PermissionPage: FC = () => {
	return (
		<div className="h-full w-full rounded-3xl bg-white flex">
			<Permission />
		</div>
	);
};
