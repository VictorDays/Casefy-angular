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
import { Modelo } from '../../models/modelocapinha.model';
import { ModeloService } from '../../services/modelo.service';
@Component({
    selector: 'app-modelo-form',
    standalone: true,
    templateUrl: './form.component.html',
    styleUrl: './form.component.css',
    imports: [RouterModule, NgIf, HeaderComponent, NavsideComponent, ReactiveFormsModule, FormsModule,
      NavsideComponent, MatInputModule, MatFormFieldModule, MatIconModule, ConfirmationDialogComponent]
})
export class ModeloFormComponent {
  modelos: Modelo[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modeloService: ModeloService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
    const modelo: Modelo = this.activatedRoute.snapshot.data['modelo'];
    this.formGroup = this.formBuilder.group({
      id: [modelo?.id || null],
      marca: [modelo?.marca || '', Validators.required],
      nome:[modelo?.nome || '', Validators.required],
    })

  }
  salvar() {
    console.log('Entrou no salvar')
    console.log('Formulário:', this.formGroup.value);
console.log('Formulário válido:', this.formGroup.valid);
    if (this.formGroup.valid) {
      console.log('Formulario valido')
      const modelo = this.formGroup.value;
      if (modelo.id == null) {
        this.modeloService.insert(modelo).subscribe({
          next: (modeloService) => {
            this.router.navigateByUrl('/modelos/list');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.modeloService.update(modelo).subscribe({
          next: (modeloService) => {
            this.router.navigateByUrl('/modelos/list');
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
      const modelo = this.formGroup.value;
      if (modelo.id != null) {
        this.modeloService.delete(modelo).subscribe({
          next: () => {
            this.router.navigateByUrl('/modelos/list');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }
}
