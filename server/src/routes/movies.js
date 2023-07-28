import { Router } from "express";
import { getMovieByTitle, getMovies, getMovieById } from "../controllers/movies.js";
import { validatorMoviesByTitle, validatorMoviesById } from "../validators/movies.js";

const router = Router()

router.get('/', getMovies);
router.get('/id/:id', validatorMoviesById, getMovieById)
router.get('/title/:title', validatorMoviesByTitle, getMovieByTitle)

export default router;