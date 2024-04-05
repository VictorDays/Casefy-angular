import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Capinha } from '../../models/capinha.model';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewCapinhaComponent {
  capinhas: Capinha[] = [];

  constructor(
    public dialogRef: MatDialogRef<ViewCapinhaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Capinha,
    private router: Router
  ) { }


  editar(id: number): void {
    this.router.navigate(['/capinhas/edit', id]);
    this.dialogRef.close(); 
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
