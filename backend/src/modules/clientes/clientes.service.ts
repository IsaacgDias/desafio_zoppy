import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cliente } from '../../models/clientes.model';
import { Produto } from '../../models/produtos.model';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

@Injectable()
export class ClientesService {
    constructor(
        @InjectModel(Cliente)
        private clienteModel: typeof Cliente,

        @InjectModel(Produto)
        private produtoModel: typeof Produto
    ) {}

    // Retorna todos os clientes com paginação e filtro opcional
    async findAll(options?: { page?: number; limit?: number; search?: string }) {
        const page = options?.page ?? 1;
        const limit = options?.limit ?? 10;
        const search = options?.search ?? '';

        const whereClause = search
        ? {
            [Op.or]: [
                Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('nome')), 'LIKE', `%${search.toLowerCase()}%`),
                Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('email')), 'LIKE', `%${search.toLowerCase()}%`)
            ]
            }
        : {};

        const { rows, count } = await this.clienteModel.findAndCountAll({
            where: whereClause,
            limit,
            offset: (page - 1) * limit,
            order: [['id', 'ASC']],
        });

        return {
            data: rows,
            total: count,
            page,
            limit,
        };
    }

    async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteModel.findByPk(id, { include: [Produto] });
    if (!cliente) throw new Error('Cliente não encontrado');
    return cliente;
    }


    async create(data: Partial<Cliente>): Promise<Cliente> {
        return this.clienteModel.create(data as any);
    }

    async update(id: number, data: Partial<Cliente>): Promise<[number, Cliente[]]> {
    const [count, rows] = await this.clienteModel.update(data, { where: { id }, returning: true });
    if (count === 0) throw new Error('Cliente não encontrado');
    return [count, rows];
    }


    async remove(id: number): Promise<number> {
    const deleted = await this.clienteModel.destroy({ where: { id } });
    if (deleted === 0) throw new Error('Cliente não encontrado');
    return deleted;
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
