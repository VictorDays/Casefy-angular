import { Component, OnInit } from '@angular/core';
import { CapinhaService } from '../../services/capinha.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhes-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhes-produto.component.html',
  styleUrl: './detalhes-produto.component.css'
})
export class DetalhesProdutoComponent implements OnInit {
  product: any;

  constructor(private route: ActivatedRoute, private productService: CapinhaService) { }

  ngOnInit(): void {
    const productIdParam = this.route.snapshot.paramMap.get('id');
    if (productIdParam !== null) {
      const productId = parseInt(productIdParam, 10);
      this.product = this.productService.findById(productId);
    } else {
      console.error('Product ID is null');
    }
  }
}
