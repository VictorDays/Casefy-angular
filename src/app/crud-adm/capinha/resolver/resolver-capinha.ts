import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Capinha } from "../../../models/capinha.model";
import { CapinhaService } from "../../../services/capinha.service";

export const resolverCapinha: ResolveFn<Capinha> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const id = Number(route.paramMap.get('id'));
        return inject(CapinhaService).findById(id);
    }