import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cliente } from '../../models/clientes.model';
import { ClienteProduto } from '../../models/cliente_produto.model';
import { ClientesService } from '../clientes/clientes.service';
import { ClientesController } from './clientes.controller';
import { Produto } from '../../models/produtos.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Cliente, ClienteProduto, Produto]),
  ],
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [ClientesService]
})
export class ClientesModule {}
