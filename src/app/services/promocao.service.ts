import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promocao } from '../crud-adm/models/Promocao.model'; 

@Injectable({
  providedIn: 'root'
})
export class PromocaoService {
    private baseUrl = 'http://localhost:8080/promocao';
  
    constructor(private httpClient: HttpClient) {  }
  
    findAll(): Observable<Promocao[]> {
      return this.httpClient.get<Promocao[]>(this.baseUrl);
    }

    findByCodigo(codigo: string): Observable<Promocao[]> {
      return this.httpClient.get<Promocao[]>(`${this.baseUrl}/search/${codigo}`);
    }
  
    findById(id: number): Observable<Promocao> {
      return this.httpClient.get<Promocao>(`${this.baseUrl}/${id}`);
    }
  
    insert(promocao: Promocao): Observable<Promocao> {
      return this.httpClient.post<Promocao>(this.baseUrl, promocao);
    }
    
    update(promocao: Promocao): Observable<Promocao> {
      return this.httpClient.put<Promocao>(`${this.baseUrl}/${promocao.id}`, promocao);
    }
  
    delete(promocao: Promocao): Observable<any> {
      return this.httpClient.delete<any>(`${this.baseUrl}/${promocao.id}`);
    }
}
