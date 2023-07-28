//imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config()
import movieRoutes from './routes/movies.js';

//declarations
const port = process.env.PORT || 3001;

//configuration
const app = express();

//middlewares
app.use(cors());
//routes
app.use('/api/movies', movieRoutes);

//listen
app.listen(port, (err, res)=> console.log(`App listening on port http://localhost:${port}`));

//we can do a call api with needle or fetch

// const apiRes = await needle('get', 'https://api.themoviedb.org')
// const data = apiRes.body;
//express-rate-limit apicache
//https://api.themoviedb.org/3/discover/movie
//?api_key=296e298be8c968bec1cc19a88801cb0a