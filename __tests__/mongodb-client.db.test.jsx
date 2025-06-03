import { describe, it, expect } from 'vitest';
import MongoDBClient from '../src/lib/db/mongodb-client';

const db = MongoDBClient.get();

describe('MongoDB Connection', () => {
  it('should connect successfully', async () => {
    await expect(db.connect()).resolves.toBeUndefined();
  });
});

describe('MongoDB Disconnection', () => {
  it('should disconnect successfully', async () => {
    await expect(db.disconnect()).resolves.toBeUndefined();
  });
});
