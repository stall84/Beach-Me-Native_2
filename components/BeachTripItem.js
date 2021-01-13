import React from 'react'
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native'

import { useSelector } from 'react-redux';

const ForecastsBlock = (props) => {
    const forecasts = useSelector(state => state.reducer.forecasts);
    const beachForecast = forecasts[props.useKey];
    
        return (
            <View style={styles.forecastGrid}>
                <Text>{beachForecast.city.name}</Text>
                <Text>{beachForecast.list[8].weather[0].description}</Text>
                <Text>{beachForecast.list[16].weather[0].description}</Text>
                <Text>{beachForecast.list[24].weather[0].description}</Text>
            </View>
        )
}

const renderGridItem = (itemData) => {
    return (
        <View style={styles.container}>
            <Text style={styles.beachName}>{itemData.item.name}</Text>
            
            <ForecastsBlock useKey={itemData.index}/>
        </View>
        );
};

const BeachTripItem = props => {

    const beachTrips = useSelector(state => state.reducer.beaches);
    const forecasts = useSelector(state => state.reducer.forecasts)
    return (
        <FlatList
        style={styles.flatlist}
        data={beachTrips}
        renderItem={renderGridItem}
        />
    )
}



const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatlist: {
        paddingTop: 50,
        width: 340
    },
    forecastGrid: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    beachName: {
        fontSize: 20,
        fontFamily: 'Karla-Reg'
    }
})

export default BeachTripItem;
