import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientesService, Cliente } from '../../services/clientes.service';
import { ProdutosService, Produto } from '../../services/produtos.service';
import { Observable } from 'rxjs';

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

  carregarCliente() {
    this.clienteService.obterClientes()
      .subscribe(clientes => {
        this.cliente = clientes.find(c => c.id === this.clienteId);
      });
  }

  carregarProdutos() {
    this.produtos$ = this.produtoService.obterProdutos();
  }

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
