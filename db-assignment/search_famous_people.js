const settings = require("./settings"); // settings.json

const knex = require("knex")({
  client: 'pg',
  connection: {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
  }
});

function famousPeople(arr) {
  arr.forEach(function (person, index) {
    console.log(`-${index + 1}: ${person.first_name} ${person.last_name}, born ${person.birthdate.toISOString().split('T')[0]}'`);
  });
}

knex
  .from('famous_people')
  .where('first_name', process.argv[2])
  .select()

  .asCallback(function (err, rows) {
    if (err) return console.error(err);
    famousPeople(rows)
  })

//   client.query("SELECT * FROM famous_people WHERE first_name = $1", [process.argv[2]], (err, result) => {
//     if (err) {
//       return console.error("error running query", err);
//     }
//     console.log(result.rows); //output: 1
//     client.end();
//   });
// });

// console.log("After execution of the queries");

