import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrador } from '../models/administrador.model'; 

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
    private baseUrl = 'http://localhost:8080/administradores';
  
    constructor(private httpClient: HttpClient) {  }
  
    findAll(): Observable<Administrador[]> {
      return this.httpClient.get<Administrador[]>(this.baseUrl);
    }

    findByNome(nome: string): Observable<Administrador[]> {
      return this.httpClient.get<Administrador[]>(`${this.baseUrl}/search/nome/${nome}`);
    }

    findByMatricula(matricula: number): Observable<Administrador[]> {
      return this.httpClient.get<Administrador[]>(`${this.baseUrl}/search/matricula/${matricula}`);
    }
  
    findById(id: number): Observable<Administrador> {
      return this.httpClient.get<Administrador>(`${this.baseUrl}/${id}`);
    }
  
    insert(administrador: Administrador): Observable<Administrador> {
      return this.httpClient.post<Administrador>(this.baseUrl, administrador);
    }
    
    update(administrador: Administrador): Observable<Administrador> {
      return this.httpClient.put<Administrador>(`${this.baseUrl}/${administrador.id}`, administrador);
    }
  
    delete(administrador: Administrador): Observable<any> {
      return this.httpClient.delete<any>(`${this.baseUrl}/${administrador.id}`);
    }
}
