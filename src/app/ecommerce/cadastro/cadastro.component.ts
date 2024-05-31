import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, AlertComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {
  loginForm!: FormGroup;
  alertMessage: string = '';
  showAlert$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegister() {
    // criar usuário
  }

  onLogin() {
    this.router.navigate(['/casefy/login']);
  }

  showAlert(message: string) {
    this.alertMessage = message;
    this.showAlert$.next();

    setTimeout(() => {
      this.alertMessage = '';
    }, 2000);
  }
}
