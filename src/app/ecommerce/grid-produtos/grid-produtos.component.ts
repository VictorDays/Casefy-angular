import { Component, OnInit } from '@angular/core';
import { Capinha } from '../../models/capinha.model';
import { CommonModule } from '@angular/common';
import { CapinhaService } from '../../services/capinha.service';

@Component({
  selector: 'app-grid-produtos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-produtos.component.html',
  styleUrl: './grid-produtos.component.css'
})
export class GridProdutosComponent implements OnInit{

  produtos: Capinha [] = [];

  constructor(private productService: CapinhaService) {}

  ngOnInit(): void {
    this.productService.findAll().subscribe((data: Capinha[]) => {
      this.produtos = data;
    });
  }
}
