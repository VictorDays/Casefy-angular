import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { NavsideComponent } from '../../../components/navside/navside.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../components/confirmation/confirmation-dialog.component';
import { ViewModeloComponent } from '../../../crud-adm/modelo/view/view.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Modelo } from '../../../models/modelo.models';
import { ModeloService } from '../../../services/modelo.service';

@Component({
  selector: 'app-marca-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  imports: [RouterModule, ViewModeloComponent, ConfirmationDialogComponent, ReactiveFormsModule, FormsModule,
    HeaderComponent, NavsideComponent, MatInputModule, MatFormFieldModule,
    MatIconModule, MatTableModule]
})
export class ModeloListComponent {
  displayedColumns: string[] = ['id', 'nome', 'marca', 'acao'];
  modelo: Modelo[] = [];
  modeloSubscription: Subscription | undefined;

  constructor(private dialog: MatDialog,
    private modeloService: ModeloService) { }

  ngOnInit(): void {
    this.modeloSubscription = this.modeloService.findAll().subscribe(data => {
      this.modelo = data;
      console.log(data);
    });
  }

  //Verifica se this.modeloSubscription existe e não é nulo.
  ngOnDestroy(): void {
    if (this.modeloSubscription) {
      this.modeloSubscription.unsubscribe();
    }
  }

  // Campo de Pesquisa:
  searchText: string = '';
  search() {
    // Se o texto de busca estiver vazio, busque todos os administradores
    if (!this.searchText.trim()) {
      this.modeloService.findAll().subscribe(
        data => {
          this.modelo = data;
        },
        error => {
          console.error('Erro ao buscar modelos:', error);
        }
      );
      return;
    }
    // Converter searchText para minúsculas para busca insensível a maiúsculas e minúsculas
    const termoDeBusca = this.searchText.toLowerCase();
    this.modeloService.findByNome(termoDeBusca).subscribe(
      data => {
        this.modelo = data;
      },
      error => {
        console.error('Erro ao buscar por nome:', error);
      }
    );
  }

  //Caixa de dialogo para excluir 
  confirmDelete(modelo: Modelo): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true && modelo && modelo.id !== undefined) {

        this.modeloService.delete(modelo).subscribe(
          () => {
            // Atualizar lista de modelos após exclusão
            this.modelo = this.modelo.filter(adm => adm.id !== modelo.id);
          }
        );
      }
    });
  }

  visualizarDados(modelo: Modelo): void {
    this.dialog.open(ViewModeloComponent, {
      data: modelo
    });
  }

}
