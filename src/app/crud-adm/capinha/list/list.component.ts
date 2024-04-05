import { Component } from '@angular/core';
import { Capinha } from '../../models/capinha.model';
import { Subscription } from 'rxjs';
import { CapinhaService } from '../../services/capinha.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../components/confirmation/confirmation-dialog.component';
import { ViewModeloComponent } from '../../modelo/view/view.component';
import { NavsideComponent } from "../../../components/navside/navside.component";
import { HeaderComponent } from "../../../components/header/header.component";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-list',
    standalone: true,
    templateUrl: './list.component.html',
    styleUrl: './list.component.css',
    imports: [RouterModule, ViewModeloComponent, ConfirmationDialogComponent, ReactiveFormsModule, FormsModule,
      HeaderComponent, NavsideComponent, MatInputModule, MatFormFieldModule,
      MatIconModule, MatTableModule]
})
export class CapinhaListComponent {
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'valor','acao'];
  capinha: Capinha[] = [];
  capinhaSubscription: Subscription | undefined;

  constructor(private dialog: MatDialog,
    private capinhaService: CapinhaService) { }

  ngOnInit(): void {
    this.capinhaSubscription = this.capinhaService.findAll().subscribe(data => {
      this.capinha = data;
      console.log(data);
    });
  }

  //Verifica se this.modeloSubscription existe e não é nulo.
  ngOnDestroy(): void {
    if (this.capinhaSubscription) {
      this.capinhaSubscription.unsubscribe();
    }
  }

  // Campo de Pesquisa:
  searchText: string = '';
  search() {
    // Se o texto de busca estiver vazio, busque todos os administradores
    if (!this.searchText.trim()) {
      this.capinhaService.findAll().subscribe(
        data => {
          this.capinha = data;
        },
        error => {
          console.error('Erro ao buscar capinhas:', error);
        }
      );
      return;
    }
    // Converter searchText para minúsculas para busca insensível a maiúsculas e minúsculas
    const termoDeBusca = this.searchText.toLowerCase();
    this.capinhaService.findByNome(termoDeBusca).subscribe(
      data => {
        this.capinha = data;
      },
      error => {
        console.error('Erro ao buscar por nome:', error);
      }
    );
  }

  //Caixa de dialogo para excluir 
  confirmDelete(capinha: Capinha): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true && capinha && capinha.id !== undefined) {

        this.capinhaService.delete(capinha).subscribe(
          () => {
            // Atualizar lista de modelos após exclusão
            this.capinha = this.capinha.filter(adm => adm.id !== capinha.id);
          }
        );
      }
    });
  }

  visualizarDados(capinha: Capinha): void {
    this.dialog.open(ViewModeloComponent, {
      data: capinha
    });
  }
}
