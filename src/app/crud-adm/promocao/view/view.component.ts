import { Component, Inject } from '@angular/core';
import { Promocao } from '../../models/Promocao.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewPromocaoComponent {
  promocaos: Promocao[] = [];

  constructor(
    public dialogRef: MatDialogRef<ViewPromocaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Promocao,
    private router: Router
  ) { }


  editar(id: number): void {
    this.router.navigate(['/promocao/edit', id]);
    this.dialogRef.close(); // Fechar o popup após a navegação
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
