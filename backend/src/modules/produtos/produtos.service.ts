import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Produto } from '../../models/produtos.model';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

// Serviço responsável pelas operações CRUD da entidade Produto
@Injectable()
export class ProdutosService {
    constructor(
        @InjectModel(Produto)
        private produtoModel: typeof Produto,
    ) {}

    // Retorna todos os produtos com paginação e filtro opcional
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

        const { rows, count } = await this.produtoModel.findAndCountAll({
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

    // Retorna um produto pelo ID
    async findOne(id: number): Promise<Produto | null> {
        return this.produtoModel.findByPk(id);
    }

    // Cadastra um novo produto
    async create(data: Partial<Produto>): Promise<Produto> {
        return this.produtoModel.create(data as any);
    }

    // Atualiza um produto existente pelo ID
    async update(id: number, data: Partial<Produto>): Promise<[number, Produto[]]> {
        return this.produtoModel.update(data, {
            where: { id },
            returning: true,
        });
    }

    // Remove um produto pelo ID
    async remove(id: number): Promise<number> {
        return this.produtoModel.destroy({ where: { id } });
    }
}
