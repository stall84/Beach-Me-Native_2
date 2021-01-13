export const ADD_CORDS = 'ADD_CORDS';
export const ADD_SEARCH_BEACHES = 'SEARCH_BEACHES';
export const RESET_APP = 'RESET_APP';
export const SET_DAY = 'SET_DAY';






export const addCords = (lat, lng) => {
    return async dispatch => {
        try {
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
            if (!response.ok) {
                throw new Error('Error posting/retrieving get-beaches endpoint');
            }
            const resData = await response.json();
            console.log(resData.data)
            const responseTrips = await fetch('http://192.168.1.220:5005/api/v1/get-trips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    reduxLat: lat,
                    reduxLng: lng,
                    searchBeaches: resData.data
                })
            })
            if (!responseTrips.ok) {
                throw new Error('Error posting/retrieving get-trips endpoint');
            }
            const resTrips = await responseTrips.json();
            console.log(resTrips.data)
            const responseForecasts = await fetch('http://192.168.1.220:5005/api/v1/get-weather', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fiveBeaches: resTrips.data
                })
            })
            if (!responseForecasts.ok) {
                throw new Error('Error posting/retrieving get-weather endpoint');
            }
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
        } catch (error) {
            console.log('Error Retrieving Beach, Trip and/or Weather Data from Beach_Me API: ' + error)
            throw error;
        }        
                     
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

export const setDay = (day) => {

    return {
        type: SET_DAY,
        payload: {
            day: day
        }
    }
};


