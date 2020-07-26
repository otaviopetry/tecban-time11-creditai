const express = require('express');

const routes = require('./routes/routes');

const app = express();

app.use(routes);

app.listen(3333, () => {
  // console
  console.log('🚀 Server has started on port 3333. Go Team 11!');
})