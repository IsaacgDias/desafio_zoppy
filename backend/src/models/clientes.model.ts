import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Produto } from '../models/produtos.model';
import { ClienteProduto } from '../models/cliente_produto.model';

// Modelo Sequelize que representa a tabela 'clientes' no banco de dados
@Table({ tableName: 'clientes', timestamps: true })
export class Cliente extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    nome: string;

    @Column({ type: DataType.STRING, allowNull: true })
    email?: string;

    @BelongsToMany(() => Produto, () => ClienteProduto)
    produtos?: Produto[];
}
