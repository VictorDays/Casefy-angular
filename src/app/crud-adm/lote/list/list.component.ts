import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../components/confirmation/confirmation-dialog.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { NavsideComponent } from '../../../components/navside/navside.component';
import { Lote } from '../../models/lote.models';
import { MatDialog } from '@angular/material/dialog';
import { LoteService } from '../../services/lote.service';
import { Subscription } from 'rxjs';
import { ViewLoteComponent } from '../view/view-dialog.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule, ViewLoteComponent, ConfirmationDialogComponent, ReactiveFormsModule, FormsModule,
    HeaderComponent, NavsideComponent, MatInputModule, MatFormFieldModule,
    MatIconModule, MatTableModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})

export class LoteListComponent {
  displayedColumns: string[] = ['id', 'codigo', 'data', 'quantidadeItens', 'fornecedor', 'acao'];
  lotes: Lote[] = [];

  lotesSubscription: Subscription | undefined;

  constructor(private dialog: MatDialog,
    private loteService: LoteService,
    private router: Router) { }

  ngOnInit(): void {
    this.lotesSubscription = this.loteService.findAll().subscribe(data => {
      this.lotes = data;
      console.log(data);
    });
  }

  //Verifica se this.lotesSubscription existe e não é nulo.
  ngOnDestroy(): void {
    if (this.lotesSubscription) {
      this.lotesSubscription.unsubscribe();
    }
  }

  // Campo de Pesquisa:
  searchText: string = '';
  search() {
    // Se o texto de busca estiver vazio, busque todos os lotes
    if (!this.searchText.trim()) {
      this.loteService.findAll().subscribe(
        data => {
          this.lotes = data;
        },
        error => {
          console.error('Erro ao buscar lotes:', error);
        }
      );
      return;
    }
    // Converter searchText para minúsculas para busca insensível a maiúsculas e minúsculas
    const termoDeBusca = this.searchText.toLowerCase();
    this.loteService.findByCodigo(termoDeBusca).subscribe(
      data => {
        this.lotes = data;
      },
      error => {
        console.error('Erro ao buscar por data:', error);
      }
    );
  }

  //Caixa de dialogo para excluir 
  confirmDelete(lote: Lote): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true && lote && lote.id !== undefined) {

        this.loteService.delete(lote).subscribe(
          () => {
            // Atualizar lista de lotes após exclusão
            this.lotes = this.lotes.filter(adm => adm.id !== lote.id);
          }
        );
      }
    });
  }

  visualizarDados(lote: Lote): void {
    this.dialog.open(ViewLoteComponent, {
      data: lote
    });
  }
  editar(id: number): void {
    this.router.navigate(['/lote/edit', id]);
  }
}