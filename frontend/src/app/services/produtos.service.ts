import { Injectable } from '@angular/core';
import axios from 'axios';

// Interface do Produto
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
  private apiUrl = 'http://localhost:3000/produtos';

  // Buscar todos os produtos
  async obterProdutos(): Promise<Produto[]> {
    const response = await axios.get(this.apiUrl);
    return response.data;
  }

  async obterProdutoPorId(id: number): Promise<Produto> {
    const response = await axios.get(`${this.apiUrl}/${id}`);
    return response.data;
  }


  // Criar produto
  async criarProduto(produto: Produto): Promise<Produto> {
    const response = await axios.post(this.apiUrl, produto);
    return response.data;
  }

  // Atualizar produto
  async atualizarProduto(id: number, produto: Produto): Promise<Produto> {
    const response = await axios.put(`${this.apiUrl}/${id}`, produto);
    return response.data;
  }

  // Deletar produto
  async deletarProduto(id: number): Promise<void> {
    await axios.delete(`${this.apiUrl}/${id}`);
  }

  
}
