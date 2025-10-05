import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientesService, Cliente } from '../../services/clientes.service';
import { ProdutosService, Produto, ProdutosResponse } from '../../services/produtos.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-vincular-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vincular-produto.component.html',
  styleUrls: ['./vincular-produto.component.css']
})
export class VincularProdutoComponent implements OnInit {
  clienteId!: number;
  cliente?: Cliente;

  produtos$!: Observable<Produto[]>;
  totalProdutos = 0;
  page = 1;
  limit = 5;
  searchTerm = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClientesService,
    private produtoService: ProdutosService
  ) {}

  ngOnInit(): void {
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarCliente();
    this.carregarProdutos();
  }

  // Carrega dados do cliente
  carregarCliente() {
    this.clienteService.obterClientes().subscribe(res => {
      this.cliente = res.data.find(c => c.id === this.clienteId);
    });
  }

  // Carrega produtos com paginação e filtro
  carregarProdutos() {
    this.produtos$ = this.produtoService
      .obterProdutos(this.page, this.limit, this.searchTerm)
      .pipe(
        map((res: ProdutosResponse) => {
          this.totalProdutos = res.total;
          return res.data;
        })
      );
  }

  // Filtra produtos em tempo real
  filtrarProdutos(filtro: string) {
    this.searchTerm = filtro;
    this.page = 1; // resetar para primeira página
    this.carregarProdutos();
  }

  // Navegação entre páginas
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

  totalPaginas(): number {
    return Math.ceil(this.totalProdutos / this.limit);
  }

  // Vincula produto ao cliente
  vincularProduto(produtoId: number) {
    this.clienteService.vincularProduto(this.clienteId, produtoId)
      .subscribe({
        next: () => {
          alert(`Produto vinculado com sucesso!`);
          this.router.navigate(['/clientes']);
        },
        error: () => {
          alert('Erro ao vincular produto.');
        }
      });
  }

  cancelar() {
    this.router.navigate(['/clientes']);
  }
}
