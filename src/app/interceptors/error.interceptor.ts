/*Este código implementa um interceptor de erro para lidar 
com erros de resposta HTTP em uma aplicação Angular.  */

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  // Intercepta as solicitações HTTP e adiciona lógica de tratamento de erro
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => { // Captura erros de resposta HTTP
        const listOfErrors = new Array(401, 403); // Lista de códigos de erro específicos
        if (listOfErrors.indexOf(error.status) > -1) { // Verifica se o código de erro está na lista
          // Redireciona para a página de login em caso de não autorizado ou proibido
          this.router.navigate(['/login']);
        }


        return throwError(() => error); // Retorna o erro capturado para os observadores
      })
    );
  }
}
