const users = {
    "Bob": {
    "usersName": "Jake",
    "name": "wum",
    "race": "Human",
    "class": "Fighter",
    "strength": "15",
    "dexterity": "13",
    "constitution": "13",
    "intelligence": "10",
    "wisdom": "12",
    "charisma": "9"
  },
  "Rob": {
    "usersName": "John",
    "name": "tim",
    "race": "Gnome",
    "class": "Barbarian",
    "strength": "17",
    "dexterity": "12",
    "constitution": "15",
    "intelligence": "9",
    "wisdom": "10",
    "charisma": "7"
  }
};

const respondJSON = (request, response, status, object) =>{

    response.writeHead(status, {'Content-Type':'application/json'});
    response.write(JSON.stringify(object));
    response.end();
}

const respondJSONMeta = (request, response, status) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end();
  };

  const getUsers = (request, response) => {
    const responseJSON = {
      users,
    };
      
    respondJSON(request, response, 200, responseJSON);
  };

  const notFound = (request, response) => {
    const responseJSON = {
    message: 'Page not found'
  };
  respondJSON(request, response, 404, responseJSON);
};

const addUser = (request, response, body) => {
    //default json message
    const responseJSON = {
      message: 'Creator, Name, race, class, and stats are required.',
    };
  
    console.log(body.usersName);
    console.log(body.name);
    console.log(body.race);
    console.log(body.class);
    console.log(body.strength);
    console.log(body.dexterity);
    console.log(body.constitution);

    
    if (!body.usersName || !body.name || !body.race || !body.class) {
      responseJSON.id = `missing params`;
      return respondJSON(request, response, 400, responseJSON);
    }
  
    //default status code to 201 created
    let responseCode = 201;
  
    //if that user's name already exists in our object
    //then switch to a 204 updated status
    if (users[body.usersName] && users[body.name]) {
      responseCode = 204;
    } else {
      //otherwise create an object with that name
      users[body.name] = {};
      
    }
  
    //add or update fields for this user name
    users[body.name].usersName = body.usersName;
    users[body.name].name = body.name;
    users[body.name].race= body.race;
    users[body.name].class= body.class;
    users[body.name].strength= body.strength;
    users[body.name].dexterity= body.dexterity;
    users[body.name].constitution= body.constitution;
    users[body.name].intelligence= body.intelligence;
    users[body.name].wisdom= body.wisdom;
    users[body.name].charisma= body.charisma;
  
    
    if (responseCode === 201) {
      responseJSON.message = 'Created Successfully';
      return respondJSON(request, response, responseCode, responseJSON);
    }
    
    return respondJSONMeta(request, response, responseCode);
  };

  //public exports
module.exports = {
    getUsers,
    addUser,
    notFound
  };