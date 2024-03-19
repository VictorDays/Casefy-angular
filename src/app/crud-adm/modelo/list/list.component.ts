import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { NavsideComponent } from '../../../components/navside/navside.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { Modelo } from '../../models/modelocapinha.model';
import { ModeloService } from '../../services/modelo.service';

@Component({
    selector: 'app-modelo-list',
    standalone: true,
    templateUrl: './list.component.html',
    styleUrl: './list.component.css',
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
