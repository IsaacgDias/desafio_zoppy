import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';
import { Produto } from '../produtos/models/produtos.model';

@Module({
  imports: [SequelizeModule.forFeature([Produto])],
  providers: [ProdutosService],
  controllers: [ProdutosController],
})
export class ProdutosModule {}
