import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl  } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FornecedorService } from '../../services/fornecedor.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmationDialogComponent } from '../../../components/confirmation/confirmation-dialog.component';
import { ErrorComponent } from '../../../components/error/error.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { NavsideComponent } from '../../../components/navside/navside.component';
import { Fornecedor } from '../../models/fornecedor.models';
import { resolverFornecedor } from '../resolver/resolver-fornecedor';

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
export class FornecedorFormComponent {
  fornecedores: Fornecedor[] = [];
  formFornecedor!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private dialogError: MatDialog
  ) {
    const fornecedor: Fornecedor = this.activatedRoute.snapshot.data['fornecedor'];
    this.formFornecedor = this.formBuilder.group({
      id: [fornecedor?.id || null],
      nome: [fornecedor?.nome || '', Validators.required],
      cnpj: [fornecedor?.cnpj || '', Validators.required],
      email: [fornecedor?.email || '', Validators.required]
    });
  }

  salvar() {
    console.log('Entrou no salvar');
    console.log('Formulário:', this.formFornecedor.value);
    console.log('Formulário válido:', this.formFornecedor.valid);

    
    // Validar o formulário antes de prosseguir
    this.enviarFormulario();

    // Verificar se o formulário é válido
    if (this.formFornecedor.valid) {
      const fornecedor = this.formFornecedor.value;
      // Verificar se é uma inserção ou atualização
      if (fornecedor.id == null) {
        console.log(fornecedor.nivelAcesso);
        // Inserir novo fornecedor
        this.fornecedorService.insert(fornecedor).subscribe({
          next: (fornecedorService) => {
            this.router.navigateByUrl('/fornecedor/list');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
            if (err instanceof HttpErrorResponse && err.error && err.error.errors && err.error.errors.length > 0) {
              const errorMessage = err.error.errors[0].message;
              this.mostrarErro(errorMessage);
            } else {
              this.mostrarErro('Erro ao criar fornecedor: ' + err.message);
            }
          }
        });
      } else {
        // Atualizar fornecedor existente
        this.fornecedorService.update(fornecedor).subscribe({
          next: (fornecedorService) => {
            this.router.navigateByUrl('/fornecedor/list');
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
    if (this.formFornecedor.valid) {
      const fornecedor = this.formFornecedor.value;
      if (fornecedor.id != null) {
        this.fornecedorService.delete(fornecedor).subscribe({
          next: () => {
            this.router.navigateByUrl('/fornecedor/list');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

  confirmDelete(fornecedor: Fornecedor): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true && fornecedor && fornecedor.id !== undefined) {
        this.fornecedorService.delete(fornecedor).subscribe(
          () => {
            // Atualizar lista de fornecedores após exclusão
            this.fornecedores = this.fornecedores.filter(adm => adm.id !== fornecedor.id);

            this.router.navigateByUrl('/fornecedor/list');
          },
          error => {
            console.log('Erro ao excluir fornecedor:', error);
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

