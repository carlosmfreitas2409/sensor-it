import Elysia from 'elysia';

import { createAccountController } from '../use-cases/create-account/controller';

export const usersRoutes = new Elysia().use(createAccountController);
