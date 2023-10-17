import "./Toggle.css";
import type { FC } from "react";

interface AvatarProps {
	checked?: boolean;
	onChecked?: (value: any) => void;
	checkedClassName?: string;
	label?: string;
	labelClassName?: string;
}

export const Toggle: FC<AvatarProps> = ({
	checked,
	onChecked,
	checkedClassName = "bg-primary-500",
	label,
	labelClassName = "text-[13px]",
}) => {
	return (
		<div className="flex items-center justify-center gap-2">
			<div className="flex items-center">
				<label className="switch">
					<input
						type="checkbox"
						checked={checked}
						onChange={(data) => onChecked?.(data)}
					/>
					<span className={`slider round ${checked ? checkedClassName : ""}`} />
				</label>
			</div>
			{label && <div className={labelClassName}>{label}</div>}
		</div>
	);
};
