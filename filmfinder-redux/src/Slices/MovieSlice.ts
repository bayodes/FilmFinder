import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IMovie } from "../Interfaces/IMovie";
import { IReview } from "../Interfaces/IReview";
import {IUser} from "../Interfaces/IUser";
interface MovieSliceState {
  loading: boolean;
  error: boolean;
  movies?: IMovie[];
  currMovie?: IMovie;
}

const initialMoviesState: MovieSliceState = {
  loading: false,
  error: false,
};

type ReviewContent = {
  rev: IReview,
  userId: number,
  movieId: number,
}

export const getAllMovies = createAsyncThunk(
  "movie/all", 
  async (thunkAPI) => {
  try {
    const res = await axios.get(`http://localhost:8000/movie/all`);
    console.log("List of all movies: " + res.data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
});

export const getCurrMovie = createAsyncThunk(
  "movie/id", 
  async (id: number | string, thunkAPI) => {
  try {
    const res = await axios.get(`http://localhost:8000/movie/${id}`);
    console.log("Movie we get: " + res.data);
    return {
      movieId: res.data.movieId,
      description: res.data.description,
      title: res.data.title,
      genre: res.data.genre,
      image: res.data.image,
      year: res.data.year,
      reviews: res.data.reviews
    };
  } catch (e) {
    console.log(e);
  }
});

export const createReview = createAsyncThunk(
  "review/create", 
  async (reviewContent: ReviewContent, thunkAPI) => {
  try {
    const res = await axios.post(`http://localhost:8000/review/create?userId=${reviewContent.userId}&movieId=${reviewContent.movieId}`, reviewContent.rev);
    console.log("Review created: " + res.data);
    return {
      // movieId: res.data.movieId,
      // description: res.data.description,
      // title: res.data.title,
      // genre: res.data.genre,
      // image: res.data.image,
      // year: res.data.year,
      // reviews: res.data.reviews
    };
  } catch (e) {
    console.log(e);
  }
});

export const MoviesSlice = createSlice({
  name: "movies",
  initialState: initialMoviesState,
  reducers: {
    clearMovies: (state) => {
      state.movies = undefined;
    },
    clearCurrMovie: (state) => {
      state.currMovie = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMovies.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getAllMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(getAllMovies.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });

    builder.addCase(getCurrMovie.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getCurrMovie.fulfilled, (state, action) => {
      state.currMovie = action.payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(getCurrMovie.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const { clearMovies, clearCurrMovie } = MoviesSlice.actions;

export default MoviesSlice.reducer;
