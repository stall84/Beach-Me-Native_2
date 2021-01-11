



const initialState = {
    latitude: 33.771,
    longitude: -84.352,
    searchBeaches: null,
    beaches: [{beachName: 'Tybee'}, {beachName: 'Fernandina'}, {beachName: 'Jekyl'}],
    forecasts: null,
    day: null
};


const beachReducer = (state = initialState, action) => {
    return state;
} 

export default beachReducer;