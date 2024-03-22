import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FormAdmComponent } from './crud-adm/administrador/form/form.component';
import { ListAdmComponent } from './crud-adm/administrador/list/list.component';
import { estadoResolverAdm } from './crud-adm/administrador/resolver/estado-resolver-adm';
import { ClienteListComponent } from './crud-adm/cliente/list/list.component';
import { ClienteFormComponent } from './crud-adm/cliente/form/form.component';
import { MarcaListComponent } from './crud-adm/marca/list/list.component';
import { MarcaFormComponent } from './crud-adm/marca/form/form.component';
import { estadoResolverMarca } from './crud-adm/marca/resolver/estado-resolver-modelo';

export const routes: Routes = [

    { path: 'adm/list', component: ListAdmComponent, title: 'Administradores'},
    { path: 'adm/form', component: FormAdmComponent, title: 'Cadastro de Administradores'},
    { path: 'adm/edit/:id', component: FormAdmComponent, resolve: { administrador: estadoResolverAdm }},

    { path: 'cliente/list', component: ClienteListComponent, title: 'Clientes'},
    { path: 'cliente/form', component: ClienteFormComponent, title: 'Cadastro de Clientes'},

    { path: 'marcas/list', component: MarcaListComponent, title: 'Marcas'},
    { path: 'marcas/form', component: MarcaFormComponent, title: 'Marcas'},
    { path: 'marcas/edit/:id', component: MarcaFormComponent, resolve: { modelo: estadoResolverMarca }},
    
];
