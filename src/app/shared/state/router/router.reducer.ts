import { Params, RouterStateSnapshot } from "@angular/router";
import { RouterStateSerializer } from "@ngrx/router-store";

export interface RouterState{ // estado inicial da rota com o que ela precisa para funcionar

    url:string,
    params: Params,
    queryParams: Params,
    fragment: string
}

export class CustomRouterSerializer implements RouterStateSerializer<RouterState>{
    serialize(routerstate: RouterStateSnapshot):RouterState{
        const { url } = routerstate;
        const { queryParams } = routerstate.root;
        const { fragment } = routerstate.root;

        let route = routerstate.root;
        const params: Params = {};
        do{
            if(!!route.params){
                Object.keys(route.params).forEach(key => {
                    params[key] = route.params[key];
                });
            }
            route = route.firstChild;
        }
        while(!!route);

        return {url, params, queryParams, fragment};
    }

    
}