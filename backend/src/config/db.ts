import { Pool } from 'pg'

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'retaceria',
  password: '44857972',
  port: 5432
})