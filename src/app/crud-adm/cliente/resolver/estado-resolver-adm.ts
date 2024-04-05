import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Cliente } from "../../models/cliente.models";
import { inject } from "@angular/core";
import { ClienteService } from "../../services/cliente.service";

export const resolverCliente: ResolveFn<Cliente> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const id = Number(route.paramMap.get('id'));
        return inject(ClienteService).findById(id);
    }