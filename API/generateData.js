var faker = require('faker');

var database = { users: [], boards: [], rooms: [],
                hexes: { hexes : [] } };

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

const res = ["brick", "lumber", "wool", "grain", "ore"]

// RESOURCES
database['resources'] = {
    resources: res,
    cards: ["road_building", "year_of_plenty", "monopoly",
            "victory_point", "knight", "knight"]
};

// HEX_BOARD
database.hexes.hexes.push({
  position: {
    level: 0,
    index: 0
  },
  resource: "desert",
  token: 7
});

for (i = 1; i < 3; i++) {
  for (var j = 0; j < i*6; j++) {
    database.hexes.hexes.push({
      position: {
          level: i,
          index: j
      },
      resource: res[Math.floor(Math.random() * res.length)],
      token: (i+j) % 12 + 1
    })
  }
}

console.log(JSON.stringify(database));
