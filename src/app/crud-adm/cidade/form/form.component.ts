import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cidade } from '../../models/cidade.models';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CidadeService } from '../../services/cidade.service';
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
import { Estado } from '../../models/estado.models';
import { EstadoService } from '../../services/estado.service';

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
export class CidadeFormComponent implements OnInit {
  cidades: Cidade[] = [];
  estados: Estado[] = [];

  formCidade!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cidadeService: CidadeService,
    private estadoService: EstadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private dialogError: MatDialog
  ) {
    const cidade: Cidade = this.activatedRoute.snapshot.data['cidade'];
    this.formCidade = this.formBuilder.group({
      id: [cidade?.id || null],
      nome: [cidade?.nome || '', Validators.required],
      estado: [cidade?.estado || '', Validators.required]
    });
  }

  ngOnInit(): void {
    this.estadoService.findAll().subscribe(data => {
      this.estados = data;
      this.initializeForm();
    });
  }

  //Inicializa o select 
  initializeForm() {
    const cidade: any = this.activatedRoute.snapshot.data['cidade'];
    const estadoId = cidade && cidade.estado ? cidade.estado.id : null;
    // selecionando o estado
    this.formCidade = this.formBuilder.group({
      id: [cidade && cidade.id ? cidade.id : null],
      nome: [cidade && cidade.nome ? cidade.nome : '', Validators.required],
      estado: [estadoId]
    });
  }

  salvar() {
    console.log('Entrou no salvar');
    console.log('Formulário:', this.formCidade.value);
    console.log('Formulário válido:', this.formCidade.valid);

    // Verificar se o formulário é válido
    if (this.formCidade.valid) {
      const cidade = this.formCidade.value;
      // Verificar se é uma inserção ou atualização
      const modeloAtualizado = {
        ...cidade,
        estado: { id: cidade.estado } // Passa apenas o ID do estado
      };

      if (cidade.id == null) {
        // Inserir novo cidade
        this.cidadeService.insert(modeloAtualizado).subscribe({
          next: (cidadeService) => {
            this.router.navigateByUrl('/cidade/list');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
            if (err instanceof HttpErrorResponse && err.error && err.error.errors && err.error.errors.length > 0) {
              const errorMessage = err.error.errors[0].message;
              this.mostrarErro(errorMessage);
            } else {
              this.mostrarErro('Erro ao criar cidade: ' + err.message);
            }
          }
        });
      } else {
        // Atualizar cidade existente
        this.cidadeService.update(modeloAtualizado).subscribe({
          next: (cidadeService) => {
            this.router.navigateByUrl('/cidade/list');
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
    if (this.formCidade.valid) {
      const cidade = this.formCidade.value;
      if (cidade.id != null) {
        this.cidadeService.delete(cidade).subscribe({
          next: () => {
            this.router.navigateByUrl('/cidade/list');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

  confirmDelete(cidade: Cidade): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true && cidade && cidade.id !== undefined) {
        this.cidadeService.delete(cidade).subscribe(
          () => {
            // Atualizar lista de cidades após exclusão
            this.cidades = this.cidades.filter(adm => adm.id !== cidade.id);

            this.router.navigateByUrl('/cidade/list');
          },
          error => {
            console.log('Erro ao excluir cidade:', error);
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