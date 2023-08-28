import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/router";
import type { FunctionComponent } from "./types";
import { router } from "./routes";
import { TanStackRouterDevelopmentTools } from "./components/utils/development-tools/TanStackRouterDevelopmentTools";
import { ReactQueryDevelopmentTools } from "./components/utils/development-tools/ReactQueryDevelopmentTools";
import { PrimeReactProvider } from "primereact/api";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/utils/ErrorFallback";
import { AuthProvider } from "./providers/AuthContextProvider";

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
