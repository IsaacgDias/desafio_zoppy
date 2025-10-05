import { Component, OnInit } from '@angular/core';
import { ClientesService, Cliente } from '../../services/clientes.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'app-lista-clientes',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './lista-clientes.component.html',
    styleUrls: ['./lista-clientes.component.css']
})

export class ListaClientesComponent implements OnInit {
    clientes$!: Observable<Cliente[]>;
    totalClientes = 0;
    page = 1;
    limit = 5;
    searchTerm = '';

    constructor(private clientesService: ClientesService, private router: Router) {}

    ngOnInit() {
        this.carregarClientes();
    }

    // Carrega produtos da API com paginação e filtro
    carregarClientes() {
        this.clientes$ = this.clientesService
          .obterClientes(this.page, this.limit, this.searchTerm)
          .pipe(
            map(res => {
              this.totalClientes = res.total;
              return res.data;
            })
          );
      }
    
    // Filtro em tempo real
    filtrarClientes(filtro: string) {
        this.searchTerm = filtro;
        this.page = 1; // voltar para primeira página ao filtrar
        this.carregarClientes();
    }
    
    // Paginação
    proximaPagina() {
        if (this.page * this.limit < this.totalClientes) {
          this.page++;
          this.carregarClientes();
        }
    }
    
    paginaAnterior() {
        if (this.page > 1) {
          this.page--;
          this.carregarClientes();
        }
    }

    novoCliente() {
        this.router.navigate(['/clientes/novo']);
    }

    editarCliente(id: number) {
        this.router.navigate([`/clientes/editar/${id}`]);
    }

    deletarCliente(id: number) {
        if (confirm('Deseja realmente deletar este cliente?')) {
            this.clientesService.deletarCliente(id).subscribe(() => {
            this.carregarClientes();
            });
        }
    }
    
    voltarListaProduto() {
        this.router.navigate(['/produtos/'])
    }

    abrirVincularProduto(clienteId: number) {
        this.router.navigate([`/clientes/vincular-produto/${clienteId}`]);
    }

    totalPaginas(): number {
        return Math.ceil(this.totalClientes / this.limit);
    }
}
