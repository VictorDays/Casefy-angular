import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ListAdmComponent } from './components/administradores/list/list.component';
import { FormAdmComponent } from './components/administradores/form/form.component';

export const routes: Routes = [
    { path: 'teste', component: HeaderComponent, title: 'teste'},

    { path: 'adm/list', component: ListAdmComponent, title: 'Administradores'},
    { path: 'adm/form', component: FormAdmComponent, title: 'Cadastro de Administradores'},
];
