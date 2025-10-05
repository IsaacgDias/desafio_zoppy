import { Component, OnInit } from '@angular/core';
import { ProdutosService, Produto } from '../../services/produtos.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {
  produtos$!: Observable<Produto[]>; 
  totalProdutos = 0;
  page = 1;
  limit = 5;
  searchTerm = '';

  constructor(
    private produtosService: ProdutosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  // Carrega produtos da API com paginação e filtro
  carregarProdutos() {
    this.produtos$ = this.produtosService
      .obterProdutos(this.page, this.limit, this.searchTerm)
      .pipe(
        map(res => {
          this.totalProdutos = res.total;
          return res.data;
        })
      );
  }

  // Filtro em tempo real
  filtrarProdutos(filtro: string) {
    this.searchTerm = filtro;
    this.page = 1; // voltar para primeira página ao filtrar
    this.carregarProdutos();
  }

  // Paginação
  proximaPagina() {
    if (this.page * this.limit < this.totalProdutos) {
      this.page++;
      this.carregarProdutos();
    }
  }

  paginaAnterior() {
    if (this.page > 1) {
      this.page--;
      this.carregarProdutos();
    }
  }

  // Rotas de CRUD
  novoProduto() {
    this.router.navigate(['/produtos/novo']);
  }

  editarProduto(id: number) {
    this.router.navigate([`/produtos/editar/${id}`]);
  }

  deletarProduto(id: number) {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      this.produtosService.deletarProduto(id).subscribe(() => {
        this.carregarProdutos();
      });
    }
  }

  totalPaginas(): number {
    return Math.ceil(this.totalProdutos / this.limit);
  }

  irParaClientes() {
    this.router.navigate(['/clientes']);
  }
}
