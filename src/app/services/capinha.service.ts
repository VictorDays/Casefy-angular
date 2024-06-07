import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Capinha } from "../models/capinha.model";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class CapinhaService {
      private baseUrl = 'http://localhost:8080/capinhas';
  http: any;
    
      constructor(private httpClient: HttpClient) {  }
    
      getAllPaginacao(pagina: number, tamanhoPagina: number): Observable<Capinha[]> {
        const params = {
          page: pagina.toString(),
          pageSize: tamanhoPagina.toString()
        }
        return this.httpClient.get<Capinha[]>(`${this.baseUrl}`, { params });
      }
      
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

      getUrlImagem(nomeImagem: string): string {
        return `http://localhost:8080/capinhas/image/download/${nomeImagem}`;
      }
    
      uploadImagem(id: number, nomeImagem: string, imagem: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('id', id.toString());
        formData.append('nomeImagem', imagem.name);
        formData.append('imagem', imagem, imagem.name);
        
        return this.httpClient.patch<Capinha>(`${this.baseUrl}/image/upload`, formData);
      }
  }
  