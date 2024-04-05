import { Routes } from '@angular/router';
import { estadoResolverAdm } from './crud-adm/administrador/resolver/estado-resolver-adm';
import { ClienteListComponent } from './crud-adm/cliente/list/list.component';
import { ClienteFormComponent } from './crud-adm/cliente/form/form.component';
import { MarcaListComponent } from './crud-adm/marca/list/list.component';
import { HomeIndexComponent } from './home-index/home-index.component';
import { ModeloListComponent } from './crud-adm/modelo/list/list.component';
import { ModeloFormComponent } from './crud-adm/modelo/form/form.component';
import { EstadoFormComponent } from './crud-adm/estado/form/form.component';
import { EstadoListComponent } from './crud-adm/estado/list/list.component';
import { resolverEstado } from './crud-adm/estado/resolver/resolver-estado';
import { CidadeListComponent } from './crud-adm/cidade/list/list.component';
import { CidadeFormComponent } from './crud-adm/cidade/form/form.component';
import { resolverCidade } from './crud-adm/cidade/resolver/resolver-cidade';
import { FornecedorListComponent } from './crud-adm/fornecedor/list/list.component';
import { FornecedorFormComponent } from './crud-adm/fornecedor/form/form.component';
import { resolverFornecedor } from './crud-adm/fornecedor/resolver/resolver-fornecedor';
import { LoteListComponent } from './crud-adm/lote/list/list.component';
import { LoteFormComponent } from './crud-adm/lote/form/form.component';
<<<<<<< HEAD
import { resolverModelo } from './crud-adm/modelo/resolver/resolver-modelos';
import { resolverMarca } from './crud-adm/marca/resolver/resolver-marca';
import { MarcaFormComponent } from './crud-adm/marca/form/form.component';
import { AdmListComponent } from './crud-adm/administrador/list/list.component';
import { AdmFormComponent } from './crud-adm/administrador/form/form.component';
import { CapinhaListComponent } from './crud-adm/capinha/list/list.component';
import { CapinhaFormComponent } from './crud-adm/capinha/form/form.component';
import { resolverCapinha } from './crud-adm/capinha/resolver/resolver-capinha';

export const routes: Routes = [
//HOME    
    { path: 'home', component: HomeIndexComponent, title: 'Home'},
//ADM
    { path: 'adm/list', component: AdmListComponent, title: 'Administradores'},
    { path: 'adm/form', component: AdmFormComponent, title: 'Cadastro de Administradores'},
    { path: 'adm/edit/:id', component: AdmFormComponent, resolve: { administrador: estadoResolverAdm }},
//ESTADO
=======
import { PromocaoFormComponent } from './crud-adm/promocao/form/form.component';
import { PromocaoListComponent } from './crud-adm/promocao/list/list.component';
import { resolverPromocao } from './crud-adm/promocao/resolver/resolver-promocao';
import { resolverCliente } from './crud-adm/cliente/resolver/estado-resolver-adm';

export const routes: Routes = [

    { path: 'adm/list', component: ListAdmComponent, title: 'Administradores'},
    { path: 'adm/form', component: FormAdmComponent, title: 'Cadastro de Administradores'},
    { path: 'adm/edit/:id', component: FormAdmComponent, resolve: { administrador: estadoResolverAdm }},

    { path: 'cliente/list', component: ClienteListComponent, title: 'Clientes'},
    { path: 'cliente/form', component: ClienteFormComponent, title: 'Cadastro de Clientes'},
    { path: 'cliente/edit/:id', component: ClienteFormComponent, resolve: { cliente: resolverCliente}},

>>>>>>> a7181129e7d52a1006f7e0f8e6bba8e0ca415326
    { path: 'estado/list', component: EstadoListComponent, title: 'Estados'},
    { path: 'estado/form', component: EstadoFormComponent, title: 'Cadastro de Estados'},
    { path: 'estado/edit/:id', component: EstadoFormComponent, resolve: { estado: resolverEstado}},
//CIDADE
    { path: 'cidade/list', component: CidadeListComponent, title: 'Cidades'},
    { path: 'cidade/form', component: CidadeFormComponent, title: 'Cadastro de Cidades'},
    { path: 'cidade/edit/:id', component: CidadeFormComponent, resolve: { cidade: resolverCidade}},
//FORNECEDOR
    { path: 'fornecedor/list', component: FornecedorListComponent, title: 'Fornecedores'},
    { path: 'fornecedor/form', component: FornecedorFormComponent, title: 'Cadastro de Fornecedores'},
    { path: 'fornecedor/edit/:id', component: FornecedorFormComponent, resolve: { fornecedor: resolverFornecedor}},
<<<<<<< HEAD
//LOTE
    { path: 'lote/list', component: LoteListComponent, title: 'Lotes'},
    { path: 'lote/form', component: LoteFormComponent, title: 'Cadastro de lotes'},
//MARCA
=======
    
    { path: 'lote/list', component: LoteListComponent, title: 'Lotes'},
    { path: 'lote/form', component: LoteFormComponent, title: 'Cadastro de lotes'},
    { path: 'lote/edit/:id', component: FornecedorFormComponent, resolve: { fornecedor: resolverFornecedor}},

    { path: 'promocao/list', component: PromocaoListComponent, title: 'Promoções'},
    { path: 'promocao/form', component: PromocaoFormComponent, title: 'Cadastro de Promoções'},
    { path: 'promocao/edit/:id', component: FornecedorFormComponent, resolve: { promocao: resolverPromocao}},

>>>>>>> a7181129e7d52a1006f7e0f8e6bba8e0ca415326
    { path: 'marcas/list', component: MarcaListComponent, title: 'Marcas'},
    { path: 'marcas/form', component: MarcaFormComponent, title: 'Cadastro de Administradores'},
    { path: 'marcas/edit/:id', component: MarcaFormComponent, resolve: { marca: resolverMarca }},
//MODELO
    { path: 'modelos/list', component: ModeloListComponent, title: 'Modelos de capinhas'},
    { path: 'modelos/form', component: ModeloFormComponent, title: 'Cadastro de modelos de capinha'},
    { path: 'modelos/edit/:id', component: ModeloFormComponent, resolve: { modelo: resolverModelo }},
//CAPINHA
    { path: 'capinhas/list', component: CapinhaListComponent, title: 'Capinhas'},
    { path: 'capinhas/form', component: CapinhaFormComponent, title: 'Cadastro de capinha'},
    { path: 'capinhas/edit/:id', component: CapinhaFormComponent, resolve: { capinha: resolverCapinha }},
];
