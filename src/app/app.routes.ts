import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ModeloListComponent } from './crud-adm/modelo/list/list.component';
import { FormAdmComponent } from './crud-adm/administrador/form/form.component';
import { ListAdmComponent } from './crud-adm/administrador/list/list.component';
import { estadoResolverAdm } from './crud-adm/administrador/resolver/estado-resolver-adm';
import { estadoResolverModelo } from './crud-adm/modelo/resolver/estado-resolver-modelo';
import { ModeloFormComponent } from './crud-adm/modelo/form/form.component';

export const routes: Routes = [

    { path: 'adm/list', component: ListAdmComponent, title: 'Administradores'},
    { path: 'adm/form', component: FormAdmComponent, title: 'Cadastro de Administradores'},
    { path: 'adm/edit/:id', component: FormAdmComponent, resolve: { administrador: estadoResolverAdm }},

    { path: 'modelos/list', component: ModeloListComponent, title: 'Modelos'},
    { path: 'modelos/form', component: ModeloFormComponent, title: 'Modelos'},
    { path: 'modelos/edit/:id', component: ModeloFormComponent, resolve: { modelo: estadoResolverModelo }},
    
];
