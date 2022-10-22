import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import { AnotherEmail } from './models/anotherEmail.model';
import { Case } from './models/case.model';
import { Category } from './models/category.model';
import { Comments } from './models/comments.model';
import { Company } from './models/company.model';
import { TagsCompany } from './models/companyTags.model';
import { Locations } from './models/locations.model';
import { MetaTegs } from './models/metaTegs.model';
import { Partners } from './models/partners.panel';
import { PictureProduct } from './models/pictureProduct.model';
import { Product } from './models/product.model';
import { TagsProduct } from './models/productTags.model';
import { CompanyModule } from './company/company.module';
import { ProductModule } from './product/product.module';


@Module({
  
  controllers: [AppController],
  providers: [AppService],
  imports: [ConfigModule.forRoot({
    envFilePath: `.env`,
    isGlobal: true,

}),
    SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'hack22',
    models: [AnotherEmail,Case,Category,Comments,Company,TagsCompany,Locations,MetaTegs,Partners,PictureProduct,Product,TagsProduct],
    autoLoadModels: true,
    sync: { force: true },
    /* dialectOptions:{
        ssl:{
            require: true,
            rejectUnauthorized: false,
        }
    } */
}),
CompanyModule,
ProductModule
],
})
export class AppModule {}