import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavsideComponent } from "../../../components/navside/navside.component";
import { HeaderComponent } from "../../../components/header/header.component";
import { Capinha } from '../../models/capinha.model';
import { Modelo } from '../../models/modelo.models';
import { CapinhaService } from '../../services/capinha.service';
import { ModeloService } from '../../services/modelo.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationDialogComponent } from '../../../components/confirmation/confirmation-dialog.component';
import { ErrorComponent } from '../../../components/error/error.component';
import { CommonModule, NgIf } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-form',
    standalone: true,
    templateUrl: './form.component.html',
    styleUrl: './form.component.css',
    imports: [ErrorComponent, CommonModule, MatSelectModule, MatOptionModule, RouterModule, NgIf, HeaderComponent, NavsideComponent, ReactiveFormsModule, FormsModule,
        NavsideComponent, MatInputModule, MatFormFieldModule, MatIconModule, ConfirmationDialogComponent]
})
export class CapinhaFormComponent {
    capinhas: Capinha[] = [];
    modelos: Modelo[] = [];

    formCapinha!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private capinhaSevice: CapinhaService,
        private modeloService: ModeloService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog,
        private dialogError: MatDialog
    ) {
        const capinha: Capinha = this.activatedRoute.snapshot.data['capinha'];
        this.formCapinha = this.formBuilder.group({
            id: [capinha?.id || null],
            nome: [capinha?.nome || '', Validators.required],
            descicao: [capinha?.descricao || '', Validators.required],
            marca: [capinha?.modelo || '', Validators.required],
            valor: [capinha?.descricao || '', Validators.required],
        });
    }

    ngOnInit(): void {
        this.modeloService.findAll().subscribe(data => {
          this.modelos = data;
          this.initializeFormMarca();
        });
      }
    
      //Inicializa o select 
      initializeFormMarca() {
        const capinha: any = this.activatedRoute.snapshot.data['capinha'];
        const modeloId = capinha && capinha.modelo ? capinha.modelo.id : null;
      
        this.formCapinha = this.formBuilder.group({
          id: [capinha && capinha.id ? capinha.id : null],
          nome: [capinha && capinha.nome ? capinha.nome : '', Validators.required],
          descricao: [capinha && capinha.descricao ? capinha.descricao : '', Validators.required],
          modelo: [modeloId],
          valor: [capinha && capinha.valor ? capinha.valor : '', Validators.required],
        });
      }
    
      salvar() {
        console.log('Entrou no salvar');
        console.log('Formulário:', this.formCapinha.value);
        console.log('Formulário válido:', this.formCapinha.valid);
    
        // Validar o formulário antes de prosseguir
        this.enviarFormulario();
    
        // Verificar se o formulário é válido
        if (this.formCapinha.valid) {
          const capinha = this.formCapinha.value;
          const capinhaAtualizado = {
            ...capinha,
            modelo: { id: capinha.modelo } // Passa apenas o ID da marca
          };
          
          if (capinha.id == null) {
            // Inserir novo modelo
            this.modeloService.insert(capinhaAtualizado).subscribe({
              next: (capinhaSevice) => {
                this.router.navigateByUrl('/capinhas/list');
              },
              error: (err) => {
                console.log('Erro ao Incluir' + JSON.stringify(err));
                if (err instanceof HttpErrorResponse && err.error && err.error.errors && err.error.errors.length > 0) {
                  const errorMessage = err.error.errors[0].message;
                  this.mostrarErro(errorMessage);
                } else {
                  this.mostrarErro('Erro ao criar capinha: ' + err.message);
                }
              }
            });
          } else {
            // Atualizar modelo existente
            this.modeloService.update(capinhaAtualizado).subscribe({
              next: (ModeloService) => {
                this.router.navigateByUrl('/capinhas/list');
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
        if (this.formCapinha.valid) {
          const capinha = this.formCapinha.value;
          if (capinha.id != null) {
            this.capinhaSevice.delete(capinha).subscribe({
              next: () => {
                this.router.navigateByUrl('/capinhas/list');
              },
              error: (err) => {
                console.log('Erro ao Excluir' + JSON.stringify(err));
              }
            });
          }
        }
      }
    
      confirmDelete(capinha: Capinha): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    
        dialogRef.afterClosed().subscribe((result: boolean) => {
          if (result === true && capinha && capinha.id !== undefined) {
            this.capinhaSevice.delete(capinha).subscribe(
              () => {
                // Atualizar lista de administradores após exclusão
                this.modelos = this.modelos.filter(adm => adm.id !== capinha.id);
    
                // Redirecionar para '/adm/list'
                this.router.navigateByUrl('/capinhas/list');
              },
              error => {
                console.log('Erro ao excluir capinha:', error);
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
