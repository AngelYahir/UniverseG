if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const app = require('./server');
require('./bd');

app.listen(app.get('port'))
