import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';

import { AdministradorService } from '../../../services/admistrador.service';
import { Administrador } from '../../../models/administrador.model';

import { HeaderComponent } from '../../../components/header/header.component';
import { NavsideComponent } from '../../../components/navside/navside.component';
import { ViewAdmComponent } from '../view/view-dialog.component';
import { ConfirmationDialogComponent } from '../../../components/confirmation/confirmation-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule, ViewAdmComponent, ConfirmationDialogComponent, ReactiveFormsModule, FormsModule,
    HeaderComponent, NavsideComponent, MatInputModule, MatFormFieldModule,
    MatIconModule, MatTableModule, MatPaginatorModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class AdmListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'nome', 'nivel', 'acao'];
  administradores: Administrador[] = [];
  administradoresSubscription: Subscription | undefined;

  totalRecords = 0;
  pageSize = 10;
  page = 0;
  searchText: string = '';

  constructor(private dialog: MatDialog,
    private administradorService: AdministradorService) { }

  ngOnInit(): void {
    this.administradorService.findAll(this.page, this.pageSize).subscribe(data => {
      this.administradores = data;
      console.log(this.administradores);
    });

    this.administradorService.count().subscribe(data => {
      this.totalRecords = data;
      console.log(this.administradores);
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  //Verifica se this.administradoresSubscription existe e não é nulo.
  ngOnDestroy(): void {
    if (this.administradoresSubscription) {
      this.administradoresSubscription.unsubscribe();
    }
  }

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
  confirmDelete(admin: Administrador): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true && admin && admin.id !== undefined) {

        this.administradorService.delete(admin).subscribe(
          () => {
            // Atualizar lista de administradores após exclusão
            this.administradores = this.administradores.filter(adm => adm.id !== admin.id);
          }
        );
      }
    });
  }

  visualizarDados(admin: Administrador): void {
    this.dialog.open(ViewAdmComponent, {
      data: admin
    });
  }
}
