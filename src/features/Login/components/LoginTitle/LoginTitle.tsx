/* eslint-disable @typescript-eslint/no-misused-promises */

interface LoginTitleProps {
	title?: string;
	subTitle?: string;
	children?: React.ReactNode;
}

export const LoginTitle: React.FC<LoginTitleProps> = ({
	title,
	subTitle,
	children,
}) => {
	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full">
			<div className="text-primary-300 text-2xl  font-normal font-400 leading-normal tracking-wider">
				{title}
			</div>
			{subTitle && <div className="text-center text-gray-1000">{subTitle}</div>}
			<div className="flex  flex-col justify-between h-full  w-full gap-5">
				{children}
			</div>
		</div>
	);
};
