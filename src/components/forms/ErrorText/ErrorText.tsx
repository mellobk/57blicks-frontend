import { FC } from "react";

interface Props {
	error?: string;
}

export const ErrorText: FC<Props> = ({ error }) => (
	<>
		{error && (
			<div
				className={
					"font-inter text-[13px] leading-4 tracking-[-0.7px] text-red-ERROR"
				}
			>
				{error}
			</div>
		)}
	</>
);
