import { Component, Inject } from '@angular/core';
import { Cidade } from '../../../models/cidade.models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewCidadeComponent {
  cidades: Cidade[] = [];

  constructor(
    public dialogRef: MatDialogRef<ViewCidadeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cidade,
    private router: Router
  ) { }


  editar(id: number): void {
    this.router.navigate(['/cidade/edit', id]);
    this.dialogRef.close(); 
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
