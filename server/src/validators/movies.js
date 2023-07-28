import {check, param} from 'express-validator'
import { validateResults } from '../utils/handleValidator.js'

const validatorMoviesByTitle =[
    param('title').exists().notEmpty(),
    (req, res, next)=> validateResults(req, res, next)
]

const validatorMoviesById = [
    param('id').exists().notEmpty().isNumeric(),
    (req, res, next)=> validateResults(req, res, next)
]

export {validatorMoviesByTitle, validatorMoviesById}