
import { Component } from '@angular/core';
import { Promocao } from '../../../models/Promocao.model';
import { PromocaoService } from '../../../services/promocao.service';
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
export class PromocaoFormComponent {
  promocaos: Promocao[] = [];
  formPromocao!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private promocaoService: PromocaoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private dialogError: MatDialog
  ) {
    const promocao: Promocao = this.activatedRoute.snapshot.data['promocao'];
    this.formPromocao = this.formBuilder.group({
      codigo: [promocao?.codigo || '', Validators.required],
      descricao: [promocao?.descricao || '', Validators.required],
      valorDesconto: [promocao?.valorDesconto || '', Validators.required]
    });
  }



  salvar() {
    console.log('Entrou no salvar');
    console.log('Formulário:', this.formPromocao.value);
    console.log('Formulário válido:', this.formPromocao.valid);

    // Verificar se o formulário é válido
    if (this.formPromocao.valid) {
      const promocao = this.formPromocao.value;
      // Verificar se é uma inserção ou atualização
      if (promocao.id == null) {
        console.log(promocao.nivelAcesso);
        // Inserir novo promocao
        this.promocaoService.insert(promocao).subscribe({
          next: (promocaoService) => {
            this.router.navigateByUrl('/promocao/list');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
            if (err instanceof HttpErrorResponse && err.error && err.error.errors && err.error.errors.length > 0) {
              const errorMessage = err.error.errors[0].message;
              this.mostrarErro(errorMessage);
            } else {
              this.mostrarErro('Erro ao criar promocao: ' + err.message);
            }
          }
        });
      } else {
        // Atualizar promocao existente
        this.promocaoService.update(promocao).subscribe({
          next: (promocaoService) => {
            this.router.navigateByUrl('/promocao/list');
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
    if (this.formPromocao.valid) {
      const promocao = this.formPromocao.value;
      if (promocao.id != null) {
        this.promocaoService.delete(promocao).subscribe({
          next: () => {
            this.router.navigateByUrl('/promocao/list');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

  confirmDelete(promocao: Promocao): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true && promocao && promocao.id !== undefined) {
        this.promocaoService.delete(promocao).subscribe(
          () => {
            // Atualizar lista de promocaos após exclusão
            this.promocaos = this.promocaos.filter(adm => adm.id !== promocao.id);

            this.router.navigateByUrl('/promocao/list');
          },
          error => {
            console.log('Erro ao excluir promocao:', error);
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
