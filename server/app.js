import express from 'express';
const app = express();
import fetch from 'node-fetch';
import cors from 'cors';

app.use(cors());
const temporaryUrl = 'https://restcountries.com/v3.1/all';

var whitelist = ['http://localhost:3001', 'http://localhost:3000']
var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

app.get('/api', cors(corsOptions), (req, res) => {
    fetch(temporaryUrl).then(response=>response.json()).then(data => res.send(data));
    
});

let server = app.listen(3000);
server.setTimeout(500000);