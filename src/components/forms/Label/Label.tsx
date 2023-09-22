import { FC } from "react";

interface Props {
	label?: string;
	required?: boolean;
}

export const Label: FC<Props> = ({ label, required }) => (
	<>
		{label && (
			<div className="font-inter text-sm leading-[17px] tracking-[-0.7px] font-semibold text-gray-600">
				<div>
					{label} {required && <span className="text-red-ERROR">*</span>}
				</div>
			</div>
		)}
	</>
);
