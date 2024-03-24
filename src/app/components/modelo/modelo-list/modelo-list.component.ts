import { Component } from '@angular/core';
import { NavsideComponent } from "../../navside/navside.component";
import { HeaderComponent } from "../../header/header.component";
import { Modelo } from '../../models/modelocapinha.model';
import { Subscription } from 'rxjs';
import { ModeloService } from '../../services/modelo.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-modelo-list',
    standalone: true,
    templateUrl: './modelo-list.component.html',
    styleUrl: './modelo-list.component.css',
    imports: [NavsideComponent, HeaderComponent, FormsModule, ReactiveFormsModule, MatTableModule]
})
export class ModeloListComponent {
    displayedColumns: string[] = ['nome', 'marca'];
    modelos: Modelo[] = [];
    modelosSubscription: Subscription | undefined;

    constructor(private modeloService: ModeloService) { }

    ngOnInit(): void {
        this.modelosSubscription = this.modeloService.findAll().subscribe(data => {
            this.modelos = data;
            console.log(data);
        });
    }

    //Verifica se this.modeloSubscription existe e não é nulo.
    ngOnDestroy(): void {
        if (this.modelosSubscription) {
            this.modelosSubscription.unsubscribe();
        }
    }

    // Campo de Pesquisa:
    searchText: string = '';

    search() {
        // Se não houver texto na caixa de busca, exiba todos os modelos
        if (!this.searchText.trim()) {
            this.modeloService.findAll().subscribe(data => {
                this.modelos = data;
            });
            return;
        }
        // Converta o texto da caixa de busca para minúsculas para tornar a busca insensível a maiúsculas e minúsculas
        const termoDeBusca = this.searchText.toLowerCase();
        // Filtrar a lista de administradores com base no termo de busca
        this.modeloService.findByNome(this.searchText).subscribe(data => {
            this.modelos = data;
        });

    }

}
