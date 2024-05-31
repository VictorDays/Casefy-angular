import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


import { AdministradorService } from '../../../services/admistrador.service';
import { Administrador } from '../../../models/administrador.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../components/confirmation/confirmation-dialog.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { NavsideComponent } from '../../../components/navside/navside.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ErrorComponent } from '../../../components/error/error.component';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ErrorComponent, CommonModule, MatSelectModule,
    MatOptionModule, RouterModule, NgIf, HeaderComponent,
    NavsideComponent, ReactiveFormsModule, FormsModule,
    NavsideComponent, MatInputModule, MatFormFieldModule,
    MatIconModule, ConfirmationDialogComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class AdmFormComponent {
  administradores: Administrador[] = [];
  formGroup!: FormGroup;
  niveisAcesso = [
    { id: 1, label: 'Analista' },
    { id: 2, label: 'Supervisor' },
    { id: 3, label: 'Gerente' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private administradorService: AdministradorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private dialogError: MatDialog
  ) {
    const administrador: Administrador = this.activatedRoute.snapshot.data['administrador'];
    this.formGroup = this.formBuilder.group({
      id: [administrador?.id || null],
      nome: [administrador?.nome || '', Validators.required],
      cpf: [administrador?.cpf || '', Validators.required],
      matricula: [administrador?.matricula || '', Validators.required],
      senha: [administrador?.senha || '', Validators.required],
      email: [administrador?.email || '', [Validators.required, Validators.email]],
      idNivelAcesso: [administrador?.idNivelAcesso || '', Validators.required],
    });
  }



  salvar() {
    console.log(this.niveisAcesso);
    console.log('Entrou no salvar');
    console.log('Formulário:', this.formGroup.value);
    console.log('Formulário válido:', this.formGroup.valid);

    // Verificar se o formulário é válido
    if (this.formGroup.valid) {
      const administrador = this.formGroup.value;
      // Verificar se é uma inserção ou atualização
      if (administrador.id == null) {
        console.log(administrador.nivelAcesso);
        // Inserir novo administrador
        this.administradorService.insert(administrador).subscribe({
          next: (administradorService) => {
            this.router.navigateByUrl('/adm/list');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
            if (err instanceof HttpErrorResponse && err.error && err.error.errors && err.error.errors.length > 0) {
              const errorMessage = err.error.errors[0].message;
              this.mostrarErro(errorMessage);
            } else {
              this.mostrarErro('Erro ao criar administrador: ' + err.message);
            }
          }
        });
      } else {
        // Atualizar administrador existente
        this.administradorService.update(administrador).subscribe({
          next: (administradorService) => {
            this.router.navigateByUrl('/adm/list');
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
      const administrador = this.formGroup.value;
      if (administrador.id != null) {
        this.administradorService.delete(administrador).subscribe({
          next: () => {
            this.router.navigateByUrl('/adm/list');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

  confirmDelete(administrador: Administrador): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true && administrador && administrador.id !== undefined) {
        this.administradorService.delete(administrador).subscribe(
          () => {
            // Atualizar lista de administradores após exclusão
            this.administradores = this.administradores.filter(adm => adm.id !== administrador.id);

            // Redirecionar para '/adm/list'
            this.router.navigateByUrl('/adm/list');
          },
          error => {
            console.log('Erro ao excluir administrador:', error);
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
