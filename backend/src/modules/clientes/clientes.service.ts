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

    async findOne(id: number): Promise<Cliente | null> {
        Cliente.belongsToMany(Produto, { through: 'cliente_produtos', as: 'produtos' });
        Produto.belongsToMany(Cliente, { through: 'cliente_produtos', as: 'clientes' });
        
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
