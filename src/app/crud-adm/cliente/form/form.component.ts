import { Component, OnInit } from '@angular/core';

import { ViewClienteComponent } from '../view/view.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { NavsideComponent } from '../../../components/navside/navside.component';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.models';
import { ErrorComponent } from '../../../components/error/error.component';
import { CommonModule, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from '../../../components/confirmation/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
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
export class ClienteFormComponent implements OnInit {
  clientes: Cliente[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private dialogError: MatDialog
  ) { }

  ngOnInit(): void {
    const cliente: Cliente | null = this.activatedRoute.snapshot.data['cliente'];
    if (cliente) {
      // Se cliente for definido, continue com a inicialização do formulário
      this.formGroup = this.formBuilder.group({
        id: [cliente.id || null],
        nome: [cliente.nome || '', Validators.required],
        login: [cliente.login || '', Validators.required],
        senha: [cliente.senha || '', Validators.required],
        cpf: [cliente.cpf || '', Validators.required],
        dataNascimento: [cliente.dataNascimento || '', Validators.required],
        listaTelefones: this.formBuilder.array([]) // inicialize o FormArray vazio
      });
  
      // Preencher a lista de telefones se existir
      if (cliente.listaTelefones && cliente.listaTelefones.length > 0) {
        const listaTelefonesFormArray = this.formGroup.get('listaTelefones') as FormArray;
        cliente.listaTelefones.forEach(telefone => {
          listaTelefonesFormArray.push(this.formBuilder.control(telefone));
        });
      }
    }
  }
  
  get listaTelefones(): FormArray {
    return this.formGroup.get('listaTelefones') as FormArray;
  }

  adicionarTelefone() {
    this.listaTelefones.push(this.criarTelefoneFormGroup());
  }

  removerTelefone(index: number) {
    this.listaTelefones.removeAt(index);
  }

  criarTelefoneFormGroup(): FormGroup {
    return this.formBuilder.group({
      codigoArea: ['', Validators.required],
      numero: ['', Validators.required]
    });
  }

  salvar() {
    console.log('Entrou no salvar');
    console.log('Formulário:', this.formGroup.value);
    console.log('Formulário válido:', this.formGroup.valid);

    // Verificar se o formulário é válido
    if (this.formGroup.valid) {
      const cliente = this.formGroup.value;
      // Verificar se é uma inserção ou atualização
      if (cliente.id == null) {
        console.log(cliente.nivelAcesso);
        // Inserir novo cliente
        this.clienteService.insert(cliente).subscribe({
          next: (clienteService) => {
            this.router.navigateByUrl('/adm/list');
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
      const cliente = this.formGroup.value;
      if (cliente.id != null) {
        this.clienteService.delete(cliente).subscribe({
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

  confirmDelete(cliente: Cliente): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true && cliente && cliente.id !== undefined) {
        this.clienteService.delete(cliente).subscribe(
          () => {
            // Atualizar lista de clientees após exclusão
            this.clientes = this.clientes.filter(adm => adm.id !== cliente.id);

            // Redirecionar para '/adm/list'
            this.router.navigateByUrl('/adm/list');
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

  formatarCPF(event: any) {
    let cpf = event.target.value.replace(/\D/g, '');
    if (cpf.length > 0) {
      // Verificar se o comprimento é maior que 3, para adicionar o primeiro ponto
      if (cpf.length > 3) {
        cpf = cpf.substring(0, 3) + '.' + cpf.substring(3);
      }
      // Verificar se o comprimento é maior que 7, para adicionar o segundo ponto
      if (cpf.length > 7) {
        cpf = cpf.substring(0, 7) + '.' + cpf.substring(7);
      }
      // Verificar se o comprimento é maior que 11, para adicionar o traço
      if (cpf.length > 11) {
        cpf = cpf.substring(0, 11) + '-' + cpf.substring(11);
      }
      // Limitar o CPF a 14 caracteres
      if (cpf.length > 14) {
        cpf = cpf.substring(0, 14);
      }
    }
    event.target.value = cpf;
  }

  formatarData(event: any) {
    let dataNascimento = event.target.value.replace(/\D/g, ''); // Remover caracteres não numéricos
    if (dataNascimento.length > 0) {
      // Verificar se o comprimento é maior que 2, para adicionar o dia
      if (dataNascimento.length > 2) {
        dataNascimento = dataNascimento.substring(0, 2) + '-' + dataNascimento.substring(2);
      }
      // Verificar se o comprimento é maior que 4, para adicionar o mês
      if (dataNascimento.length > 5) {
        dataNascimento = dataNascimento.substring(0, 5) + '-' + dataNascimento.substring(5);
      }
      // Limitar a dataNascimento a 10 caracteres
      if (dataNascimento.length > 10) {
        dataNascimento = dataNascimento.substring(0, 10);
      }
    }
    event.target.value = dataNascimento;
  }

  exibirTexto: boolean = false;
  mostrarTexto(valor: boolean) {
    this.exibirTexto = valor;
  }

}