import { Profile } from 'src/modules/profile/Profile';
import { User } from 'src/modules/user/User';

export const dbConfig: any = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'db_demo_nest',
  entities: [User, Profile],
  synchronize: true,
};
