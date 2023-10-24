import type { FC } from "react";
import { Icon } from "@/components/ui/Icon";
import { Link } from "@tanstack/router";
import ManageUsersService from "@/features/manage-user/api/investors";
import { getLocalStorage } from "@/utils/local-storage";
import { group } from "@/utils/constant";
import { useQuery } from "@tanstack/react-query";

const ForbiddenPage: FC = () => {
	const cognitoGroup = getLocalStorage(group)
		? JSON?.parse(getLocalStorage(group))
		: "";
	const groupTo: string =
		cognitoGroup === "investor" ? "/investors" : "/manage-users/admins";

	const userQuery = useQuery(["user-query-forbidden"], () => {
		return ManageUsersService.forbidden();
	});

	void userQuery.refetch();

	return (
		<div className="flex flex-col items-center h-full w-full bg-white text-primary ">
			<div className="pt-24">
				<Icon name="svg403" />
			</div>
			<div className="text-2xl font-semibold pt-4">
				403 &nbsp; | &nbsp; PROTECTED PAGE
			</div>
			<div className="text-gray-300 pt-4  ">
				You don’t have permission to access this page
			</div>
			<Link
				key={"/"}
				to={groupTo}
				className="link-text bg-primary text-white font-semibold rounded-lg w-40  h-8 text-center pt-2 pb-2 px-4 m-2"
				params={{}}
				search={{}}
			>
				Take Me Home
			</Link>
			<a href={"/"}></a>
		</div>
	);
};

export { ForbiddenPage };
