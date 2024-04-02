import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lote } from '../models/lote.models'; 

@Injectable({
  providedIn: 'root'
})
export class LoteService {
    private baseUrl = 'http://localhost:8080/lotes';
  
    constructor(private httpClient: HttpClient) {  }
  
    findAll(): Observable<Lote[]> {
      return this.httpClient.get<Lote[]>(this.baseUrl);
    }

    findByNome(nome: string): Observable<Lote[]> {
      return this.httpClient.get<Lote[]>(`${this.baseUrl}/search/nome/${nome}`);
    }
  
    findById(id: number): Observable<Lote> {
      return this.httpClient.get<Lote>(`${this.baseUrl}/${id}`);
    }
  
    insert(estado: Lote): Observable<Lote> {
      return this.httpClient.post<Lote>(this.baseUrl, estado);
    }
    
    update(estado: Lote): Observable<Lote> {
      return this.httpClient.put<Lote>(`${this.baseUrl}/${estado.id}`, estado);
    }
  
    delete(estado: Lote): Observable<any> {
      return this.httpClient.delete<any>(`${this.baseUrl}/${estado.id}`);
    }
}
