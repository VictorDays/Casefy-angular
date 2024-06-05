import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemVenda } from '../../models/ItemVenda.models';
import { CarrinhoService } from '../../services/carrinho.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [NgFor, NgIf, FooterComponent, HeaderComponent],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {

  carrinhoItens: ItemVenda[] = [];

  constructor(private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe( itens => {
      this.carrinhoItens = itens;
    })
  }

  removerItem(item: ItemVenda): void {
    this.carrinhoService.remover(item);
  }
  
  finalizarCompra(): void {

  }

  calcularTotal(): number {
    let total = 0;
    for (const item of this.carrinhoItens) {
        total += item.quantidade * item.valor;
        console.log(total)
    }
    return parseFloat(total.toFixed(2));
  }

}