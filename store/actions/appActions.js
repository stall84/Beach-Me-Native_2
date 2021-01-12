export const ADD_CORDS = 'ADD_CORDS';
export const ADD_SEARCH_BEACHES = 'SEARCH_BEACHES';








export const addCords = (lat, lng) => {
    return dispatch => {        
            dispatch({
                type: ADD_CORDS,
                payload: {
                    latitude: lat,
                    longitude: lng
                }
            });             
    }   
};

export const addSearchBeaches = (lat, lng) => {

    
    
    return async dispatch => {
       const response = await fetch('http://localhost:5005/api/v1/beaches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lat: lat,
                lng: lng
            })
        });
        const resData = await response.json();
        console.log(resData);
        dispatch({
            type: ADD_SEARCH_BEACHES,
            payload: {
                searchBeaches: resData.data
            }
        }) 
}
   
};

