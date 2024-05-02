import type { FC } from "react";
import { useNavigate } from "@tanstack/router";

const Home: FC = () => {
	const navigate = useNavigate();
	void navigate({ to: `/Login` });

	return (
		<div className="flex flex-col items-center h-full w-full bg-white text-primary ">
			Homess
		</div>
	);
};

export { Home };
