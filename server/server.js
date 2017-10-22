const path = require('path');

const express = require('express');

const clientPath = path.join(__dirname, '..', 'build');
const app = express();



app.use(express.static(clientPath));

app.listen(1337, () => {
  console.log('Server listening on port 1337');
});