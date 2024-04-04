import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Promocao } from "../../models/Promocao.model";
import { PromocaoService } from "../../services/promocao.service";

export const resolverPromocao: ResolveFn<Promocao> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const id = Number(route.paramMap.get('id'));
        return inject(PromocaoService).findById(id);
    }