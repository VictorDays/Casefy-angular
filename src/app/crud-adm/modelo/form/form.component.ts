import { Component } from '@angular/core';
import { NavsideComponent } from "../../../components/navside/navside.component";
import { HeaderComponent } from "../../../components/header/header.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modelo } from '../../models/modelo.models';
import { ModeloService } from '../../services/modelo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Marca } from '../../models/marca.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationDialogComponent } from '../../../components/confirmation/confirmation-dialog.component';
import { ErrorComponent } from '../../../components/error/error.component';

@Component({
    selector: 'app-form',
    standalone: true,
    templateUrl: './form.component.html',
    styleUrl: './form.component.css',
    imports: [NavsideComponent, HeaderComponent]
})
export class ModeloFormComponent {
  modelos: Modelo[] = [];
  marca: Marca[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modeloService: ModeloService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private dialogError: MatDialog
  ) {
    const modelo: Modelo = this.activatedRoute.snapshot.data['modelo'];
    this.formGroup = this.formBuilder.group({
      id: [modelo?.id || null],
      nome: [modelo?.nome || '', Validators.required],
      marca: [modelo?.idMarca || '', Validators.required],

    });
  }



  salvar() {
    console.log(this.marca);
    console.log('Entrou no salvar');
    console.log('Formulário:', this.formGroup.value);
    console.log('Formulário válido:', this.formGroup.valid);

    // Verificar se o formulário é válido
    if (this.formGroup.valid) {
      const modelo = this.formGroup.value;
      // Verificar se é uma inserção ou atualização
      if (modelo.id == null) {
        console.log(modelo.marca);
        // Inserir novo modelo
        this.modeloService.insert(modelo).subscribe({
          next: (modeloService) => {
            this.router.navigateByUrl('/modelos/list');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
            if (err instanceof HttpErrorResponse && err.error && err.error.errors && err.error.errors.length > 0) {
              const errorMessage = err.error.errors[0].message;
              this.mostrarErro(errorMessage);
            } else {
              this.mostrarErro('Erro ao criar modelo de capinha: ' + err.message);
            }
          }
        });
      } else {
        // Atualizar modelo existente
        this.modeloService.update(modelo).subscribe({
          next: (modeloService) => {
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
    if (this.formGroup.valid) {
      const modelo = this.formGroup.value;
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


}
