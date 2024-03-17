import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { NavsideComponent } from '../../navside/navside.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { AdministradorService } from '../../services/admistrador.service';
import { Administrador } from '../../models/administrador.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [FormsModule, HeaderComponent, NavsideComponent, MatInputModule, MatFormFieldModule,
    MatIconModule, MatTableModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListAdmComponent {
  displayedColumns: string[] = ['nome', 'matricula', 'nivel', 'acao'];
  administradores: Administrador[] = [];
  administradoresSubscription: Subscription | undefined;

  constructor(private administradorService: AdministradorService) { }

  ngOnInit(): void {
    this.administradoresSubscription = this.administradorService.findAll().subscribe(data => {
      this.administradores = data;
      console.log(data);
    });
  }

  //Verifica se this.administradoresSubscription existe e não é nulo.
  ngOnDestroy(): void {
    if (this.administradoresSubscription) {
      this.administradoresSubscription.unsubscribe();
    }
  }

  // Campo de Pesquisa:
  searchText: string = '';

  search() {
    // Se não houver texto na caixa de busca, exiba todos os administradores
    if (!this.searchText.trim()) {
      this.administradorService.findAll().subscribe(data => {
        this.administradores = data;
      });
      return;
    }
    let matricula: number = parseInt(this.searchText, 10);
    // Verifica se o searchText é uma string numérica
    if (!isNaN(parseInt(this.searchText))) {
      console.log("entrou nos numero");
      let matricula: number = parseInt(this.searchText, 10);
      // Chama o método findByMatricula do serviço
      this.administradorService.findByMatricula(matricula).subscribe(data => {
        this.administradores = data;
      });

    } else {
      // Converta o texto da caixa de busca para minúsculas para tornar a busca insensível a maiúsculas e minúsculas
      const termoDeBusca = this.searchText.toLowerCase();
      // Filtrar a lista de administradores com base no termo de busca
      this.administradorService.findByNome(this.searchText).subscribe(data => {
        this.administradores = data;
      });
    }

  }
}