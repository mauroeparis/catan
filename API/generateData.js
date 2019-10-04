var faker = require('faker');

var database = { users: [], boards: [], rooms: []};

// USERS
for (var i=1; i<10; i++) {
	database.users.push({
		id: i,
		user: faker.internet.userName(),
		pass: faker.internet.password(),
		// email: faker.internet.email()
	});
}

// BOARDS
for (i=1; i<5; i++) {
  database.boards.push({
    id: i,
    name: faker.lorem.word()
  });
}

// LOBBY
for (i=1; i<5; i++) {
  var user = faker.internet.userName();
  database.rooms.push({
    id: i,
    name: faker.lorem.word(),
    owner: user,
    players: [user, faker.internet.userName(), faker.internet.userName()],
    max_players: Math.random() > .5 ? 4 : 3
  });
}

console.log(JSON.stringify(database));
