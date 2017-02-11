const app = require('express')();
// const router = require('./src/router');
const configs = require('./src/configs');
const path = require('path');

// routers
// app.use('/', router);

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./src/public/index.html'));
});

// error handlers
app.use((err, req, res, next) => {
  if (err) {
    console.error(err.stack);
  }
});

app.listen(configs.server.port, configs.server.host, () => {
  console.log(`listening at port ${configs.server.port}`);
});
