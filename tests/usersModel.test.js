const test = require('tape');
const build = require('../database/build');

const { createUser, getUser } = require('../model/userModel');

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
				t.equal(userId, 4, 'User Id is equal to 4');
				t.end();
			})
			.catch((err) => {
				t.error(err);
				t.end();
			});
	});
});

test('Can not create duplicate users', (t) => {
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
					err.message,
					'duplicate key value violates unique constraint "users_username_key"',
					'User was not created',
				);
				t.end();
			});
	});
});

test('Returns error if no user found', (t) => {
	build().then(() => {
		getUser('hello@iscool.com').catch((err) => {
			t.throws(err.message, 'User does not exist');
			t.end();
		});
	});
});

test('Returns user with a given email address', (t) => {
	build().then(() => {
		getUser('gio@gio.com')
			.then((res) => {
				t.equal(res.username, 'Gio', 'Correct name returned');
				t.end();
			})
			.catch((err) => {
				t.error(err);
				t.end();
			});
	});
});
