import { Component } from '@angular/core';
import { Promocao } from '../../models/Promocao.model';
import { MatDialog } from '@angular/material/dialog';
import { PromocaoService } from '../../services/promocao.service';
import { ConfirmationDialogComponent } from '../../../components/confirmation/confirmation-dialog.component';
import { ViewPromocaoComponent } from '../view/view.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { NavsideComponent } from '../../../components/navside/navside.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule, ViewPromocaoComponent, ConfirmationDialogComponent, ReactiveFormsModule, FormsModule,
    HeaderComponent, NavsideComponent, MatInputModule, MatFormFieldModule,
    MatIconModule, MatTableModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class PromocaoListComponent {
  displayedColumns: string[] = ['id', 'codigo', 'descricao', 'valorDesconto', 'acao'];
  promocoes: Promocao[] = [];

  promocoesSubscription: Subscription | undefined;

  constructor(private dialog: MatDialog,
    private promocaoService: PromocaoService) { }

  ngOnInit(): void {
    this.promocoesSubscription = this.promocaoService.findAll().subscribe(data => {
      this.promocoes = data;
      console.log(data);
    });
  }

  //Verifica se this.promocoesSubscription existe e não é nulo.
  ngOnDestroy(): void {
    if (this.promocoesSubscription) {
      this.promocoesSubscription.unsubscribe();
    }
  }

  // Campo de Pesquisa:
  searchText: string = '';
  search() {
    // Se o texto de busca estiver vazio, busque todos os promocoes
    if (!this.searchText.trim()) {
      this.promocaoService.findAll().subscribe(
        data => {
          this.promocoes = data;
        },
        error => {
          console.error('Erro ao buscar promocoes:', error);
        }
      );
      return;
    }
    // Converter searchText para minúsculas para busca insensível a maiúsculas e minúsculas
    const termoDeBusca = this.searchText.toLowerCase();
    this.promocaoService.findByCodigo(termoDeBusca).subscribe(
      data => {
        this.promocoes = data;
      },
      error => {
        console.error('Erro ao buscar por codigo:', error);
      }
    );
  }

  //Caixa de dialogo para excluir 
  confirmDelete(promocao: Promocao): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true && promocao && promocao.id !== undefined) {

        this.promocaoService.delete(promocao).subscribe(
          () => {
            // Atualizar lista de promocoes após exclusão
            this.promocoes = this.promocoes.filter(adm => adm.id !== promocao.id);
          }
        );
      }
    });
  }

  visualizarDados(promocao: Promocao): void {
    this.dialog.open(ViewPromocaoComponent, {
      data: promocao
    });
  }
}