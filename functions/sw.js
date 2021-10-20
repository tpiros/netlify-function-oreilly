const characters = [
  {
    id: 1,
    name: 'Luke Skywalker',
    faction: 'rebellion',
    weapon: 'lightsaber',
  },
  {
    id: 2,
    name: 'Darth Vader',
    faction: 'galactic empire',
    weapon: 'lightsaber',
  },
  {
    id: 3,
    name: 'Han Solo',
    faction: 'rebellion',
    weapon: 'blaster pistol',
  },
  {
    id: 4,
    name: 'Leia Organa',
    faction: 'rebellion',
    weapon: 'blaster pistol',
  },
  {
    id: 5,
    name: 'Emperor Palpatine',
    faction: 'galactic empire',
    weapon: 'lightning shock',
  },
  {
    id: 6,
    name: 'Finn',
    faction: 'resistance',
    weapon: 'blaster rifle',
  },
  {
    id: 7,
    name: 'Rey',
    faction: 'resistance',
    weapon: 'lightsaber',
  },
  {
    id: 8,
    name: 'Kylo Ren',
    faction: 'first order',
    weapon: 'lightsaber',
  },
  {
    id: 9,
    name: 'Snoke',
    faction: 'first order',
    weapon: 'lightsaber',
  },
  {
    id: 10,
    name: 'Moff Tarkin',
    faction: 'galatic empire',
    weapon: 'blaster pistol',
  },
];
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET',
  };
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Only HTTP GET is allowed!' }),
    };
  }
  // unique factions
  const uniqueFactions = [
    ...new Set(characters.map((obj) => obj.faction.toLowerCase())),
  ];
  const uniqueWeapons = [
    ...new Set(characters.map((obj) => obj.weapon.toLowerCase())),
  ];

  let response;
  if (
    event.queryStringParameters.faction &&
    event.queryStringParameters.weapon
  ) {
    const faction = event.queryStringParameters.faction.toLowerCase();
    const weapon = event.queryStringParameters.weapon.toLowerCase();
    if (uniqueFactions.includes(faction) && uniqueWeapons.includes(weapon)) {
      response = characters.filter(
        (character) =>
          character.faction === faction && character.weapon === weapon
      );
    } else {
      response += `Faction ${faction} is not valid. Use ${uniqueFactions.toString()}.`;
    }
    if (uniqueWeapons.includes(weapon)) {
    } else {
      response += `Weapon ${weapon} is not valid. Use ${uniqueWeapons.toString()}.`;
    }
  } else if (event.queryStringParameters.faction) {
    const faction = event.queryStringParameters.faction.toLowerCase();
    if (uniqueFactions.includes(faction)) {
      response = characters.filter(
        (character) => character.faction === faction
      );
    } else {
      response = `Faction ${faction} is not valid. Use ${uniqueFactions.toString()}.`;
    }
  } else if (event.queryStringParameters.weapon) {
    const weapon = event.queryStringParameters.weapon.toLowerCase();
    console.log('weapon');
    if (uniqueWeapons.includes(weapon)) {
      response = characters.filter((character) => character.weapon === weapon);
    } else {
      response = `Weapon ${weapon} is not valid. Use ${uniqueWeapons.toString()}.`;
    }
  } else {
    response = characters;
  }
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(response),
  };
};
