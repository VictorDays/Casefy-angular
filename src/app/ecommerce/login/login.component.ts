import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router'; 
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { AuthService } from '../../crud-adm/services/auth.service'; // Importa serviço de autenticação
import { NgIf } from '@angular/common'; 

@Component({
  selector: 'app-login', 
  standalone: true, 
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, 
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule],
  templateUrl: './login.component.html', 
  styleUrl: './login.component.css' ,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Declara uma propriedade para armazenar o formulário de login

  constructor(
     private formBuilder: FormBuilder, 
     private authService: AuthService, 
    private router: Router, 
    private snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void {
    // Inicializa o formulário de login com campos vazios e regras de validação
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3)]], 
      password: ['', [Validators.required, Validators.minLength(3)]] 
    });
  }

  // Método chamado ao enviar o formulário de login
  onSubmit() {
    if (this.loginForm.valid) { // Verifica se o formulário é válido
      const email = this.loginForm.get('email')!.value; // Obtém o valor do campo de e-mail
      const password = this.loginForm.get('password')!.value; // Obtém o valor do campo de senha

      // Chama o método de login do serviço de autenticação, passando o e-mail e a senha
      this.authService.login(email, password).subscribe({
        next: (resp) => { 
          // redirecionar para a página principal
          this.router.navigateByUrl('/home'); // Redireciona para a página principal em caso de sucesso
        },
        error: (err) => { 
          console.log(err); // Registra o erro no console
          this.showSnackbarTopPosition("Usuário ou senha Inválidos", 'Fechar', 2000); // Exibe uma mensagem de Snackbar indicando credenciais inválidas
        }
      });
    } else { // Se o formulário não for válido
      this.showSnackbarTopPosition("Dados inválidos", 'Fechar', 2000); // Exibe uma mensagem de Snackbar indicando dados inválidos
    }
  }

  // Método chamado para registrar um novo usuário
  onRegister() {
    // criar usuário
  }

  // Método para exibir uma mensagem de Snackbar na parte superior da tela
  showSnackbarTopPosition(content: any, action: any, duration: any) {
    this.snackBar.open(content, action, {
      duration: 2000, // Duração da exibição da mensagem em milissegundos
      verticalPosition: "top", // Posição vertical da mensagem
      horizontalPosition: "center" // Posição horizontal da mensagem
    });
  }
}
