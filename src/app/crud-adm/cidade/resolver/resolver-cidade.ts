import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Cidade } from "../../models/cidade.models";
import { CidadeService } from "../../services/cidade.service";

export const resolverCidade: ResolveFn<Cidade> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const id = Number(route.paramMap.get('id'));
        return inject(CidadeService).findById(id);
    }