import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Modelo } from '../../../models/modelo.models';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewModeloComponent {
  modelos: Modelo[] = [];

  constructor(
    public dialogRef: MatDialogRef<ViewModeloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Modelo,
    private router: Router
  ) { }


  editar(id: number): void {
    this.router.navigate(['/modelos/edit', id]);
    this.dialogRef.close(); // Fechar o popup após a navegação
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
