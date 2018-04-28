import axios from "axios";
import {MOVIES, HALLS, REVENUE_BY_HALL, REVENUE_BY_MOVIE} from './revenueTypes';

/* Movies APIs */
export const getRevenueByMovie = (movieId) => async dispatch => {
    const res = await axios.get('/revenues/getRevenueByMovie',
                                { params: { movieId: movieId }});
    // If data was found then only update the redux
    if ('result' in res.data) {
      dispatch({ type: REVENUE_BY_MOVIE, payload: res.data.result });
    } else {
      dispatch({ type: REVENUE_BY_MOVIE, payload: {} });
    }
};

export const getAllMovies = () => async dispatch => {
    const res = await axios.get('/revenues/getAllMovies');
    dispatch({ type: MOVIES, payload: res.data.result });
};

/* Movie Halls APIs */
export const getRevenueByHall = (hallId) => async dispatch => {
    const res = await axios.get('/revenues/getRevenueByHall',
                                { params: { hallId: hallId }});
    // If data was found then only update the redux
    if ('result' in res.data) {
      dispatch({ type: REVENUE_BY_HALL, payload: res.data.result });
    } else {
      dispatch({ type: REVENUE_BY_HALL, payload: {}});
    }
};

export const getAllMovieHalls = () => async dispatch => {
    const res = await axios.get('/revenues/getAllMovieHalls');
    dispatch({ type: HALLS, payload: res.data.result });
};
