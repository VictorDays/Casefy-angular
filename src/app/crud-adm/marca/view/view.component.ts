import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Marca } from '../../../models/marca.model';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewMarcaComponent {
  marcas: Marca[] = [];

  constructor(
    public dialogRef: MatDialogRef<ViewMarcaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Marca,
    private router: Router
  ) { }


  editar(id: number): void {
    this.router.navigate(['/marcas/edit', id]);
    this.dialogRef.close(); // Fechar o popup após a navegação
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
