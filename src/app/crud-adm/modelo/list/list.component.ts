import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { NavsideComponent } from '../../../components/navside/navside.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { Modelo } from '../../models/modelocapinha.model';
import { ModeloService } from '../../services/modelo.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../components/confirmation/confirmation-dialog.component';
import { ViewDialogComponent } from '../../../components/view/view-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-modelo-list',
    standalone: true,
    templateUrl: './list.component.html',
    styleUrl: './list.component.css',
    imports: [RouterModule, ViewDialogComponent, ConfirmationDialogComponent, ReactiveFormsModule, FormsModule,
        HeaderComponent, NavsideComponent, MatInputModule, MatFormFieldModule,
        MatIconModule, MatTableModule]
})
export class ModeloListComponent {
    displayedColumns: string[] = ['nome', 'marca'];
    modelos: Modelo[] = [];
    modelosSubscription: Subscription | undefined;

    constructor(private dialog: MatDialog,
        private modeloService: ModeloService) { }

    ngOnInit(): void {
        this.modelosSubscription = this.modeloService.findAll().subscribe(data => {
          this.modelos = data;
          console.log(data);
        });
      }
    
      //Verifica se this.administradoresSubscription existe e não é nulo.
      ngOnDestroy(): void {
        if (this.modelosSubscription) {
          this.modelosSubscription.unsubscribe();
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
        this.dialog.open(ViewDialogComponent, {
          width: '600px',
          height: '545px',
          data: modelo
        });
      }

}
