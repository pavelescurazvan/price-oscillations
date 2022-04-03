import {PoolClient, Pool} from 'pg';

/**
 * Acquires a connection.
 * @param pool
 */
export async function acquireConnection(pool: Pool): Promise<PoolClient> {
	return await pool.connect();
}
