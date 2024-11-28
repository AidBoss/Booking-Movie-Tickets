import { Request, Response } from 'express';
import mongoose from 'mongoose';
import movieServices from '../../services/admin/movie.services';
import { IMovieCreate } from '../../dto/movie.dto';

const getAllMovie = async (req: Request, res: Response): Promise<void> => {
   const result = await movieServices.getAllMovies();
   res.status(result.status).json({ message: result.message, data: result.data });
}

const getMovieById = async (req: Request, res: Response): Promise<void> => {
   const movieId = req.params.id;
   const result = await movieServices.getMovieById(movieId);
   if (result.status === 200) {
      res.status(result.status).json({ message: result.message, data: result.data })
   }
   res.status(result.status).json({ message: result.message, })
}

const createMovie = async (req: Request, res: Response): Promise<void> => {
   const { title, description, duration, genre, releaseDate, director, studio } = req.body;
   const data: IMovieCreate = { title, description, duration, genre, releaseDate, director, studio }
   const result = await movieServices.createMovie(data)
   if (result.status === 200) {
      res.status(result.status).json({ message: result.message, data: result.data });
   }
   res.status(result.status).json({ message: result.message });
}

const deleteMovie = async (req: Request, res: Response): Promise<void> => {
   const movieId = req.params.id;
   if (!mongoose.isValidObjectId(movieId)) {
      res.status(400).json({ message: "ID không h��p lệ" });
      return;
   }
   const result = await movieServices.deleteMoive(movieId);
   res.status(result.status).json({ message: result.message });
}
export default {
   getAllMovie,
   getMovieById,
   createMovie,
   deleteMovie
}