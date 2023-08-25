import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/router";
import type { FunctionComponent } from "./common/types";
import { router } from "./routes";
import { TanStackRouterDevelopmentTools } from "@/utils/development-tools/TanStackRouterDevelopmentTools";
import { ReactQueryDevelopmentTools } from "@/utils/development-tools/ReactQueryDevelopmentTools";
import { PrimeReactProvider } from 'primereact/api';
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/utils/ErrorFallback";

const queryClient = new QueryClient();

const App = (): FunctionComponent => {
	return (
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
	);
};

export default App;
