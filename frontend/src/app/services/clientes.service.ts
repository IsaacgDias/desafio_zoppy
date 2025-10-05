import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id?: number;
  nome: string;
  email?: string;
  produtos: { id: number; nome: string }[];
}

export interface ClienteResponse {
  data: Cliente[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})

export class ClientesService {
  private apiUrl = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient) {}

  obterClientes(page: number = 1, limit: number = 10, search: string = ''): Observable<ClienteResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);
    
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<ClienteResponse>(this.apiUrl, { params });
  }


  criarCliente(cliente: { nome: string; email?: string }): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  atualizarCliente(id: number, cliente: Cliente): Observable<Cliente> {
    const payload = { nome: cliente.nome, email: cliente.email };
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, payload);
  }

  deletarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  vincularProduto(clienteId: number, produtoId: number): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/${clienteId}/produtos/${produtoId}`, {});
  }

}
