import { Injectable } from '@angular/core';
import axios from 'axios';

// Serviço responsável por consumir a API de produtos e fornecer métodos CRUD
export interface Produto {
  id?: number;
  nome: string;
  descricao?: string;
  preco: number;
  estoque: number;
}

@Injectable({
  providedIn: 'root'
})

export class ProdutosService {
  private apiUrl = 'hhtp://localhost:3000/produtos';

  async obeterProdutos(): Promise<Produto[]> {
    const response = await axios.get(this.apiUrl);
    return response.data 
  }

  async criarProduct(produto: Produto): Promise<Produto> {
    const response = await axios.post(this.apiUrl, produto);
    return response.data;
  }

  async atualizarProduto(id: number, produto: Produto): Promise<Produto> {
    const response = await axios.put(`${this.apiUrl}/${id}`, produto);
    return response.data;
  }

  async deletarProduto(id: number): Promise<void> {
    await axios.delete(`${this.apiUrl}/${id}`);
  }
  constructor() { }
}
