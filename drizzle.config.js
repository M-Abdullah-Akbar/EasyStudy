import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_B9pjw5ROLYoe@ep-yellow-waterfall-a50dmyxe-pooler.us-east-2.aws.neon.tech/test?sslmode=require',
  },
});
