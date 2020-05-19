const test = require('tape');
const build = require('../database/build');

const { createUser } = require('../model/usersModel');

test('DB tests are running!', (t) => {
	const x = 5;
	t.equal(x, 5, 'this is working');
	t.end();
});

test('Can create new user', (t) => {
	build().then(() => {
		const user = {
			username: 'Bob123',
			email: 'bob@hello.com',
			password: '54321',
		};
		createUser(user)
			.then((userId) => {
				t.equal(userId, 3, 'User Id is equal to 3');
				t.end();
			})
			.catch((err) => {
				t.error(err);
				t.end();
			});
	});
});

test('Can  not create dublicate users', (t) => {
	build().then(() => {
		const user = {
			username: 'Gio',
			email: 'gio@gio.com',
			password: '12367',
		};
		createUser(user)
			.then(() => {})
			.catch((err) => {
				t.throws(
					err,
					'duplicate key value violates unique constraint "users_username_key"',
					'User was not created',
				);
				t.end();
			});
	});
});
