import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category/entities/category.entity';
import { Investments } from './investments/entities/investments.entity';
import { InvestmentsModule } from './investments/investments.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    CategoryModule,
    InvestmentsModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      // @ts-expect-error - process.env.POSTGRES_PORT is a string
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Category, Investments],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
