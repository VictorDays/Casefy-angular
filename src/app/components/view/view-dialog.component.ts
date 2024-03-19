
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Administrador } from '../../crud-adm/models/administrador.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-dialog',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './view-dialog.component.html',
  styleUrl: './view-dialog.component.css'
})
export class ViewDialogComponent {
  administradores: Administrador[] = [];

  constructor(
    public dialogRef: MatDialogRef<ViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Administrador,
    private router: Router
  ) { }


  editar(id: number): void {
    this.router.navigate(['/adm/edit', id]);
    this.dialogRef.close(); // Fechar o popup após a navegação
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
