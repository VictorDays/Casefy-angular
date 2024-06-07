import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Estado } from "../../../models/estado.models";
import { EstadoService } from "../../../services/estado.service";

export const resolverEstado: ResolveFn<Estado> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const id = Number(route.paramMap.get('id'));
        return inject(EstadoService).findById(id);
    }