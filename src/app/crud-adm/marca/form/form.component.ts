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
import { Marca } from '../../models/marca.model';
import { MarcaService } from '../../services/marca.service';
import { ErrorComponent } from '../../../components/error/error.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ErrorComponent, CommonModule, MatSelectModule, MatOptionModule, RouterModule, NgIf, HeaderComponent, NavsideComponent, ReactiveFormsModule, FormsModule,
    NavsideComponent, MatInputModule, MatFormFieldModule, MatIconModule, ConfirmationDialogComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class MarcaFormComponent {
  marcas: Marca[] = [];
  formGroupMarca!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private marcaService: MarcaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private dialogError: MatDialog
  ) {
    const marca: Marca = this.activatedRoute.snapshot.data['marca'];
    this.formGroupMarca = this.formBuilder.group({
      id: [marca?.id || null],
      nome: [marca?.nome || '', Validators.required],
    });
  }



  salvar() {
    console.log('Entrou no salvar');
    console.log('Formulário:', this.formGroupMarca.value);
    console.log('Formulário válido:', this.formGroupMarca.valid);

    // Validar o formulário antes de prosseguir
    this.enviarFormulario();

    // Verificar se o formulário é válido
    if (this.formGroupMarca.valid) {
      const marca = this.formGroupMarca.value;
      // Verificar se é uma inserção ou atualização
      if (marca.id == null) {
        console.log(marca.nivelAcesso);
        // Inserir novo administrador
        this.marcaService.insert(marca).subscribe({
          next: (marcaService) => {
            this.router.navigateByUrl('/marcas/list');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
            if (err instanceof HttpErrorResponse && err.error && err.error.errors && err.error.errors.length > 0) {
              const errorMessage = err.error.errors[0].message;
              this.mostrarErro(errorMessage);
            } else {
              this.mostrarErro('Erro ao criar marcas: ' + err.message);
            }
          }
        });
      } else {
        // Atualizar administrador existente
        this.marcaService.update(marca).subscribe({
          next: (marcaService) => {
            this.router.navigateByUrl('/marcas/list');
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
    if (this.formGroupMarca.valid) {
      const marca = this.formGroupMarca.value;
      if (marca.id != null) {
        this.marcaService.delete(marca).subscribe({
          next: () => {
            this.router.navigateByUrl('/marcas/list');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

  confirmDelete(marca: Marca): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true && marca && marca.id !== undefined) {
        this.marcaService.delete(marca).subscribe(
          () => {
            // Atualizar lista de administradores após exclusão
            this.marcas = this.marcas.filter(adm => adm.id !== marca.id);

            // Redirecionar para '/adm/list'
            this.router.navigateByUrl('/marcas/list');
          },
          error => {
            console.log('Erro ao excluir marca:', error);
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
