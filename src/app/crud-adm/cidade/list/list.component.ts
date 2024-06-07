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
import { Cidade } from '../../../models/cidade.models';
import { MatDialog } from '@angular/material/dialog';
import { CidadeService } from '../../../services/cidade.service';
import { Subscription } from 'rxjs';
import { ViewCidadeComponent } from '../view/view.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule, ViewCidadeComponent, ConfirmationDialogComponent, ReactiveFormsModule, FormsModule,
    HeaderComponent, NavsideComponent, MatInputModule, MatFormFieldModule,
    MatIconModule, MatTableModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class CidadeListComponent {
  displayedColumns: string[] = ['id', 'nome', 'estado', 'acao'];
  cidades: Cidade[] = [];

  cidadesSubscription: Subscription | undefined;

  constructor(private dialog: MatDialog,
    private cidadeService: CidadeService,
    private router: Router) { }

  ngOnInit(): void {
    this.cidadesSubscription = this.cidadeService.findAll().subscribe(data => {
      this.cidades = data;
      console.log(data);
    });
  }

  //Verifica se this.cidadesSubscription existe e não é nulo.
  ngOnDestroy(): void {
    if (this.cidadesSubscription) {
      this.cidadesSubscription.unsubscribe();
    }
  }

  // Campo de Pesquisa:
  searchText: string = '';
  search() {
    // Se o texto de busca estiver vazio, busque todos os cidades
    if (!this.searchText.trim()) {
      this.cidadeService.findAll().subscribe(
        data => {
          this.cidades = data;
        },
        error => {
          console.error('Erro ao buscar cidades:', error);
        }
      );
      return;
    }
    // Converter searchText para minúsculas para busca insensível a maiúsculas e minúsculas
    const termoDeBusca = this.searchText.toLowerCase();
    this.cidadeService.findByNome(termoDeBusca).subscribe(
      data => {
        this.cidades = data;
      },
      error => {
        console.error('Erro ao buscar por nome:', error);
      }
    );
  }

  //Caixa de dialogo para excluir 
  confirmDelete(cidade: Cidade): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true && cidade && cidade.id !== undefined) {

        this.cidadeService.delete(cidade).subscribe(
          () => {
            // Atualizar lista de cidades após exclusão
            this.cidades = this.cidades.filter(adm => adm.id !== cidade.id);
          }
        );
      }
    });
  }

  visualizarDados(cidade: Cidade): void {
    this.dialog.open(ViewCidadeComponent, {
      data: cidade
    });
  }
  editar(id: number): void {
    this.router.navigate(['/cidade/edit', id]);
  }
}