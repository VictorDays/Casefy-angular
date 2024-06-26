import { Component } from '@angular/core';
import { Estado } from '../../../models/estado.models';
import { EstadoService } from '../../../services/estado.service';
import { CommonModule, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../components/confirmation/confirmation-dialog.component';
import { ErrorComponent } from '../../../components/error/error.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { NavsideComponent } from '../../../components/navside/navside.component';

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
export class EstadoFormComponent {
  estados: Estado[] = [];
  formEstado!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private estadoService: EstadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private dialogError: MatDialog
  ) {
    const estado: Estado = this.activatedRoute.snapshot.data['estado'];
    this.formEstado = this.formBuilder.group({
      nome: [estado?.nome || '', Validators.required],
      sigla: [estado?.sigla || '', Validators.required]
    });
  }



  salvar() {
    console.log('Entrou no salvar');
    console.log('Formulário:', this.formEstado.value);
    console.log('Formulário válido:', this.formEstado.valid);

    // Verificar se o formulário é válido
    if (this.formEstado.valid) {
      const estado = this.formEstado.value;
      // Verificar se é uma inserção ou atualização
      if (estado.id == null) {
        console.log(estado.nivelAcesso);
        // Inserir novo estado
        this.estadoService.insert(estado).subscribe({
          next: (estadoService) => {
            this.router.navigateByUrl('/estado/list');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
            if (err instanceof HttpErrorResponse && err.error && err.error.errors && err.error.errors.length > 0) {
              const errorMessage = err.error.errors[0].message;
              this.mostrarErro(errorMessage);
            } else {
              this.mostrarErro('Erro ao criar estado: ' + err.message);
            }
          }
        });
      } else {
        // Atualizar estado existente
        this.estadoService.update(estado).subscribe({
          next: (estadoService) => {
            this.router.navigateByUrl('/estado/list');
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
    if (this.formEstado.valid) {
      const estado = this.formEstado.value;
      if (estado.id != null) {
        this.estadoService.delete(estado).subscribe({
          next: () => {
            this.router.navigateByUrl('/estado/list');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

  confirmDelete(estado: Estado): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true && estado && estado.id !== undefined) {
        this.estadoService.delete(estado).subscribe(
          () => {
            // Atualizar lista de estados após exclusão
            this.estados = this.estados.filter(adm => adm.id !== estado.id);

            this.router.navigateByUrl('/estado/list');
          },
          error => {
            console.log('Erro ao excluir estado:', error);
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
