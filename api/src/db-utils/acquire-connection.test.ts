import {expect} from 'chai';
import * as sinon from 'sinon';
import {Client} from 'pg';
import {getConnectionPool} from './db';
import {acquireConnection} from './acquire-connection';

describe('acquire-connection', () => {
	const pool = getConnectionPool();
	const sandbox = sinon.createSandbox();

	after(async () => {
		await pool.end();
		sandbox.restore();
	});

	it('Calling acquireConnection should return a connection', async () => {
		const connection = await acquireConnection(pool);
		expect(connection).to.be.instanceOf(Client);
		connection.release();
	});
});
