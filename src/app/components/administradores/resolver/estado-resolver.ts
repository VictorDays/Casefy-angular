import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Administrador } from "../../../crud-adm/models/administrador.model";
import { inject } from "@angular/core";
import { AdministradorService } from "../../../crud-adm/services/admistrador.service";

export const estadoResolver: ResolveFn<Administrador> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const id = Number(route.paramMap.get('id'));
        return inject(AdministradorService).findById(id);
    }