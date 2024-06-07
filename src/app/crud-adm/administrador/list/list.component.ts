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
  displayedColumns: string[] = ['id', 'nome', 'matricula', 'nivel', 'acao'];
  administradores: Administrador[] = [];

  totalRecords = 0;
  pageSize = 2;
  page = 0;
  searchText: string = '';
  administradoresSubscription: Subscription | undefined;

  constructor(private dialog: MatDialog,
    private administradorService: AdministradorService,
    private router: Router) { }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.administradores = [];
    this.administradorService.findAll(this.page, this.pageSize, this.searchText).subscribe(data =>{
      this.administradores = data;
    });

    this.administradorService.count().subscribe(data =>{
      this.totalRecords = data;
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarDados();
  }

  ngOnDestroy(): void {
    if (this.administradoresSubscription) {
      this.administradoresSubscription.unsubscribe();
    }
  }

  confirmDelete(administrador: Administrador): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true && administrador && administrador.id !== undefined) {
        this.administradorService.delete(administrador).subscribe(
          () => {
            this.administradores = this.administradores.filter(adm => adm.id !== administrador.id);
          }
        );
      }
    });
  }

  visualizarDados(administrador: Administrador): void {
    this.dialog.open(ViewAdmComponent, {
      data: administrador
    });
  }

  editar(id: number): void {
    this.router.navigate(['/adm/edit', id]);
  }
}
