import {Pool, QueryResult} from 'pg';
import {acquireConnection} from './acquire-connection';

/**
 * Runs a query.
 * @param pool
 * @param sql
 * @param bindings
 */
export async function query<Row = any>(pool: Pool, sql: string, bindings: unknown[] = []): Promise<QueryResult<Row>> {
	const connection = await acquireConnection(pool);
	try {
		return await connection.query<Row>(sql, bindings);
	} finally {
		connection.release();
	}
}
