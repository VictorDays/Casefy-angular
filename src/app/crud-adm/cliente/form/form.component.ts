import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../models/cliente.models';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
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
export class ClienteFormComponent {
  clientes: Cliente[] = [];
  estados: Estado[] = [];

  formCliente!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private estadoService: EstadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private dialogError: MatDialog
  ) {
    const cliente: Cliente = this.activatedRoute.snapshot.data['cliente'];
    this.formCliente = this.formBuilder.group({
      nome: [cliente?.nome || '', Validators.required],
      login: [cliente?.login || '', Validators.required],
      senha: [cliente?.senha || '', Validators.required],
      cpf: [cliente?.cpf || '', Validators.required],
      dataNascimento: [cliente?.dataNascimento || '', Validators.required]
    });
  }


  salvar() {
    console.log('Entrou no salvar');
    console.log('Formulário:', this.formCliente.value);
    console.log('Formulário válido:', this.formCliente.valid);

    // Verificar se o formulário é válido
    if (this.formCliente.valid) {
      const cliente = this.formCliente.value;
      // Verificar se é uma inserção ou atualização
      if (cliente.id == null) {
        console.log(cliente.nivelAcesso);
        // Inserir novo cliente
        this.clienteService.insert(cliente).subscribe({
          next: (clienteService) => {
            this.router.navigateByUrl('/cliente/list');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
            if (err instanceof HttpErrorResponse && err.error && err.error.errors && err.error.errors.length > 0) {
              const errorMessage = err.error.errors[0].message;
              this.mostrarErro(errorMessage);
            } else {
              this.mostrarErro('Erro ao criar cliente: ' + err.message);
            }
          }
        });
      } else {
        // Atualizar cliente existente
        this.clienteService.update(cliente).subscribe({
          next: (clienteService) => {
            this.router.navigateByUrl('/cliente/list');
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
    if (this.formCliente.valid) {
      const cliente = this.formCliente.value;
      if (cliente.id != null) {
        this.clienteService.delete(cliente).subscribe({
          next: () => {
            this.router.navigateByUrl('/cliente/list');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

  confirmDelete(cliente: Cliente): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true && cliente && cliente.id !== undefined) {
        this.clienteService.delete(cliente).subscribe(
          () => {
            // Atualizar lista de clientes após exclusão
            this.clientes = this.clientes.filter(adm => adm.id !== cliente.id);

            this.router.navigateByUrl('/cliente/list');
          },
          error => {
            console.log('Erro ao excluir cliente:', error);
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