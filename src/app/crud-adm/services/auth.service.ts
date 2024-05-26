import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service'; // Serviço para interagir com localStorage
import { JwtHelperService } from '@auth0/angular-jwt'; // Biblioteca para lidar com JWT
import { Usuario } from '../models/usuario.model'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string = 'http://localhost:8080/auth'; // URL base para as chamadas de autenticação
  private tokenKey = 'jwt_token'; // Chave para armazenar o token JWT no localStorage
  private usuarioLogadoKey = 'usuario_logado'; // Chave para armazenar os detalhes do usuário logado no localStorage
  private usuarioLogadoSubject = new BehaviorSubject<Usuario | null>(null); // BehaviorSubject para emitir o usuário logado

  constructor(private http: HttpClient, 
              private localStorageService: LocalStorageService, // Serviço para interagir com localStorage
              private jwtHelper: JwtHelperService) { // Serviço para lidar com JWT

    this.initUsuarioLogado(); // Inicializa o usuário logado ao criar uma instância do serviço

  }

  // Método privado para inicializar o usuário logado a partir do localStorage
  private initUsuarioLogado() {
    const usuario = localStorage.getItem(this.usuarioLogadoKey);
    if (usuario) {
      const usuarioLogado = JSON.parse(usuario); // Converte a string JSON do localStorage em um objeto JavaScript

      this.setUsuarioLogado(usuarioLogado); // Define o usuário logado no BehaviorSubject
      this.usuarioLogadoSubject.next(usuarioLogado); // Notifica os observadores sobre o usuário logado
    }
  }

  // Método para realizar o login
  login(email: string, senha: string): Observable<any> {
    const params = {
      login: email,
      senha: senha,
      perfil: 1 // Define o perfil como paciente
    }

    //{ observe: 'response' } para garantir que a resposta completa seja retornada (incluindo o cabeçalho)
    return this.http.post(`${this.baseURL}`, params, {observe: 'response'}).pipe(
      tap((res: any) => {
        const authToken = res.headers.get('Authorization') ?? '';
        if (authToken) {
          this.setToken(authToken); // Armazena o token JWT no localStorage
          const usuarioLogado = res.body;
          if (usuarioLogado) {
            this.setUsuarioLogado(usuarioLogado); // Armazena os detalhes do usuário logado no localStorage
            this.usuarioLogadoSubject.next(usuarioLogado); // Notifica os observadores sobre o usuário logado
          }
        }
      })
    );
  }

  // Método para definir o usuário logado no localStorage
  setUsuarioLogado(usuario: Usuario): void {
    this.localStorageService.setItem(this.usuarioLogadoKey, usuario);
  }

  // Método para definir o token JWT no localStorage
  setToken(token: string): void {
    this.localStorageService.setItem(this.tokenKey, token);
  }

  // Método para obter o BehaviorSubject que emite o usuário logado
  getUsuarioLogado() {
    return this.usuarioLogadoSubject.asObservable();
  }

  // Método para obter o token JWT do localStorage
  getToken(): string | null {
    return this.localStorageService.getItem(this.tokenKey);
  }

  // Método para remover o token JWT do localStorage
  removeToken(): void {
    this.localStorageService.removeItem(this.tokenKey);
  }

  // Método para remover os detalhes do usuário logado do localStorage e notificar os observadores
  removeUsuarioLogado(): void {
    this.localStorageService.removeItem(this.usuarioLogadoKey);
    this.usuarioLogadoSubject.next(null); // Notifica os observadores de que não há usuário logado
  }

  // Método para verificar se o token JWT está expirado
  isTokenExpired(): boolean {
    const token = this.getToken();
    // Verifica se o token é nulo ou está expirado usando o serviço JwtHelper
    return !token || this.jwtHelper.isTokenExpired(token);
  }

}
