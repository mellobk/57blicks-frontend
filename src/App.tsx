import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./providers/AuthContextProvider";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/ui/ErrorFallback";
import type { FunctionComponent } from "./types";
import { PrimeReactProvider } from "primereact/api";
import { ReactQueryDevelopmentTools } from "@/utils/development-tools/ReactQueryDevelopmentTools";
import { RouterProvider } from "@tanstack/router";
import { TanStackRouterDevelopmentTools } from "@/utils/development-tools/TanStackRouterDevelopmentTools";
import { router } from "./routes";
const queryClient = new QueryClient();

const App = (): FunctionComponent => {
	return (
		<PrimeReactProvider>
			<ErrorBoundary fallback={<ErrorFallback />}>
				<QueryClientProvider client={queryClient}>
					<AuthProvider>
						<RouterProvider router={router} />
						<TanStackRouterDevelopmentTools
							router={router}
							initialIsOpen={false}
							position="bottom-right"
						/>
						<ReactQueryDevelopmentTools initialIsOpen={false} />
					</AuthProvider>
				</QueryClientProvider>
			</ErrorBoundary>
		</PrimeReactProvider>
	);
};

export default App;
