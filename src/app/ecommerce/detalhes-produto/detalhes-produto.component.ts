import { Component, OnInit } from '@angular/core';
import { CapinhaService } from '../../services/capinha.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Capinha } from '../../models/capinha.model';
import { Observable } from 'rxjs';
import { CarrinhoService } from '../../services/carrinho.service';



@Component({
  selector: 'app-detalhes-produto',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './detalhes-produto.component.html',
  styleUrl: './detalhes-produto.component.css'
})
export class DetalhesProdutoComponent implements OnInit {
  isToggle: any;

  product$!: Observable<Capinha>;
  imageUrl: string | undefined;
  constructor(private route: ActivatedRoute,
    private productService: CapinhaService,
    private carrinhoService: CarrinhoService,) { }

  ngOnInit(): void {
    const productIdParam = this.route.snapshot.paramMap.get('id');
    if (productIdParam !== null) {
      const productId = parseInt(productIdParam, 10);
      this.product$ = this.productService.findById(productId);
      console.error(productId);
    } else {
      console.error('Product ID is null');
    }
    console.log(this.product$);
    this.carregarImagem();
  }

  carregarImagem() {
    this.product$.subscribe(product => {
      if (product && product.imagem) {
        this.imageUrl = this.productService.getUrlImagem(product.imagem);
      }
    });
  }
  

  adicionarAoCarrinho(product: Capinha) {
    this.carrinhoService.adicionar({
      id: product.id,
      nome: product.nome,
      valor: product.valor,
      quantidade: 1
    });
    console.log("Adicionou ao carrinho");
  }

  


}
