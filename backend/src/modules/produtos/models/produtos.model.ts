import { Table, Column, Model, DataType } from 'sequelize-typescript';

// Modelo Sequelize que representa a tabela 'produtos' no banco de dados
@Table({ tableName: 'produtos', timestamps: true })
export class Produto extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    nome: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    descricao?: string;

    @Column({ type: DataType.DECIMAL(10,2), allowNull: false })
    preco: number;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    estoque: number;
}
