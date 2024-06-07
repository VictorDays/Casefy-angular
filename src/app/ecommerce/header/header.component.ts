import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isListVisible = false;
  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router) { }

  toggleList() {
    this.isListVisible = !this.isListVisible;
  }

  quantCarrinho(): number {
    return this.carrinhoService.tamanho();
  }

  onLoginClick(): void {
    this.router.navigate(['/casefy/login']);
  }

  onCadastroClick(): void {
    this.router.navigate(['/casefy/cadastro']);
  }

  onCarrinhoClick(): void {
    this.router.navigate(['/casefy/carrinho']);
  }
}
