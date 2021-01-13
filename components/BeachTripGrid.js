import React from 'react'
import { StyleSheet, Text, View, Pressable, FlatList, Linking, Dimensions, Image } from 'react-native'

import { useSelector } from 'react-redux';
import { THEMES } from '../assets/styles/themes';
import { timeConverter, kelvinConverter, forecastDays } from '../utilities/utilities';


const ForecastsBlock = (props) => {
    const forecasts = useSelector(state => state.reducer.forecasts);
    const beachForecast = forecasts[props.useKey];
    const currDay = useSelector(state => state.reducer.day);
    
        return (
            <View style={styles.forecastGrid}>
                <View style={styles.forecastGridItem} >
                    <Text>{forecastDays(currDay)[0]}</Text>
                    <Text>{beachForecast.list[8].weather[0].description}</Text>
                    <Image resizeMethod="scale" style={styles.iconImg} source={{uri: `https://openweathermap.org/img/wn/${beachForecast.list[8].weather[0].icon}.png`}} />
                </View>
                <View style={styles.forecastGridItem} >
                    <Text>{forecastDays(currDay)[1]}</Text>
                    <Text>{beachForecast.list[16].weather[0].description}</Text>
                    <Image resizeMethod="scale" style={styles.iconImg} source={{uri: `https://openweathermap.org/img/wn/${beachForecast.list[16].weather[0].icon}.png`}} />
                </View>
                <View style={styles.forecastGridItem} >
                    <Text>{forecastDays(currDay)[2]}</Text>
                    <Text>{beachForecast.list[24].weather[0].description}</Text>
                    <Image resizeMethod="scale" style={styles.iconImg} source={{uri: `https://openweathermap.org/img/wn/${beachForecast.list[24].weather[0].icon}.png`}} />
                </View>
            </View>
        )
}


const BeachTripGrid = props => {

    const beachTrips = useSelector(state => state.reducer.beaches);
    const { latitude, longitude } = useSelector(state => state.reducer);

    const renderGridItem = (itemData) => {

        return (
            <View style={styles.gridItem}>
                <Pressable onPress={() => { Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${itemData.item.name}&travelmode=driving`)}}>
                    <View style={styles.topContainer}>
                        <Text style={styles.beachName}>{itemData.item.name}</Text>
                        <Text style={styles.duration}>{timeConverter(itemData.item.dur)}</Text>
                    </View>
                </Pressable>
                <ForecastsBlock useKey={itemData.index}/>
            </View>
            );
    };
    

    return (
        <FlatList
        style={styles.flatlist}
        data={beachTrips}
        renderItem={renderGridItem}
        />
    )
}



const styles = StyleSheet.create({
    gridItem: {
        alignItems: 'center',
        borderWidth: 2,
        flex: 1,
        margin: 15,
        height: 250,
        backgroundColor: THEMES.sand1
    },
    flatlist: {
        backgroundColor: THEMES.mauve3,
        paddingTop: 50,
        width: Dimensions.get('window').width,
    },
    forecastGrid: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 5,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start'
    },
    forecastGridItem: {
        flex: 1,
        alignItems: 'center'
    },
    iconImg: {
        width: 68,
        height: 68,
    },
    topContainer: {
        alignItems: 'center'
    },
    beachName: {
        fontSize: 24,
        fontFamily: 'Karla-Reg'
    },
    duration: {
        fontSize: 20,
        fontFamily: 'Raleway-SemiBold'
    }
})

export default BeachTripGrid;
