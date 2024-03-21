import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cidade } from '../models/cidade.models';


@Injectable({
  providedIn: 'root'
})
export class CidadeService {
    private baseUrl = 'http://localhost:8080/cidades';
  
    constructor(private httpClient: HttpClient) {  }
  
    findAll(): Observable<Cidade[]> {
      return this.httpClient.get<Cidade[]>(this.baseUrl);
    }

    findByNome(nome: string): Observable<Cidade[]> {
      return this.httpClient.get<Cidade[]>(`${this.baseUrl}/search/nome/${nome}`);
    }
  
    findById(id: number): Observable<Cidade> {
      return this.httpClient.get<Cidade>(`${this.baseUrl}/${id}`);
    }
  
    insert(cidade: Cidade): Observable<Cidade> {
      return this.httpClient.post<Cidade>(this.baseUrl, cidade);
    }
    
    update(cidade: Cidade): Observable<Cidade> {
      return this.httpClient.put<Cidade>(`${this.baseUrl}/${cidade.id}`, cidade);
    }
  
    delete(cidade: Cidade): Observable<any> {
      return this.httpClient.delete<any>(`${this.baseUrl}/${cidade.id}`);
    }
}
