
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Router, RouterModule } from '@angular/router';
import { Lote } from '../../../models/lote.models';

@Component({
  selector: 'app-view-dialog',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './view-dialog.component.html',
  styleUrl: './view-dialog.component.css'
})
export class ViewLoteComponent {
  lotes: Lote[] = [];

  constructor(
    public dialogRef: MatDialogRef<ViewLoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Lote,
    private router: Router
  ) { }


  editar(id: number): void {
    this.router.navigate(['/lote/edit', id]);
    this.dialogRef.close(); // Fechar o popup após a navegação
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
