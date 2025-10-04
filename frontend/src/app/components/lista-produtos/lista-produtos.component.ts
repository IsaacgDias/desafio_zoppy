import { Component, OnInit } from '@angular/core';
import { ProdutosService, Produto } from '../../services/produtos.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {
  produtos$!: Observable<Produto[]>; 

  constructor(
    private produtosService: ProdutosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtos$ = this.produtosService.obterProdutos();
  }

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

  irParaClientes() {
    this.router.navigate(['/clientes']);
  }
}
