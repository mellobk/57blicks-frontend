import "react-toastify/dist/ReactToastify.css";

import { ReactElement } from "react";
import { ToastContainer } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";
import { PrimeReactProvider } from "primereact/api";
import { RouterProvider } from "@tanstack/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./providers/AuthContextProvider";
import { ErrorFallback } from "@/components/ui/ErrorFallback";
import { ReactQueryDevelopmentTools } from "@/utils/development-tools/ReactQueryDevelopmentTools";
import { TanStackRouterDevelopmentTools } from "@/utils/development-tools/TanStackRouterDevelopmentTools";
import { router } from "./routes";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, // default: true
		},
	},
});

const App = (): ReactElement => {
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
						<ToastContainer />
						<ReactQueryDevelopmentTools initialIsOpen={false} />
					</AuthProvider>
				</QueryClientProvider>
			</ErrorBoundary>
		</PrimeReactProvider>
	);
};

export default App;
