import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { NavsideComponent } from '../../../components/navside/navside.component';
import { ConfirmationDialogComponent } from '../../../components/confirmation/confirmation-dialog.component';
import { Modelo } from '../../../models/modelo.models';
import { ErrorComponent } from '../../../components/error/error.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ModeloService } from '../../../services/modelo.service';
import { Marca } from '../../../models/marca.model';
import { MarcaService } from '../../../services/marca.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ErrorComponent, CommonModule, MatSelectModule, MatOptionModule, RouterModule, NgIf, HeaderComponent, NavsideComponent, ReactiveFormsModule, FormsModule,
    NavsideComponent, MatInputModule, MatFormFieldModule, MatIconModule, ConfirmationDialogComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class ModeloFormComponent {
  modelos: Modelo[] = [];
  marcas: Marca[] = [];
  formGroupModelo!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modeloService: ModeloService,
    private marcaService: MarcaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private dialogError: MatDialog
  ) {
    const modelo: Modelo = this.activatedRoute.snapshot.data['modelo'];
    this.formGroupModelo = this.formBuilder.group({
      id: [modelo?.id || null],
      nome: [modelo?.nome || '', Validators.required],
      marca: [modelo?.marca || '', Validators.required],
    });
  }

  ngOnInit(): void {
    this.marcaService.findAll().subscribe(data => {
      this.marcas = data;
      this.initializeFormMarca();
    });
  }

  //Inicializa o select 
  initializeFormMarca() {
    const modelo: any = this.activatedRoute.snapshot.data['modelo'];
    const marcaId = modelo && modelo.marca ? modelo.marca.id : null;
  
    this.formGroupModelo = this.formBuilder.group({
      id: [modelo && modelo.id ? modelo.id : null],
      nome: [modelo && modelo.nome ? modelo.nome : '', Validators.required],
      marca: [marcaId]
    });
  }

  salvar() {
    console.log('Entrou no salvar');
    console.log('Formulário:', this.formGroupModelo.value);
    console.log('Formulário válido:', this.formGroupModelo.valid);

    // Validar o formulário antes de prosseguir
    this.enviarFormulario();

    // Verificar se o formulário é válido
    if (this.formGroupModelo.valid) {
      const modelo = this.formGroupModelo.value;
      const modeloAtualizado = {
        ...modelo,
        marca: { id: modelo.marca } // Passa apenas o ID da marca
      };
      
      if (modelo.id == null) {
        // Inserir novo modelo
        this.modeloService.insert(modeloAtualizado).subscribe({
          next: (marcaService) => {
            this.router.navigateByUrl('/modelos/list');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
            if (err instanceof HttpErrorResponse && err.error && err.error.errors && err.error.errors.length > 0) {
              const errorMessage = err.error.errors[0].message;
              this.mostrarErro(errorMessage);
            } else {
              this.mostrarErro('Erro ao criar modelos: ' + err.message);
            }
          }
        });
      } else {
        // Atualizar modelo existente
        this.modeloService.update(modeloAtualizado).subscribe({
          next: (ModeloService) => {
            this.router.navigateByUrl('/modelos/list');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          }
        });
      }
    } else {
      // Se o formulário for inválido, exibir mensagem de erro
      console.log('Formulário inválido');
      this.mostrarErro('Por favor, preencha todos os campos obrigatórios.');
    }
  }


  excluir() {
    if (this.formGroupModelo.valid) {
      const modelo = this.formGroupModelo.value;
      if (modelo.id != null) {
        this.modeloService.delete(modelo).subscribe({
          next: () => {
            this.router.navigateByUrl('/modelos/list');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

  confirmDelete(modelo: Modelo): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true && modelo && modelo.id !== undefined) {
        this.modeloService.delete(modelo).subscribe(
          () => {
            // Atualizar lista de administradores após exclusão
            this.modelos = this.modelos.filter(adm => adm.id !== modelo.id);

            // Redirecionar para '/adm/list'
            this.router.navigateByUrl('/modelos/list');
          },
          error => {
            console.log('Erro ao excluir modelo:', error);
          }
        );
      }
    });
  }

  mostrarErro(mensagemErro: string): void {
    this.dialog.open(ErrorComponent, {
      data: mensagemErro
    });
  }

  enviarFormulario(): void {


  }
}
