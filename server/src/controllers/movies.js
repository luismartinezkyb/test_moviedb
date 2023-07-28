import { handleHttpError } from "../utils/handleError.js";
import { matchedData } from "express-validator";
import dotenv from 'dotenv'
dotenv.config();
import fetch from 'node-fetch';

const {API_KEY, API_URL } = process.env;

const getMovies = async(req, res)=>{
    try {
        const {page} = req.query || 1;
        const url = `${API_URL}movie/popular?api_key=${API_KEY}&page=${page}`;
        const response = await fetch(url);
        const data = await response.json();
        if(!response){
            handleHttpError(res, 'Error on getting movies');    
            return;
        }
        
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'SOMETHING WENT WRONG ON getMovies')
    }
}

const getMovieById = async(req, res)=>{
    try {
        const {id} = matchedData(req);
        const url = `${API_URL}movie/${id}?api_key=${API_KEY}`;
        const response = await fetch(url);
        
        if(!response.ok){
            handleHttpError(res, 'Movie not found');    
            return;
        }
        const data = await response.json();

        if(!data){
            handleHttpError(res, 'An error has occurred during the parse operation'); 
            return;
        }
        res.status(200).json(data);
        
    } catch (error) {
        handleHttpError(res, 'SOMETHING WENT WRONG ON getMovieById');
    }
}

const getMovieByTitle = async(req, res)=>{
    try {
        const {title} = matchedData(req)
        const url = `${API_URL}search/movie?query=${title}&api_key=${API_KEY}`;
        const response = await fetch(url);
        
        if(!response.ok){
            handleHttpError(res, 'There is not any movie with the specified name');
            return;
        }

        const data = await response.json();
        if(!data){
            handleHttpError(res, 'An error has occurred during the parse operation');
            return;

        }
        
        res.status(200).json(data);

    } catch (error) {
        console.log(error)
        handleHttpError(res, 'SOMETHING WENT WRONG ON getMovieByTitle');
    }
}

export {getMovieByTitle, getMovies, getMovieById}