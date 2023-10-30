import type { FC } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { moneyFormat } from "@/utils/formats.ts";

type Props = {
	action?: () => void;
	checkAndBalance?: boolean;
	label: string;
	value: number;
};

export const Value: FC<Props> = ({ action, checkAndBalance, label, value }) => (
	<div className="flex flex-col gap-2 p-6">
		<h3 className="font-inter text-base text-gray-1000 font-semibold leading-[19px] tracking-tighter">
			{label}
		</h3>
		<div className="flex flex-row justify-between items-center">
			<h1
				className={`font-inter text-[28px] ${
					action
						? "text-gold-500"
						: checkAndBalance
						? "text-green-500"
						: "text-primary-500"
				} leading-[34px] tracking-[-1.4px]`}
			>
				{moneyFormat(value)}
			</h1>
			{action && (
				<Button
					className="p-0 bg-white focus:outline-none focus:border-transparent shadow-none"
					icon={<Icon name="open" width="18" color="#C79E63" />}
					onClick={action}
					type="button"
				/>
			)}
		</div>
	</div>
);
