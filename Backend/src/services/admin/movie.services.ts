import { IMovie, IMovieCreate, IMovieResponse } from '../../dto/movie.dto';
import Movie from '../../models/movie.model';
import mongoose from "mongoose";
import logger from "../../logs/log.errors";

const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

export const getAllMovies = async (): Promise<IMovieResponse> => {
   try {
      const result = await Movie.find().lean();
      if (result && result.length > 0) {
         return {
            status: 200,
            message: 'Lấy danh sách phim thành công',
            data: result,
         };
      } else {
         return { status: 404, message: 'Không tìm thấy danh sách phim' };
      }
   } catch (e: any) {
      logger.error(`Lỗi khi lấy danh sách phim : ${e.message}`);
      return { status: 500, message: 'Lỗi server' };
   }
}
export const getMovieById = async (id: string): Promise<IMovieResponse> => {
   if (!isValidObjectId(id)) {
      return { status: 404, message: 'ID Không hợp lệ' }
   }
   try {
      const result = await Movie.findById(id).lean();
      if (result) {
         return {
            status: 200,
            message: 'Lấy phim thành công',
            data: [result as IMovie]
         };
      } else {
         return { status: 404, message: 'Không tìm thấy phim' };
      }
   } catch (e: any) {
      logger.error(`Lỗi khi lấy danh sách phim : ${e.message}`);
      return { status: 500, message: 'Lỗi server' };
   }
}
export const createMovie = async (data: IMovieCreate): Promise<IMovieResponse> => {
   try {
      const newMovie = new Movie(data);
      const result = await newMovie.save();
      return {
         status: 200,
         message: 'Tạo phim thành công',
         data: [result as IMovie]
      };

   } catch (e: any) {
      logger.error(`Lỗi khi lấy danh sách phim : ${e.message}`);
      return { status: 500, message: 'Lỗi server' };
   }
}
export const updateMovie = async (data: IMovie): Promise<IMovieResponse> => {
   if (isValidObjectId(data.id)) {
      return { status: 400, message: 'ID phim không hợp lệ' };
   }
   try {
      const result = await Movie.findByIdAndUpdate(data);
      if (result) {
         return { status: 200, message: 'Bạn đã sử thành công' }
      } else {
         return { status: 404, message: 'Cập nhập phim thất bại' };
      }
   } catch (e: any) {
      logger.error(`Lỗi khi lấy danh sách phim : ${e.message}`);
      return { status: 500, message: 'Lỗi server' };
   }
}
export const deleteMoive = async (id: string): Promise<IMovieResponse> => {
   if (isValidObjectId(id)) {
      return { status: 400, message: 'ID phim không hợp lệ' };
   }
   try {
      const result = await Movie.findByIdAndDelete(id);
      if (result) {
         return {
            status: 200, message: 'Xóa phim thành công',
         };
      } else {
         return { status: 404, message: 'Không tìm thấy phim để xóa' };
      }
   } catch (error: any) {
      logger.error(`Xóa thất bại : ${error.message}`);
      return { status: 500, message: 'Lỗi server' };
   }
}
export default {
   getAllMovies,
   getMovieById,
   createMovie,
   updateMovie,

}