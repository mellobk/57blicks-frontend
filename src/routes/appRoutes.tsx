/* eslint-disable unicorn/filename-case */
import { ForbiddenPage } from "@/features/auth/pages/forbidden/ForbiddenPage";
import UnauthenticatedRoute from "./routes";

const appRoutes = [
	{
		path: "/403",
		page: ForbiddenPage,
		layout: null,
	},
];

const appRouter = UnauthenticatedRoute([...appRoutes]);

export default appRouter;
