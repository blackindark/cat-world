import { getCloudflareContext } from '@opennextjs/cloudflare';

type D1Result<T> = { results: T[] };

type D1Prepared = {
  bind: (...values: unknown[]) => {
    all: <T>() => Promise<D1Result<T>>;
    first: <T>() => Promise<T | null>;
    run: () => Promise<unknown>;
  };
};

type D1DatabaseLike = {
  prepare: (query: string) => D1Prepared;
};

export async function getD1Database(): Promise<D1DatabaseLike | undefined> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return env.DB as D1DatabaseLike | undefined;
  } catch {
    return undefined;
  }
}

export async function requireD1Database(): Promise<D1DatabaseLike> {
  const db = await getD1Database();
  if (!db) throw new Error('Cloudflare D1 binding DB is not available in the current runtime.');
  return db;
}

export async function queryAll<T>(db: D1DatabaseLike, sql: string, ...params: unknown[]): Promise<T[]> {
  const statement = db.prepare(sql).bind(...params);
  const result = await statement.all<T>();
  return result.results ?? [];
}

export async function queryFirst<T>(db: D1DatabaseLike, sql: string, ...params: unknown[]): Promise<T | null> {
  return db.prepare(sql).bind(...params).first<T>();
}

export async function executeRun(db: D1DatabaseLike, sql: string, ...params: unknown[]) {
  return db.prepare(sql).bind(...params).run();
}
