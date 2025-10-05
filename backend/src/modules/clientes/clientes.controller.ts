import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { Cliente } from '../../models/clientes.model';

// Controller responsável pelas rotas CRUD da entidade Cliente
@Controller('clientes')
export class ClientesController {
    constructor(private readonly clientesService: ClientesService) {}

    @Get() // Retorna todos os clientes com paginação e filtro opcional
    async findAll(
        @Query('page') page = 1,
        @Query('limit') limit = 10,
        @Query('search') search?: string
    ): Promise<{ data: Cliente[]; total: number; page: number; limit: number }> {
        return this.clientesService.findAll({ page: Number(page), limit: Number(limit), search });
    }

    @Get(':id') // Retorna clientes por ID
    async findOne(@Param('id') id: number): Promise<Cliente | null> {
        return this.clientesService.findOne(id);
    }

    @Post() // Cadastra um novo cliente
    async create(@Body() data: Partial<Cliente>): Promise<Cliente> {
        return this.clientesService.create(data);
    }

    @Put(':id') // Atualiza um cliente pelo ID
    async update(@Param('id') id: number, @Body() data: Partial<Cliente>): Promise<[number, Cliente[]]> {
        return this.clientesService.update(id, data);
    }

    @Delete(':id') // Remove um cliente pelo ID
    async remove(@Param('id') id: number): Promise<number> {
        return this.clientesService.remove(id);
    }

    @Post(':id/produtos/:produtoId') // Vincula o produto com o cliente
    async vincularProduto(
        @Param('id') clienteId: number,
        @Param('produtoId') produtoId: number,
    ) {
        return this.clientesService.vincularProduto(clienteId, produtoId);
    }

}
