import type { FC } from "react";
import { Icon } from "@/components/ui/Icon";
import { columnWidth } from "./column-width";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
	return (
		<>
			<div className="w-[97%] absolute top-[90px] z-10">
				<li
					className={`w-full flex flex-row   pb-1 pt-[6px] pl-4   gap-4 bg-gray-200 font-semibold rounded-t-xl h-10 `}
				>
					<div
						className={`${columnWidth.date} font-semibold text-gray-600 pl-4`}
					>
						Date
					</div>
					<div
						className={`${columnWidth.class} font-semibold text-gray-600 pl-4`}
					>
						Class
					</div>
					<div
						className={`${columnWidth.debitCredit} font-semibold text-gray-600 pl-4`}
					>
						Debit/Credit
					</div>
					<div
						className={`${columnWidth.month} font-semibold text-gray-600 pl-4`}
					>
						Month
					</div>
					<div
						className={`${columnWidth.memo} font-semibold text-gray-600 pl-4`}
					>
						Memo
					</div>
					<div
						className={`${columnWidth.debit} font-semibold text-gray-600 pl-4 text-right relative `}
					>
						<div className="flex flex-row gap-2  align-middle right-0 absolute">
							Debit
							<div className="pt-1">
								<Icon name="debit" width="10" color="grey" />
							</div>
						</div>
					</div>
					<div
						className={`${columnWidth.credit} font-semibold text-gray-600 pl-4 relative `}
					>
						<div className="flex flex-row gap-2  align-middle right-0 absolute">
							Credit
							<div className="pt-1">
								<Icon name="credit" width="10" color="grey" />
							</div>
						</div>
					</div>
					<div
						className={`${columnWidth.balance} font-semibold text-gray-600 pl-4 text-right pr-10`}
					>
						Balance
					</div>
					<div
						className={`${columnWidth.action} font-semibold text-gray-600 pl-4`}
					>
						Delete
					</div>
				</li>
			</div>
		</>
	);
};

export default Header;
