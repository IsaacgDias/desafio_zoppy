import { Module } from '@nestjs/common'; 
import { SequelizeModule } from '@nestjs/sequelize';
import { ProdutosModule } from './modules/produtos/produtos.module';
import { Produto } from './modules/produtos/models/produtos.model';

// Configuração do banco de dados
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234', 
      database: 'desafio_zoppy',
      models: [Produto], 
      autoLoadModels: true,
      synchronize: true,
    }),
    ProdutosModule,
  ],
})
export class AppModule {}
