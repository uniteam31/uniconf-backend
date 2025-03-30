import { User } from '../user.schema';

export type PublicUser = Pick<User, '_id' | 'publicName' | 'username'>;
