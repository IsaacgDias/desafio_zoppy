import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produto {
  id?: number;
  nome: string;
  descricao?: string;
  preco: number;
  estoque: number;
}

export interface ProdutosResponse {
  data: Produto[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})

export class ProdutosService {
  private apiUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  // Obter produtos com paginação e filtro opcional
  obterProdutos(page: number = 1, limit: number = 10, search: string = ''): Observable<ProdutosResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<ProdutosResponse>(this.apiUrl, { params });
  }

  obterProdutoPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  criarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  atualizarProduto(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${id}`, produto);
  }

  deletarProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
