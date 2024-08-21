import { createConnection } from '@sensor-it/db';

export type IDatabaseConnection = typeof db;

export const db = createConnection();
