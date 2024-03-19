import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { estadoResolver } from './crud-adm/administrador/resolver/estado-resolver';
import { ModeloListComponent } from './crud-adm/modelo/list/list.component';
import { FormAdmComponent } from './crud-adm/administrador/form/form.component';
import { ListAdmComponent } from './crud-adm/administrador/list/list.component';

export const routes: Routes = [

    { path: 'adm/list', component: ListAdmComponent, title: 'Administradores'},
    { path: 'adm/form', component: FormAdmComponent, title: 'Cadastro de Administradores'},
    { path: 'adm/edit/:id', component: FormAdmComponent, resolve: { administrador: estadoResolver }},

    { path: 'modelos/list', component: ModeloListComponent, title: 'Modelos'},
    { path: 'modelos/form', component: ModeloListComponent, title: 'Modelos'},
    
];
