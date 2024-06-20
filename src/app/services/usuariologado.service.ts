import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLogadoService {
  
  private baseLogadoURL: string = 'http://localhost:8080/usuariologado';

  constructor(private http: HttpClient) { }

  getUsuarioLogado(): Observable<Usuario> {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      throw new Error('Token JWT não encontrado no localStorage');
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get<Usuario>(`${this.baseLogadoURL}`, httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro na requisição HTTP:', error);
        return throwError(error);
      })
    );
  }

  updateNome(nome: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
      })
    };

    return this.http.patch<any>(`${this.baseLogadoURL}/updateNome/${nome}`, null, httpOptions);
  }

  updateSenha(senha: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
      })
    };

    return this.http.patch<any>(`${this.baseLogadoURL}/updateSenha/${senha}`, null, httpOptions);
  }

  updateCPF(cpf: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
      })
    };

    return this.http.patch<any>(`${this.baseLogadoURL}/updateCPF/${cpf}`, null, httpOptions);
  }

  getPedidosUsuario(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
      })
    };

    return this.http.get<any>(`${this.baseLogadoURL}/PedidosDoUsuario`, httpOptions);
  }

  getItensPedidosUsuario(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
      })
    };

    return this.http.get<any>(`${this.baseLogadoURL}/ItensDasComprasUsuario`, httpOptions);
  }
}
