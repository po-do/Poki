import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';


const dbConfig = config.get('db');

export const typeORMConfig : TypeOrmModuleOptions = {
    type: process.env.MYSQL_TYPE || dbConfig.type,
    host: process.env.MYSQL_HOSTNAME || dbConfig.host,
    port: process.env.MYSQL_PORT || dbConfig.port,
    username: process.env.MYSQL_USERNAME || dbConfig.username,
    password: process.env.MYSQL_PASSWORD || dbConfig.password,
    database: process.env.MYSQL_DB_NAME || dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: process.env.MYSQL_DB_SYNCHRONIZE || dbConfig.synchronize
}