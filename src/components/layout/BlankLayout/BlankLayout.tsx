import type { FC, ReactNode } from "react";

type Props = {
	children?: ReactNode;
};

export const BlankLayout: FC<Props> = ({ children }) => (
	<div className="flex flex-col h-screen bg-gradient relative">{children}</div>
);
