import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Lote } from '../../../models/lote.models';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoteService } from '../../../services/lote.service';
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
import { Fornecedor } from '../../../models/fornecedor.models';
import { FornecedorService } from '../../../services/fornecedor.service';

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
export class LoteFormComponent implements OnInit {
  lotes: Lote[] = [];
  fornecedores: Fornecedor[] = [];

  formLote!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loteService: LoteService,
    private fornecedoresService: FornecedorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private dialogError: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.fornecedoresService.findAll().subscribe(data => {
      this.fornecedores = data;
      
    });
    this.initializeForm();
  }

  initializeForm() {
    const lote: Lote = this.activatedRoute.snapshot.data['lote'];
    // selecionando o fornecedor
    const fornecedor = this.fornecedores.find(fornecedor => fornecedor.id === (lote?.fornecedor?.id || null));
    this.formLote = this.formBuilder.group({
      codigo: [lote?.codigo || '', Validators.required],
      quantidadeItens: [lote?.quantidadeItens || '', Validators.required],
      valorUnitario: [lote?.valorUnitario || '', Validators.required],
      valorTotal: [lote?.valorTotal || '', Validators.required],
      dataCompra: [lote?.dataCompra || '', Validators.required],
      estoque: [lote?.estoque || '', Validators.required],
      fornecedor: [fornecedor || '', Validators.required]
    });
  }

  salvar() {
    console.log('Entrou no salvar');
    console.log('Formulário:', this.formLote.value);
    console.log('Formulário válido:', this.formLote.valid);

    // Verificar se o formulário é válido
    if (this.formLote.valid) {
      const lote = this.formLote.value;
      // Verificar se é uma inserção ou atualização
      if (lote.id == null) {
        console.log(lote.fornecedor.id);
        // Inserir novo lote
        this.loteService.insert(lote).subscribe({
          next: (loteService) => {
            this.router.navigateByUrl('/lote/list');
          },
          error: (err) => {
            console.log('Erro ao Incluir:' + JSON.stringify(err));
            if (err instanceof HttpErrorResponse && err.error && err.error.errors && err.error.errors.length > 0) {
              const errorMessage = err.error.errors[0].message;
              this.mostrarErro(errorMessage);
            } else {
              this.mostrarErro('Erro ao criar lote: ' + err.message);
            }
          }
        });
      } else {
        // Atualizar lote existente
        this.loteService.update(lote).subscribe({
          next: (loteService) => {
            this.router.navigateByUrl('/lote/list');
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
    if (this.formLote.valid) {
      const lote = this.formLote.value;
      if (lote.id != null) {
        this.loteService.delete(lote).subscribe({
          next: () => {
            this.router.navigateByUrl('/lote/list');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

  confirmDelete(lote: Lote): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true && lote && lote.id !== undefined) {
        this.loteService.delete(lote).subscribe(
          () => {
            // Atualizar lista de lotes após exclusão
            this.lotes = this.lotes.filter(adm => adm.id !== lote.id);

            this.router.navigateByUrl('/lote/list');
          },
          error => {
            console.log('Erro ao excluir lote:', error);
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
