import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cliente } from '../../models/clientes.model';
import { Produto } from '../../models/produtos.model';

@Injectable()
export class ClientesService {
    constructor(
        @InjectModel(Cliente)
        private clienteModel: typeof Cliente,

        @InjectModel(Produto)
        private produtoModel: typeof Produto
    ) {}

    // Todos os clientes com produtos
    async findAll(): Promise<Cliente[]> {
        return this.clienteModel.findAll({ include: [Produto] });
    }

    async findOne(id: number): Promise<Cliente | null> {
        return this.clienteModel.findByPk(id, { include: [Produto] });
    }

    async create(data: Partial<Cliente>): Promise<Cliente> {
        return this.clienteModel.create(data as any);
    }

    async update(id: number, data: Partial<Cliente>): Promise<[number, Cliente[]]> {
        return this.clienteModel.update(data, { where: { id }, returning: true });
    }

    async remove(id: number): Promise<number> {
        return this.clienteModel.destroy({ where: { id } });
    }
    async vincularProduto(clienteId: number, produtoId: number) {
        const cliente = await this.clienteModel.findByPk(clienteId);
        const produto = await this.produtoModel.findByPk(produtoId);

        if (!cliente || !produto) {
            throw new Error('Cliente ou Produto não encontrado');
        }

        await (cliente as any).$add('produto', produto);
        return this.findOne(clienteId); 
    }

}
