/* Este código implementa um interceptor de autenticação para adicionar o token JWT ao cabeçalho 
de autorização de solicitações HTTP em uma aplicação Angular.*/
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../crud-adm/services/auth.service'; // Importa o serviço AuthService para obter o token JWT

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  // Intercepta as solicitações HTTP e adiciona o token JWT ao cabeçalho de autorização, se disponível
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtém o token jwt do serviço de autenticação
    const authToken = this.authService.getToken();

    // Clona a solicitação e adiciona o cabeçalho de autorização com o token JWT, se disponível
    if (authToken) {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return next.handle(authRequest); // Retorna a solicitação clonada com o cabeçalho de autorização
    }

    // Se não houver token, apenas passa a solicitação sem modificação
    return next.handle(request); // Retorna a solicitação original
  }

}
