const express = require('express')
const bodyParser = require('body-parser')


var randomstring = require("randomstring");

const { Sequelize, DataTypes, Model } = require('sequelize');
// Example for postgres 1
//const sequelize = new Squelize('postgres://tutorial:123456@localhost:5432/tutorial') 
// Example for postgres 2
//postgre sql version 13.3
const sequelize = new Sequelize('tutorial', 'tutorial', '123456', {
  host: 'localhost',
  dialect: 'postgres'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});



try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

class User extends Model {}

User.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User', // We need to choose the model name
  tableName: 'users',
  timestamps: false
});

console.log(User === sequelize.models.User);
var fname = randomstring.generate({
	length: 5,
	charset: 'abcde'
});
var name = fname+" "+randomstring.generate({
	length: 5,
	charset: 'fghij'
});
var email = fname+'@gmail.com';

//const jane = User.create({ name: name, email: email });

// Find all users
User.findAll({ raw: true }).then(function (users) {
	//console.log(JSON.stringify(users, null, 2));
	console.log(users);
});

/*(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();*/
//console.log(users.every(user => user instanceof User)); // true
//console.log("All users:", JSON.stringify(users, null, 4));
/*
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
*/