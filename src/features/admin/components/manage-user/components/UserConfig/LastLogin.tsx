import { type FC, useEffect, useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { dateFormat } from "@/utils/formats";
import type { UserActivity } from "../../types/logs";

interface LastLoginProps {
	data: UserActivity;
}

const LastLogin: FC<LastLoginProps> = ({ data }) => {
	const [lastLogin, setLastLogin] = useState<string | null>(null);

	useEffect(() => {
		if (data && data.lastLogin?.createdAt) {
			setLastLogin(data.lastLogin?.createdAt);
		} else {
			setLastLogin(null);
		}
	}, [data]);

	return (
		<div className="relative h-40">
			<div className="absolute w-32 h-7  bg-green-800 pt-1 pb-1 pl-3 pr-3 rounded-[15px] flex  text-xs text-green-500 font-bold align-middle ">
				<div className="pr-2 align-middle pt-0.5  ">
					<Icon name="clockReverse" width="16" color="#00BA35" />
				</div>
				Last login
			</div>
			<div className="absolute top-16 text-2xl font-semibold z-40 ">
				{lastLogin ? dateFormat(lastLogin) : "There is no activity to report"}
			</div>
		</div>
	);
};

export default LastLogin;