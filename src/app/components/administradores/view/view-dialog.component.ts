
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
<<<<<<< HEAD:src/app/components/administradores/view-dialog/view-dialog.component.ts
=======
import { Administrador } from '../../models/administrador.model';
>>>>>>> ada34da5a57b317bd284f3ada8b8c1226d15d591:src/app/components/administradores/view/view-dialog.component.ts
import { Router, RouterModule } from '@angular/router';
import { Administrador } from '../../models/administrador.model';

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
