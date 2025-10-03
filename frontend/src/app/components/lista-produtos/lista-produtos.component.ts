import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutosService, Produto } from '../../services/produtos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(
    private produtosService: ProdutosService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.produtos = await this.produtosService.obterProdutos();
  }

  novoProduto() {
    this.router.navigate(['/produtos/novo']);
  }

  editarProduto(id: number) {
    this.router.navigate([`/produtos/editar/${id}`]);
  }

  async deletarProduto(id: number) {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      await this.produtosService.deletarProduto(id);
      // Atualiza a lista local removendo o produto deletado
      this.produtos = this.produtos.filter(p => p.id !== id);
    }
  }
}
