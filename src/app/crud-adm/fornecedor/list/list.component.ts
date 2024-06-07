import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from '../../../components/confirmation/confirmation-dialog.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { NavsideComponent } from '../../../components/navside/navside.component';
import { FornecedorService } from '../../../services/fornecedor.service';
import { ViewFornecedorComponent } from '../view/view.component';
import { Fornecedor } from '../../../models/fornecedor.models';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule, ViewFornecedorComponent, ConfirmationDialogComponent, ReactiveFormsModule, FormsModule,
    HeaderComponent, NavsideComponent, MatInputModule, MatFormFieldModule,
    MatIconModule, MatTableModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class FornecedorListComponent {
  displayedColumns: string[] = ['id', 'nome', 'cnpj', 'email', 'acao'];
  fornecedores: Fornecedor[] = [];
  fornecedoresSubscription: Subscription | undefined;

  constructor(private dialog: MatDialog,
    private cidadeService: FornecedorService) { }

  ngOnInit(): void {
    this.fornecedoresSubscription = this.cidadeService.findAll().subscribe(data => {
      this.fornecedores = data;
      console.log(data);
    });
  }

  //Verifica se this.fornecedoresSubscription existe e não é nulo.
  ngOnDestroy(): void {
    if (this.fornecedoresSubscription) {
      this.fornecedoresSubscription.unsubscribe();
    }
  }

  // Campo de Pesquisa:
  searchText: string = '';
  search() {
    // Se o texto de busca estiver vazio, busque todos os fornecedores
    if (!this.searchText.trim()) {
      this.cidadeService.findAll().subscribe(
        data => {
          this.fornecedores = data;
        },
        error => {
          console.error('Erro ao buscar fornecedores:', error);
        }
      );
      return;
    }
    // Converter searchText para minúsculas para busca insensível a maiúsculas e minúsculas
    const termoDeBusca = this.searchText.toLowerCase();
    this.cidadeService.findByNome(termoDeBusca).subscribe(
      data => {
        this.fornecedores = data;
      },
      error => {
        console.error('Erro ao buscar por nome:', error);
      }
    );
  }

  //Caixa de dialogo para excluir 
  confirmDelete(cidade: Fornecedor): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true && cidade && cidade.id !== undefined) {

        this.cidadeService.delete(cidade).subscribe(
          () => {
            // Atualizar lista de fornecedores após exclusão
            this.fornecedores = this.fornecedores.filter(adm => adm.id !== cidade.id);
          }
        );
      }
    });
  }

  visualizarDados(fornecedor: Fornecedor): void {
    this.dialog.open(ViewFornecedorComponent, {
      data: fornecedor
    });
  }
}