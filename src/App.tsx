import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/router";
import type { FunctionComponent } from "./types";
import { router } from "./routes";
import { PrimeReactProvider } from "primereact/api";
import { ErrorBoundary } from "react-error-boundary";
import { AuthProvider } from "./providers/AuthContextProvider";
import ErrorFallback from "@/utils/ErrorFallback";
import { TanStackRouterDevelopmentTools } from "@/utils/development-tools/TanStackRouterDevelopmentTools";
import { ReactQueryDevelopmentTools } from "@/utils/development-tools/ReactQueryDevelopmentTools";

const queryClient = new QueryClient();

const App = (): FunctionComponent => {
	return (
		<AuthProvider>
			<PrimeReactProvider>
				<ErrorBoundary fallback={<ErrorFallback />}>
					<QueryClientProvider client={queryClient}>
						<RouterProvider router={router} />
						<TanStackRouterDevelopmentTools
							router={router}
							initialIsOpen={false}
							position="bottom-right"
						/>
						<ReactQueryDevelopmentTools initialIsOpen={false} />
					</QueryClientProvider>
				</ErrorBoundary>
			</PrimeReactProvider>
		</AuthProvider>
	);
};

export default App;
