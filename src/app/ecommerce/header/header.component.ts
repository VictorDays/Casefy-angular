import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { Subscription } from 'rxjs';
import { MatToolbar } from '@angular/material/toolbar';
import { LocalStorageService } from '../../services/local-storage.service';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { MarcaGridComponent } from '../marca-grid/marca-grid.component';
import { UsuarioLogadoService } from '../../services/usuariologado.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MarcaGridComponent, MatBadge, MatButton, RouterModule, MatToolbar, 
    MatIcon, MatButton, MatIconButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isListVisible = false;
  usuarioLogado: Usuario | null = null;
  qtdItensCarrinho: number = 0;
  
  private subscription = new Subscription();
  constructor(

    private carrinhoService: CarrinhoService,
    private authService: AuthService,
    private usuarioLogadoService: UsuarioLogadoService,
    private localStorageService: LocalStorageService,
    private router: Router) {  }

  ngOnInit(): void {
    this.obterQtdItensCarrinho();
    this.obterUsuarioLogado();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  obterQtdItensCarrinho() {
    this.carrinhoService.carrinho$.subscribe(itens => {
      this.qtdItensCarrinho = itens.length
    });
  }
    
  toggleList() {
    this.isListVisible = !this.isListVisible;
  }

  quantCarrinho(): number {
    return this.carrinhoService.tamanho();
  }

  onCarrinhoClick(): void {
    this.router.navigate(['/casefy/carrinho']);
  }

  menuVisible = false;
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  onLogoutClick() {
    // Adicione aqui a lógica para o logout
    alert('Logout clicked');
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.menuVisible = false;
    }
  }

  obterUsuarioLogado() {
    this.subscription.add(this.authService.getUsuarioLogado().subscribe(
      usuario => this.usuarioLogado = usuario
    ));
  }

  deslogar() {
    this.authService.removeToken()
    this.authService.removeUsuarioLogado();
  }

  showMobileBrands = false;
  showBrands() {
    this.showMobileBrands = !this.showMobileBrands;
    
  }
}
