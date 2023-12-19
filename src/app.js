import express from 'express';

import indexRouter from './api/components/router.js';
import config from './api/config/config.js';
import NodeCache from 'node-cache';

const myCache = new NodeCache({ stdTTL: 20 });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', indexRouter);

app.all('*', (req, res, next) => {
  next(new ExpressError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// global error handler
app.use((err, req, res, next) => {
  console.log('Inside Error handling');
  res.status(err.status).send({
    error: {
      status: err.status || 500,
      msg: err.message || 'Internal Server Error',
      data: err.stack,
    },
  });
});

const port = config.port;
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
