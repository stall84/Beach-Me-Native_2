
import { ADD_CORDS, 
         ADD_SEARCH_BEACHES } from '../actions/appActions';

const initialState = {
    latitude: 0,
    longitude: 0,
    searchBeaches: ['TestBeach'],
    beaches: null,
    forecasts: null,
    day: null
};


const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_CORDS:
            return {
                ...state,
                latitude: action.payload.latitude,
                longitude: action.payload.longitude
            }
        case ADD_SEARCH_BEACHES:
            return {
                ...state,
                searchBeaches: action.payload.searchBeaches
            }    
            default: 
            return state;
    }
} 

export default appReducer;