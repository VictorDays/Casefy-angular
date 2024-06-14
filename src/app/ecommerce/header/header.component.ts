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
  private subscription = new Subscription();
  constructor(

    private carrinhoService: CarrinhoService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router) { console.log("Cabeçalho") }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    
  }
  ngOnInit(): void {
    this.obterUsuarioLogado();
    console.log(this.usuarioLogado?.nome)
  }

    
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

  obterUsuarioLogado() {
    this.subscription.add(this.authService.getUsuarioLogado().subscribe(
      usuario => this.usuarioLogado = usuario
    ));this.subscription.add(this.authService.getUsuarioLogado().subscribe(
      usuario => {
        this.usuarioLogado = usuario;
        console.log('usuário logado',this.usuarioLogado); // Linha de depuração
      },
      error => {
        console.error('Falha ao obter usuário logado', error); // Linha de depuração
      }
    ));
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

  deslogar() {
    this.authService.removeToken()
    this.authService.removeUsuarioLogado();
  }

  showMobileBrands = false;

  showBrands() {
    this.showMobileBrands = !this.showMobileBrands;
    
  }
}
