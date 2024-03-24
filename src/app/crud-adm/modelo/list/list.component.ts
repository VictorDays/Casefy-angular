import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { NavsideComponent } from "../../../components/navside/navside.component";
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from '../../../components/confirmation/confirmation-dialog.component';
import { ViewMarcaComponent } from '../../marca/view/view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ViewAdmComponent } from '../../administrador/view/view-dialog.component';
import { ModeloService } from '../../../components/services/modelo.service';
import { Modelo } from '../../models/modelo.models';

@Component({
    selector: 'app-list',
    standalone: true,
    templateUrl: './list.component.html',
    styleUrl: './list.component.css',
    imports: [RouterModule, ViewAdmComponent, ConfirmationDialogComponent, ReactiveFormsModule, FormsModule,
      HeaderComponent, NavsideComponent, MatInputModule, MatFormFieldModule,
      MatIconModule, MatTableModule]
})
export class ModeloListComponent {
    displayedColumns: string[] = ['id', 'nome', 'marca', 'acao'];
    modelos: Modelo[] = [];
    modelobscription: Subscription | undefined;

    constructor(private dialog: MatDialog,
        private modeloService: ModeloService) { }

    ngOnInit(): void {
        this.modelobscription = this.modeloService.findAll().subscribe(data => {
          this.modelos = data;
          console.log(data);
        });
      }
    
      //Verifica se this.administradoresSubscription existe e não é nulo.
      ngOnDestroy(): void {
        if (this.modelobscription) {
          this.modelobscription.unsubscribe();
        }
      }
    
      // Campo de Pesquisa:
      searchText: string = '';
      search() {
        // Se o texto de busca estiver vazio, busque todos os administradores
        if (!this.searchText.trim()) {
          this.modeloService.findAll().subscribe(
            data => {
              this.modelos = data;
            },
            error => {
              console.error('Erro ao buscar administradores:', error);
            }
          );
          return;
        }
        // Converter searchText para minúsculas para busca insensível a maiúsculas e minúsculas
        const termoDeBusca = this.searchText.toLowerCase();
        this.modeloService.findByNome(termoDeBusca).subscribe(
          data => {
            this.modelos = data;
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
                // Atualizar lista de administradores após exclusão
                this.modelos = this.modelos.filter(adm => adm.id !== modelo.id);
              }
            );
          }
        });
      }
    
      visualizarDados(modelo: Modelo): void {
        this.dialog.open(ViewMarcaComponent, {
          data: modelo
        });
      }
}
