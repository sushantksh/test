import {MOVIES, HALLS, REVENUE_BY_HALL, REVENUE_BY_MOVIE} from '../actions/revenueTypes';

const initialState = {
    movies: [],
    halls: [],
    revenueByMovie: {},
    revenueByHall: {}
}
export default function(state = initialState, action) {

    switch (action.type) {
        case MOVIES:
            state= {
                ...state,
                movies: action.payload
            };
            break;

        case HALLS:
            state= {
                ...state,
                halls:action.payload
            };
            break;

        case REVENUE_BY_HALL:
            state= {
                ...state,
                revenueByHall : action.payload
            };
            break;
            
        case REVENUE_BY_MOVIE:
            state= {
                ...state,
                revenueByMovie : action.payload
            };
            break;

        default:
            return state;
    }
    return state;
}
