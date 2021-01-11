export const ADD_CORDS = 'ADD_CORDS';
export const ADD_SEARCH_BEACHES = 'SEARCH_BEACHES';








export const addCords = (lat, lng) => {
    return {
        type: ADD_CORDS,
        payload: {
            latitude: lat,
            longitude: lng
        }
    }
};

export const addSearchBeaches = (searchBeachesArr) => {
    return {
        type: ADD_SEARCH_BEACHES,
        payload: {
            searchBeaches: searchBeachesArr
        }
    };
};

