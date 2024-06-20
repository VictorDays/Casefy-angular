import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service'; // Importa serviço de autenticação
import { NgIf } from '@angular/common';
import { Subject } from 'rxjs';
import { AlertComponent } from "../alert/alert.component";
import { Usuario } from '../../models/usuario.model';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, AlertComponent]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  alertMessage: string = '';
  showAlert$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private local: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log('Formulário válido?', this.loginForm.valid);
  
    // Exibir os valores atuais dos campos
    console.log('Valores do formulário:', JSON.stringify(this.loginForm.value));
  
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;
  
      console.log('Email:', email);
      console.log('Senha:', password);
  
      this.authService.login(email, password).subscribe({
        next: (resp) => {
          // redirecionar para a página principal
          this.router.navigateByUrl('/casefy/home');
        },
        error: (err) => {
          this.showAlert('Usuário ou senha inválidos');
        }
      });
    } else {
      console.log('Erros no formulário:', this.loginForm.errors);
      // Exibir os erros específicos do campo de e-mail
      this.showAlert('Dados inválidos');
    }
  }
  
  armazenarToken(token:string){
    this.local.setItem("Authorization", token);
  }

  onRegister() {
    this.router.navigate(['/casefy/cadastro']);
  }

  showAlert(message: string) {
    this.alertMessage = message;
    this.showAlert$.next();

    setTimeout(() => {
      this.alertMessage = '';
    }, 2000);
  }
}
