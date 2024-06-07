import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { NavsideComponent } from '../../../components/navside/navside.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../components/confirmation/confirmation-dialog.component';
import { ViewMarcaComponent } from '../../../crud-adm/marca/view/view.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Marca } from '../../../models/marca.model';
import { MarcaService } from '../../../services/marca.service';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-marca-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  imports: [RouterModule, ViewMarcaComponent, ConfirmationDialogComponent, ReactiveFormsModule, FormsModule,
    HeaderComponent, NavsideComponent, MatInputModule, MatFormFieldModule,
    MatIconModule, MatTableModule, MatPaginatorModule]
})
export class MarcaListComponent {
  displayedColumns: string[] = ['id', 'nome', 'acao'];
  marca: Marca[] = [];
  marcaSubscription: Subscription | undefined;

  totalRecords = 0;
  pageSize = 10;
  page = 0;
  searchText: string = '';

  constructor(private dialog: MatDialog,
    private marcaService: MarcaService) { }

  ngOnInit(): void {
    this.marcaService.findAll(this.page, this.pageSize).subscribe(data => {
      this.marca = data;
      console.log(this.marca);
    });

    this.marcaService.count().subscribe(data => {
      this.totalRecords = data;
      console.log(this.marca);
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  //Verifica se this.administradoresSubscription existe e não é nulo.
  ngOnDestroy(): void {
    if (this.marcaSubscription) {
      this.marcaSubscription.unsubscribe();
    }
  }

  search() {
    // Se o texto de busca estiver vazio, busque todos os administradores
    if (!this.searchText.trim()) {
      this.marcaService.findAll().subscribe(
        data => {
          this.marca = data;
        },
        error => {
          console.error('Erro ao buscar marcas:', error);
        }
      );
      return;
    }
    // Converter searchText para minúsculas para busca insensível a maiúsculas e minúsculas
    const termoDeBusca = this.searchText.toLowerCase();
    this.marcaService.findByNome(termoDeBusca).subscribe(
      data => {
        this.marca = data;
      },
      error => {
        console.error('Erro ao buscar por nome:', error);
      }
    );
  }

  //Caixa de dialogo para excluir 
  confirmDelete(marca: Marca): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true && marca && marca.id !== undefined) {

        this.marcaService.delete(marca).subscribe(
          () => {
            // Atualizar lista de administradores após exclusão
            this.marca = this.marca.filter(adm => adm.id !== marca.id);
          }
        );
      }
    });
  }

  visualizarDados(marca: Marca): void {
    this.dialog.open(ViewMarcaComponent, {
      data: marca
    });
  }

}
