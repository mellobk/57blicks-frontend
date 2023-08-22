/* eslint-disable @typescript-eslint/no-explicit-any */

import { Route } from "@tanstack/router";
import { rootRoute } from "./RootRoute";

interface Props {
    path?: string;
    page?: React.ComponentType; 
    routeComponent?: any;
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    layout: React.ComponentType | any;
}

const UnauthenticatedRoute  = (Routes: Array<Props>): any => {
    return  Routes.map(({ page: C, layout: Layout, path }) => {
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