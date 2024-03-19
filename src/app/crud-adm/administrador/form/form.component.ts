import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


import { AdministradorService } from '../../../crud-adm/services/admistrador.service';
import { Administrador } from '../../../crud-adm/models/administrador.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../components/confirmation/confirmation-dialog.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { NavsideComponent } from '../../../components/navside/navside.component';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ RouterModule, NgIf, HeaderComponent, NavsideComponent, ReactiveFormsModule, FormsModule,
    NavsideComponent, MatInputModule, MatFormFieldModule, MatIconModule, ConfirmationDialogComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormAdmComponent {
  administradores: Administrador[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private administradorService: AdministradorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    const administrador: Administrador = this.activatedRoute.snapshot.data['administrador'];
    this.formGroup = this.formBuilder.group({
      id: [administrador?.id || null],
      nome: [administrador?.nome || '', Validators.required],
      cpf: [administrador?.cpf || '', Validators.required],
      matricula: [administrador?.matricula || '', Validators.required],
      senha: [administrador?.senha || '', Validators.required],
      email: [administrador?.email || '', [Validators.required, Validators.email]],
    });
  }



  salvar() {
    console.log('Entrou no salvar')
    console.log('Formulário:', this.formGroup.value);
console.log('Formulário válido:', this.formGroup.valid);
    if (this.formGroup.valid) {
      console.log('Formulario valido')
      const administrador = this.formGroup.value;
      if (administrador.id == null) {
        this.administradorService.insert(administrador).subscribe({
          next: (administradorService) => {
            this.router.navigateByUrl('/adm/list');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.administradorService.update(administrador).subscribe({
          next: (administradorService) => {
            this.router.navigateByUrl('/adm/list');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const administrador = this.formGroup.value;
      if (administrador.id != null) {
        this.administradorService.delete(administrador).subscribe({
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

  confirmDelete(administrador: Administrador): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true && administrador && administrador.id !== undefined) {
        this.administradorService.delete(administrador).subscribe(
          () => {
            // Atualizar lista de administradores após exclusão
            this.administradores = this.administradores.filter(adm => adm.id !== administrador.id);

            // Redirecionar para '/adm/list'
            this.router.navigateByUrl('/adm/list');
          },
          error => {
            console.log('Erro ao excluir administrador:', error);
          }
        );
      }
    });
  }

}
