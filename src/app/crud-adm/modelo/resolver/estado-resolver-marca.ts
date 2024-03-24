import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Modelo } from "../../models/modelo.models";
import { ModeloService } from "../../services/modelo.service";

export const estadoResolverMarca: ResolveFn<Modelo> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const id = Number(route.paramMap.get('id'));
        return inject(ModeloService).findById(id);
    }