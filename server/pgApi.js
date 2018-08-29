const { Pool } = require('pg');

const pool = new Pool({
  user: 'tonykijak',
  host: 'localhost',
  database: 'mvp',
  password: 'secretpassword',
  port: 5432,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const postgresConnect = function connectToPostgresAndExecuteQuery(query, cb) {
  pool.connect().then((client) => {
    return client.query(query)
      .then((res) => {
        client.release();
        cb(res.rows);
      })
      .catch((err) => {
        client.release();
        console.error(err);
      });
  });
};

const pgDb = {
  selectById: (id, cb) => {
    const query = `SELECT rooms.id as room_id, rooms.name, photos.url as photo_url, photos.description FROM rooms INNER JOIN photos ON (rooms.id = photos.room_id) WHERE rooms.id=${id}`;
    postgresConnect(query, cb);
  },
  selectByName: (name, cb) => {
    const query = `SELECT rooms.id as room_id, rooms.name, photos.url as photo_url, photos.description FROM rooms INNER JOIN photos ON (rooms.id = photos.room_id) WHERE rooms.name='${name}'`;
    postgresConnect(query, cb);
  },
  insertRow: (row, cb) => {
    const query = `INSERT INTO rooms (id, name) VALUES (${row.id},'${row.name}')`;
    postgresConnect(query, cb);
  },
};

module.exports = pgDb;
