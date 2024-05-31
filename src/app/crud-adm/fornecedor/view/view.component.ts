import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Fornecedor } from '../../../models/fornecedor.models';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewFornecedorComponent {
  fornecedores: Fornecedor[] = [];

  constructor(
    public dialogRef: MatDialogRef<ViewFornecedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Fornecedor,
    private router: Router
  ) { }


  editar(id: number): void {
    this.router.navigate(['/fornecedor/edit', id]);
    this.dialogRef.close(); 
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
