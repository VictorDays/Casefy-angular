import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Fornecedor } from "../../../models/fornecedor.models";
import { FornecedorService } from "../../../services/fornecedor.service";

export const resolverFornecedor: ResolveFn<Fornecedor> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const id = Number(route.paramMap.get('id'));
        return inject(FornecedorService).findById(id);
    }