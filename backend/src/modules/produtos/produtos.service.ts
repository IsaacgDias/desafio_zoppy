import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Produto } from './models/produtos.model';
import { Model } from 'sequelize-typescript';

// Serviço responsável pelas operações CRUD da entidade Produto
@Injectable()
export class ProdutosService {
    constructor(
        @InjectModel(Produto)
        private produtoModel: typeof Produto,

    ) {}

    // Retorna todos os produtos
    async findAll(): Promise<Produto[]> {
        return this.produtoModel.findAll();
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
        return this.produtoModel.destroy({ where: {id} })
    }
    
}
