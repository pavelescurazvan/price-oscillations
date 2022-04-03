import {Pool, QueryResult} from 'pg';

/**
 * Runs a query.
 * @param pool
 * @param sql
 * @param bindings
 */
export async function query<Row = any>(pool: Pool, sql: string, bindings: unknown[] = []): Promise<QueryResult<Row>> {
	const connection = await pool.connect();

	console.log('sql', sql);
	console.log('bindings', bindings);

	try {
		return await connection.query<Row>(sql, bindings);
	} finally {
		connection.release();
	}
}
