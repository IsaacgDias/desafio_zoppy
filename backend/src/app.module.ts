import { Module } from '@nestjs/common'; 
import { SequelizeModule } from '@nestjs/sequelize';
import { ProdutosModule } from './modules/produtos/produtos.module';
import { Produto } from './models/produtos.model';
import { ClientesModule } from './modules/clientes/clientes.module';

// Configuração do banco de dados
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || 'localhost',   // <--- aqui
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '1234', 
      database: process.env.DB_NAME || 'desafio_zoppy',
      models: [Produto],
      autoLoadModels: true,
      synchronize: true,
    }),
    ProdutosModule,
    ClientesModule,
  ],
})
export class AppModule {}
