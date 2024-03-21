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

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule, ViewClienteComponent, ConfirmationDialogComponent, ReactiveFormsModule, FormsModule,
    HeaderComponent, NavsideComponent, MatInputModule, MatFormFieldModule,
    MatIconModule, MatTableModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  displayedColumns: string[] = ['id', 'nome', 'matricula', 'nivel', 'acao'];
  administradores: Administrador[] = [];

  administradoresSubscription: Subscription | undefined;

  constructor(private dialog: MatDialog,
    private administradorService: AdministradorService) { }

  ngOnInit(): void {
    this.administradoresSubscription = this.administradorService.findAll().subscribe(data => {
      this.administradores = data;
      console.log(data);
    });
  }

  //Verifica se this.administradoresSubscription existe e não é nulo.
  ngOnDestroy(): void {
    if (this.administradoresSubscription) {
      this.administradoresSubscription.unsubscribe();
    }
  }

  // Campo de Pesquisa:
  searchText: string = '';
  search() {
    // Se o texto de busca estiver vazio, busque todos os administradores
    if (!this.searchText.trim()) {
      this.administradorService.findAll().subscribe(
        data => {
          this.administradores = data;
        },
        error => {
          console.error('Erro ao buscar administradores:', error);
        }
      );
      return;
    }
    // Converter searchText para minúsculas para busca insensível a maiúsculas e minúsculas
    const termoDeBusca = this.searchText.toLowerCase();
    this.administradorService.findByNome(termoDeBusca).subscribe(
      data => {
        this.administradores = data;
      },
      error => {
        console.error('Erro ao buscar por nome:', error);
      }
    );
  }

  //Caixa de dialogo para excluir 
  confirmDelete(administrador: Administrador): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true && administrador && administrador.id !== undefined) {

        this.administradorService.delete(administrador).subscribe(
          () => {
            // Atualizar lista de administradores após exclusão
            this.administradores = this.administradores.filter(adm => adm.id !== administrador.id);
          }
        );
      }
    });
  }

  visualizarDados(administrador: Administrador): void {
    this.dialog.open(ViewAdmComponent, {
      width: '600px',
      height: '545px',
      data: administrador
    });
  }
}