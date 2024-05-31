import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Marca } from "../../../models/marca.model";
import { MarcaService } from "../../../services/marca.service";

export const resolverMarca: ResolveFn<Marca> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const id = Number(route.paramMap.get('id'));
        return inject(MarcaService).findById(id);
    }