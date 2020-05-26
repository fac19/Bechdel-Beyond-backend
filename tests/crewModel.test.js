const test = require('tape');
const build = require('../database/build');

const { getCrew, getCast } = require('../model/crewModel');

test('Can get crew for a given movie', (t) => {
	build()
		.then(() => {
			getCrew(34).then((res) => {
				t.equal(res.director, 'James', 'Correct Movie Director');
				t.equal(res.producer, 'Gio', 'Correct Movie Producer');
				t.equal(res.gender_parity.male, 2, 'Correct gender parity for males');
				t.equal(res.gender_parity.female, 3, 'Correct gender parity for females');
				t.equal(res.gender_parity.notlisted, 34, 'Correct gender parity for not listed');
				t.end();
			});
		})
		.catch((err) => {
			t.error(err);
			t.end();
		});
});

test('Can get cast for a given movie', (t) => {
	build()
		.then(() => {
			getCast(34).then((res) => {
				t.equal(res.gender_parity_cast.male, 12, 'Gender Parity in Movie cast for man');
				t.equal(res.gender_parity_cast.female, 33, 'Gender Parity in Movie cast for woman');
				t.equal(res.gender_parity_cast.notlisted, 342, 'Gender Parity in Movie cast for ulisted');
				t.end();
			});
		})
		.catch((err) => {
			t.error(err);
			t.end();
		});
});
