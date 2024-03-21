import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { ViewClienteComponent } from '../view/view.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { NavsideComponent } from '../../../components/navside/navside.component';
import { ConfirmationDialogComponent } from '../../../components/confirmation/confirmation-dialog.component';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.models';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule, ViewClienteComponent, ConfirmationDialogComponent, ReactiveFormsModule, FormsModule,
    HeaderComponent, NavsideComponent, MatInputModule, MatFormFieldModule,
    MatIconModule, MatTableModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ClienteListComponent {
  displayedColumns: string[] = ['id', 'nome', 'email', 'cpf', 'acao'];
  clientes: Cliente[] = [];

  clientesSubscription: Subscription | undefined;

  constructor(private dialog: MatDialog,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clientesSubscription = this.clienteService.findAll().subscribe(data => {
      this.clientes = data;
      console.log(data);
    });
  }

  //Verifica se this.clientesSubscription existe e não é nulo.
  ngOnDestroy(): void {
    if (this.clientesSubscription) {
      this.clientesSubscription.unsubscribe();
    }
  }

  // Campo de Pesquisa:
  searchText: string = '';
  search() {
    // Se o texto de busca estiver vazio, busque todos os clientes
    if (!this.searchText.trim()) {
      this.clienteService.findAll().subscribe(
        data => {
          this.clientes = data;
        },
        error => {
          console.error('Erro ao buscar clientes:', error);
        }
      );
      return;
    }
    // Converter searchText para minúsculas para busca insensível a maiúsculas e minúsculas
    const termoDeBusca = this.searchText.toLowerCase();
    this.clienteService.findByNome(termoDeBusca).subscribe(
      data => {
        this.clientes = data;
      },
      error => {
        console.error('Erro ao buscar por nome:', error);
      }
    );
  }

  //Caixa de dialogo para excluir 
  confirmDelete(cliente: Cliente): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true && cliente && cliente.id !== undefined) {

        this.clienteService.delete(cliente).subscribe(
          () => {
            // Atualizar lista de clientes após exclusão
            this.clientes = this.clientes.filter(adm => adm.id !== cliente.id);
          }
        );
      }
    });
  }

  visualizarDados(cliente: Cliente): void {
    this.dialog.open(ViewClienteComponent, {
      width: '600px',
      height: '455px',
      data: cliente
    });
  }
}