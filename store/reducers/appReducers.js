import { ADD_CORDS, 
         RESET_APP} from '../actions/appActions';

const initialState = {
    latitude: 0,
    longitude: 0,
    searchBeaches: null,
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
                longitude: action.payload.longitude,
                searchBeaches: action.payload.searchBeaches,
                beaches: action.payload.beaches,
                forecasts: action.payload.forecasts
            }
        case RESET_APP:
            return {
                ...state,
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
                searchBeaches: action.payload.searchBeaches,
                beaches: action.payload.beaches,
                forecasts: action.payload.forecasts
            }    
            default: 
            return state;
    }
} 

export default appReducer;