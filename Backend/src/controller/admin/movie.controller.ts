import { Request, Response } from 'express';
import mongoose from 'mongoose';
import movieServices from '../../services/admin/movie.services';
import { IMovie, IMovieCreate } from '../../dto/movie.dto';


const getAllMovie = async (req: Request, res: Response): Promise<void> => {
   const result = await movieServices.getAllMovies();
   res.status(result.status).json({ message: result.message, data: result.data });
}
const getMovieById = async (req: Request, res: Response): Promise<void> => {
   const movieId = req.params.id;
   const result = await movieServices.getMovieById(movieId);
   res.status(result.status).json(
      {
         message: result.message,
         data: result.data
      }
   )
}
const createMovie = async (req: Request, res: Response): Promise<void> => {
   const { title, description, duration, genre, releaseDate, director, studio } = req.body;
   const data: IMovieCreate = { title, description, duration, genre, releaseDate, director, studio }
   const result = await movieServices.createMovie(data)
}
export default {
   getAllMovie,
   getMovieById
}