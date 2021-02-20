const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const server = express();
const cors = require('cors');
const morgan = require('morgan');

mongoose.Promise = global.Promise;
server.use(bodyParser.json());

server.use(cors());
server.use(morgan('dev'));

server.listen(3050, () => {
  console.log("Listening on port " + 3050);

  mongoose.connect('mongodb://localhost/user_api_database',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection
      .once('open', () => {

        // Call routes only when the connection with MongoDB works
        require('./routes')(server);

        //Error handling
        server.use((req, res, next) => {
          const error = new Error('Not found');
          error.status = 404;
          next(error);
        })

        server.use((error, req, res, next) => {
          res.status(error.status || 500);
          res.json({
            error: {
              message: error.message
            }
          });
        });


      })
      .on('error', (error) => {
        throw error;
      });
});
