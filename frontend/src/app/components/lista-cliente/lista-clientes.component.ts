import { Component, OnInit } from '@angular/core';
import { ClientesService, Cliente } from '../../services/clientes.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-lista-clientes',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './lista-clientes.component.html',
    styleUrls: ['./lista-clientes.component.css']
})

export class ListaClientesComponent implements OnInit {
    clientes$!: Observable<Cliente[]>;

    constructor(private clientesService: ClientesService, private router: Router) {}

    ngOnInit() {
        this.clientes$ = this.clientesService.obterClientes();
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
            this.clientes$ = this.clientesService.obterClientes();
            });
        }
    }
    
    voltarListaProduto() {
        this.router.navigate(['/produtos/'])
    }

    abrirVincularProduto(clienteId: number) {
        this.router.navigate([`/clientes/vincular-produto/${clienteId}`]);
    }

}
