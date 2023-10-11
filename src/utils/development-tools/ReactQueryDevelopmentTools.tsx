import React from "react";

export const ReactQueryDevelopmentTools = import.meta.env.PROD
	? (): null => null
	: React.lazy(() =>
			import("@tanstack/react-query-devtools").then((result) => ({
				default: result.ReactQueryDevtools,
			}))
	  );
