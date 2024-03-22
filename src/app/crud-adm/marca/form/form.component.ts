import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { NavsideComponent } from '../../../components/navside/navside.component';
import { ConfirmationDialogComponent } from '../../../components/confirmation/confirmation-dialog.component';
import { Marca } from '../../models/marca.model';
import { MarcaService } from '../../services/marca.service';

@Component({
    selector: 'app-marca-form',
    standalone: true,
    templateUrl: './form.component.html',
    styleUrl: './form.component.css',
    imports: [RouterModule, NgIf, HeaderComponent, NavsideComponent, ReactiveFormsModule, FormsModule,
      NavsideComponent, MatInputModule, MatFormFieldModule, MatIconModule, ConfirmationDialogComponent]
})
export class MarcaFormComponent {
  marcas: Marca[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private marcaService: MarcaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
    const marca: Marca = this.activatedRoute.snapshot.data['marca'];
    this.formGroup = this.formBuilder.group({
      id: [marca?.id || null],
      nome:[marca?.nome || '', Validators.required],
    })

  }
  salvar() {
    console.log('Entrou no salvar')
    console.log('Formulário:', this.formGroup.value);
console.log('Formulário válido:', this.formGroup.valid);
    if (this.formGroup.valid) {
      console.log('Formulario valido')
      const marca = this.formGroup.value;
      if (marca.id == null) {
        this.marcaService.insert(marca).subscribe({
          next: (marcaService) => {
            this.router.navigateByUrl('/marcas/list');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.marcaService.update(marca).subscribe({
          next: (marcaService) => {
            this.router.navigateByUrl('/marcas/list');
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
      const marca = this.formGroup.value;
      if (marca.id != null) {
        this.marcaService.delete(marca).subscribe({
          next: () => {
            this.router.navigateByUrl('/marcas/list');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }
}
