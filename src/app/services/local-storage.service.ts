/*O localStorage é comumente usado em aplicativos da web para armazenar preferências do usuário, 
tokens de autenticação, dados de configuração e outras informações que precisam ser mantidas entre 
sessões de navegação. Ele oferece uma maneira conveniente de persistir pequenos conjuntos de dados 
no navegador do usuário, sem a necessidade de usar cookies ou armazenar dados no lado do servidor. */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  onstructor() { }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

}
