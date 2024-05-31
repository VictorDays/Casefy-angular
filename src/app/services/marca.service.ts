import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../crud-adm/models/marca.model';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
    private baseUrl = 'http://localhost:8080/marcas';
  
    constructor(private httpClient: HttpClient) {  }
  
    findAll(page?: number, pageSize?: number): Observable<Marca[]> {
      let params = {}
      if(page !== undefined && pageSize !== undefined){
        params = {
          page: page.toString(),
          pageSize: pageSize.toString()
        }
      }
      return this.httpClient.get<Marca[]>(`${this.baseUrl}`, {params});
    }

    count(): Observable<number>{
      return this.httpClient.get<number>(`${this.baseUrl}/count`);
    }

    findByNome(nome: string): Observable<Marca[]> {
      return this.httpClient.get<Marca[]>(`${this.baseUrl}/search/nome/${nome}`);
    }

    findByMarca(marca: string): Observable<Marca[]> {
      return this.httpClient.get<Marca[]>(`${this.baseUrl}/search/marca/${marca}`);
    }
  
    findById(id: number): Observable<Marca> {
      return this.httpClient.get<Marca>(`${this.baseUrl}/${id}`);
    }
  
    insert(marca: Marca): Observable<Marca> {
      return this.httpClient.post<Marca>(this.baseUrl, marca);
    }
    
    update(marca: Marca): Observable<Marca> {
      return this.httpClient.put<Marca>(`${this.baseUrl}/${marca.id}`, marca);
    }
  
    delete(marca: Marca): Observable<any> {
      return this.httpClient.delete<any>(`${this.baseUrl}/${marca.id}`);
    }
}
