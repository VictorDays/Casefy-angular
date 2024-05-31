import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Administrador } from "../../../models/administrador.model";
import { inject } from "@angular/core";
import { AdministradorService } from "../../../services/admistrador.service";

export const estadoResolverAdm: ResolveFn<Administrador> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const id = Number(route.paramMap.get('id'));
        return inject(AdministradorService).findById(id);
    }