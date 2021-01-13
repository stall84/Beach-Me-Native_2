export const ADD_CORDS = 'ADD_CORDS';
export const ADD_SEARCH_BEACHES = 'SEARCH_BEACHES';
export const RESET_APP = 'RESET_APP';







export const addCords = (lat, lng) => {
    return async dispatch => {        
        const response = await fetch('http://192.168.1.220:5005/api/v1/beaches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lat: lat,
                lng: lng
            })
        })
        const resData = await response.json();
        const responseTrips = await fetch('http://192.168.1.220:5005/api/v1/get-trips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lat: lat,
                lng: lng,
                searchBeaches: resData.data
            })
        })
        const resTrips = await responseTrips.json();
        const responseForecasts = await fetch('http://192.168.1.220:5005/api/v1/get-weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fiveBeaches: resTrips.data
            })
        })
        const resForecasts = await responseForecasts.json();
            dispatch({
                type: ADD_CORDS,
                payload: {
                    latitude: lat,
                    longitude: lng,
                    searchBeaches: resData.data,
                    beaches: resTrips.data,
                    forecasts: resForecasts.data
                }
            });             
    }   
};

export const resetApp = () => {
    return {
        type: RESET_APP,
        payload: {
            latitude: null,
            longitude: null,
            searchBeaches: null,
            beaches: null,
            forecasts: null
        }
    }
};


