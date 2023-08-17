/* eslint-disable @typescript-eslint/no-explicit-any */

import { Route } from "@tanstack/router";
import { rootRoute } from "./RootRoute";

interface Props {
    path?: string;
    page?: React.ComponentType; 
    routeComponent?: any;
    layout: React.ComponentType | any;
}

const UnauthenticatedRoute  = (indexRoutes: Array<Props>): any => {
    return  indexRoutes.map(({ page: C, layout: Layout, path }) => {
        return new Route({
            getParentRoute: (): typeof rootRoute => rootRoute,
            path: path || "/",
         
            component: (): JSX.Element => {
                return Layout ? (
                    <Layout>
                    {C ? <C /> : null}
                  </Layout>
                ) : (
                 <div>
                       {C ? <C /> : null}
                 </div>
                );
            },
        });
    });
}

export default UnauthenticatedRoute;