import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Capinha } from "../models/capinha.model";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class CapinhaService {
      private baseUrl = 'http://localhost:8080/capinhas';
    
      constructor(private httpClient: HttpClient) {  }
    
      findAll(): Observable<Capinha[]> {
        return this.httpClient.get<Capinha[]>(this.baseUrl);
      }
  
      findByNome(nome: string): Observable<Capinha[]> {
        return this.httpClient.get<Capinha[]>(`${this.baseUrl}/search/nome/${nome}`);
      }
    
      findById(id: number): Observable<Capinha> {
        return this.httpClient.get<Capinha>(`${this.baseUrl}/${id}`);
      }
    
      insert(capinha: Capinha): Observable<Capinha> {
        return this.httpClient.post<Capinha>(this.baseUrl, capinha);
      }
      
      update(capinha: Capinha): Observable<Capinha> {
        return this.httpClient.put<Capinha>(`${this.baseUrl}/${capinha.id}`, capinha);
      }
    
      delete(capinha: Capinha): Observable<any> {
        return this.httpClient.delete<any>(`${this.baseUrl}/${capinha.id}`);
      }
  }
  