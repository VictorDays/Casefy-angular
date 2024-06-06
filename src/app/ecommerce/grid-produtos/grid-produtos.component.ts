import { Component, OnInit, signal } from '@angular/core';
import { Capinha } from '../../models/capinha.model';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; 
import { CapinhaService } from '../../services/capinha.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle, MatCardFooter } from '@angular/material/card';

// tipo personalizado de dados, como classes e interfaces, porém mais simples.
type Card = {
  idCapinha: number;
  titulo: string;
  preco: number;
  urlImagem: string;
}

@Component({
  selector: 'app-grid-produtos',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCard, MatCardActions, MatCardContent, MatCardTitle, MatCardFooter, NgFor, MatButton],
  templateUrl: './grid-produtos.component.html',
  styleUrl: './grid-produtos.component.css'
})
export class GridProdutosComponent implements OnInit{
  
  cards = signal<Card[]> ([]);
  produtos: Capinha[] = [];

  constructor(private capinhaService: CapinhaService, 
              private carrinhoService: CarrinhoService,
              private snackBar: MatSnackBar,
              private router: Router ) {}

  ngOnInit(): void {
    this.carregarConsultas();
  }

  carregarConsultas() {
    // buscando todos as capinhas
    this.capinhaService.getAllPaginacao(0, 10).subscribe(data => {
      this.produtos = data;
      this.carregarCards();
    });
  }

  carregarCards() {
    const cards: Card[] = [];
    this.produtos.forEach(capinha => {
      cards.push({
        idCapinha: capinha.id,
        titulo: capinha.nome,
        preco: capinha.valor,
        urlImagem: this.capinhaService.getUrlImagem(capinha.imagem)
      });
    });
    this.cards.set(cards);
    console.log("Carregou os cards")
  }

  adicionarAoCarrinho(card: Card) {
    this.carrinhoService.adicionar({
      id: card.idCapinha,
      nome: card.titulo,
      valor: card.preco,
      quantidade: 1
    })
    console.log("Adicionou o card ao carrinho")
  }

  showSnackbarTopPosition(content:any, action:any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top", 
      horizontalPosition: "center" 
    });
  }

  onDetalhesProduto(id: number): void {
    this.router.navigate(['/produto', id]);
  }
}
