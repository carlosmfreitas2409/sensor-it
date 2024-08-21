import Elysia from 'elysia';

import { listMembersController } from '../use-cases/list-members/controller';

export const membersRoutes = new Elysia().use(listMembersController);
