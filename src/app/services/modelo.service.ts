import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modelo } from '../crud-adm/models/modelo.models';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
    private baseUrl = 'http://localhost:8080/modelos';
  
    constructor(private httpClient: HttpClient) {  }
  
    findAll(): Observable<Modelo[]> {
      return this.httpClient.get<Modelo[]>(this.baseUrl);
    }

    findByNome(nome: string): Observable<Modelo[]> {
      return this.httpClient.get<Modelo[]>(`${this.baseUrl}/search/nome/${nome}`);
    }

    findByModelo(modelo: string): Observable<Modelo[]> {
      return this.httpClient.get<Modelo[]>(`${this.baseUrl}/search/modelo/${modelo}`);
    }
  
    findById(id: number): Observable<Modelo> {
      return this.httpClient.get<Modelo>(`${this.baseUrl}/${id}`);
    }
  
    insert(modelo: Modelo): Observable<Modelo> {
      return this.httpClient.post<Modelo>(this.baseUrl, modelo);
    }
    
    update(modelo: Modelo): Observable<Modelo> {
      return this.httpClient.put<Modelo>(`${this.baseUrl}/${modelo.id}`, modelo);
    }
  
    delete(modelo: Modelo): Observable<any> {
      return this.httpClient.delete<any>(`${this.baseUrl}/${modelo.id}`);
    }
}
