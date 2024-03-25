import { Routes } from '@angular/router';
import { FormAdmComponent } from './crud-adm/administrador/form/form.component';
import { ListAdmComponent } from './crud-adm/administrador/list/list.component';
import { estadoResolverAdm } from './crud-adm/administrador/resolver/estado-resolver-adm';
import { ClienteListComponent } from './crud-adm/cliente/list/list.component';
import { ClienteFormComponent } from './crud-adm/cliente/form/form.component';
import { MarcaListComponent } from './crud-adm/marca/list/list.component';
import { FormMarcaComponent } from './crud-adm/marca/form/form.component';
import { estadoResolverMarca } from './crud-adm/marca/resolver/estado-resolver-marca';
import { HomeIndexComponent } from './home-index/home-index.component';
import { ModeloListComponent } from './crud-adm/modelo/list/list.component';
import { ModeloFormComponent } from './crud-adm/modelo/form/form.component';
import { EstadoFormComponent } from './crud-adm/estado/form/form.component';
import { EstadoListComponent } from './crud-adm/estado/list/list.component';
import { resolverEstado } from './crud-adm/estado/resolver/resolver-estado';

export const routes: Routes = [

    { path: 'adm/list', component: ListAdmComponent, title: 'Administradores'},
    { path: 'adm/form', component: FormAdmComponent, title: 'Cadastro de Administradores'},
    { path: 'adm/edit/:id', component: FormAdmComponent, resolve: { administrador: estadoResolverAdm }},

    { path: 'estado/list', component: EstadoListComponent, title: 'Estados'},
    { path: 'estado/form', component: EstadoFormComponent, title: 'Cadastro de Estados'},
    { path: 'estado/edit/:id', component: EstadoFormComponent, resolve: { estado: resolverEstado}},

    { path: 'marcas/list', component: MarcaListComponent, title: 'Marcas'},
    { path: 'marcas/form', component: FormMarcaComponent, title: 'Cadastro de Administradores'},
    { path: 'marcas/edit/:id', component: FormMarcaComponent, resolve: { marca: estadoResolverMarca }},
    { path: 'home', component: HomeIndexComponent, title: 'Home'},

    { path: 'modelos/list', component: ModeloListComponent, title: 'Modelos de capinhas'},
    { path: 'modelos/form', component: ModeloFormComponent, title: 'Cadastro de modelos de capinha'},
    { path: 'modelos/edit/:id', component: ModeloFormComponent, resolve: { modelo: estadoResolverMarca }},
];
