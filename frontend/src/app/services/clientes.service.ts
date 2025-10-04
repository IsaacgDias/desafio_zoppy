import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id?: number;
  nome: string;
  email?: string;
  produtos: { id: number; nome: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient) {}

  obterClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
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
