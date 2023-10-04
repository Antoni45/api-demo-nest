import { User } from 'src/modules/user/user.entity';

export const dbConfig: any = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'db_demo_nest',
  entities: [User],
  synchronize: true,
};
