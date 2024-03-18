import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modelo } from '../models/modelocapinha.model';

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

    findByMarca(marca: string): Observable<Modelo[]> {
      return this.httpClient.get<Modelo[]>(`${this.baseUrl}/search/marca/${marca}`);
    }
  
    findById(id: number): Observable<Modelo> {
      return this.httpClient.get<Modelo>(`${this.baseUrl}/${id}`);
    }
  
    insert(modelocapinha: Modelo): Observable<Modelo> {
      return this.httpClient.post<Modelo>(this.baseUrl, modelocapinha);
    }
    
    update(modelocapinha: Modelo): Observable<Modelo> {
      return this.httpClient.put<Modelo>(`${this.baseUrl}/${modelocapinha.id}`, modelocapinha);
    }
  
    delete(modelocapinha: Modelo): Observable<any> {
      return this.httpClient.delete<any>(`${this.baseUrl}/${modelocapinha.id}`);
    }
}
