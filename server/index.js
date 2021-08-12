
import express from 'express';
import indexRoutes from './routes/index.routes'
import imageRoutes from './routes/images.routes'
import morgan from 'morgan';

import './database';

const app = express();
//MIDLEWEARE
app.use(morgan('dev'))

app.set('port', process.env.PORT || 5000);
app.use(indexRoutes)
app.use(imageRoutes)

app.listen(app.get('port'))
console.log('Server listening on port', app.get('port'));