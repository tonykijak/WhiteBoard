const express = require('express');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 8080;

const app = express();

console.log(path.join(__dirname, '../public'));

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => console.log('Listening on Port ', port));
