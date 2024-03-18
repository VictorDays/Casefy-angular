import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ListAdmComponent } from './components/administradores/list/list.component';
import { FormAdmComponent } from './components/administradores/form/form.component';
import { ModeloListComponent } from './components/modelo/modelo-list/modelo-list.component';

export const routes: Routes = [

    { path: 'adm/list', component: ListAdmComponent, title: 'Administradores'},
    { path: 'adm/form', component: FormAdmComponent, title: 'Cadastro de Administradores'},
    { path: 'modelos/list', component: ModeloListComponent, title: 'Modelos'},
];
