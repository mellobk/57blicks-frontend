import "./Toggle.css";

interface AvatarProps {
	checked?: boolean;
	onChecked?: (value: any) => void;
	checkedClassName?: string;
	checkLabel?: string;
	checkLabelClassName?: string;
}

export const Toggle: React.FC<AvatarProps> = ({
	checked,
	onChecked,
	checkedClassName = "bg-primary-500",
	checkLabel = "Checked",
	checkLabelClassName = "text-[13px] ",
}) => {
	return (
		<div className="flex items-center justify-center gap-2">
			<div className="flex items-center">
				<label className="switch">
					<input
						type="checkbox"
						checked={checked}
						defaultChecked={checked}
						onClick={(data): any => {
							if (onChecked) {
								onChecked(data);
							}
						}}
					/>
					<span
						className={`slider round ${checked && checkedClassName} `}
					></span>
				</label>
			</div>
			<div className={checkLabelClassName}>{checkLabel}</div>
		</div>
	);
};
