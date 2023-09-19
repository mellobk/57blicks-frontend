import { getLocalStorage } from "@/utils/local-storage";
import { LogOff } from "../LogOff/LogOff";
import { userName } from "@/utils/constant";

export const UserInformation: React.FC = () => {
	const localUserName = getLocalStorage(userName);
	const firstName = localUserName.split(" ")[0] || "";
	return (
		<div className="h-full w-full rounded-3xl bg-gray-200 flex flex-col justify-end p-2">
			<LogOff userName={localUserName} firstName={firstName} />
		</div>
	);
};
