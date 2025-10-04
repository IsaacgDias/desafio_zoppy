import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Cliente } from './clientes.model';
import { Produto } from '../models/produtos.model';

// Modelo Sequelize que representa a tabela 'cliente_produtos' no banco de dados
@Table({ tableName: 'cliente_produtos', timestamps: false })
export class ClienteProduto extends Model {
    @ForeignKey(() => Cliente)
    @Column
    clienteId: number;

    @ForeignKey(() => Produto)
    @Column
    produtoId: number;
}
