import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import { useSelector } from 'react-redux';
import { THEMES } from '../assets/styles/themes';

import { forecastDays } from '../utilities/utilities';

const ForecastBlock = (props) => {
    const forecasts = useSelector(state => state.reducer.forecasts);
    const beachForecast = forecasts[props.useKey];
    const currDay = useSelector(state => state.reducer.day);
    
        return (
            <View style={styles.forecastGrid}>
                <View style={styles.forecastGridItem} >
                    <Text style={styles.day}>{forecastDays(currDay)[0]}</Text>
                    <View style={styles.descripContainer}>
                        <Text style={styles.description}>{beachForecast.list[8].weather[0].description}</Text>
                    </View>
                    <View style={styles.iconImgBkgnd}>
                        <Image resizeMethod="scale" style={styles.iconImg} source={{uri: `https://openweathermap.org/img/wn/${beachForecast.list[8].weather[0].icon}.png`}} />
                    </View>
                    <View>
                        <Text style={styles.temp}>{(beachForecast.list[8].main.temp).toFixed()}F</Text>
                    </View>
                </View>
                <View style={styles.forecastGridItem} >
                    <Text style={styles.day}>{forecastDays(currDay)[1]}</Text>
                    <View style={styles.descripContainer}>
                        <Text style={styles.description}>{beachForecast.list[16].weather[0].description}</Text>
                    </View>
                    <View style={styles.iconImgBkgnd}>
                        <Image resizeMethod="scale" style={styles.iconImg} source={{uri: `https://openweathermap.org/img/wn/${beachForecast.list[16].weather[0].icon}.png`}} />
                    </View>
                    <View>
                        <Text style={styles.temp}>{(beachForecast.list[16].main.temp).toFixed()}F</Text>
                    </View>
                </View>
                <View style={styles.forecastGridItem} >
                    <Text style={styles.day}>{forecastDays(currDay)[2]}</Text>
                    <View style={styles.descripContainer}>
                        <Text style={styles.description}>{beachForecast.list[24].weather[0].description}</Text>
                    </View>
                    <View style={styles.iconImgBkgnd}>
                        <Image resizeMethod="scale" style={styles.iconImg} source={{uri: `https://openweathermap.org/img/wn/${beachForecast.list[24].weather[0].icon}.png`}} />
                    </View>
                    <View>
                        <Text style={styles.temp}>{(beachForecast.list[24].main.temp).toFixed()}F</Text>
                    </View>
                </View>
            </View>
        )
}


const styles = StyleSheet.create({
    forecastGrid: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 5,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',

    },
    forecastGridItem: {
        flex: 1,
        alignItems: 'center'
    },
    day: {
        fontSize: 21,
        fontFamily: 'Karla-XBold'
    },
    descripContainer: {
        height: 46,
    },
    description: {
        fontSize: 17,
        fontFamily: 'Raleway-Med',
        textAlign: 'center',
    },
    iconImgBkgnd: {
       backgroundColor: THEMES.grey,
    },
    iconImg: {
        width: 72,
        height: 72,
    },
    temp: {
        fontSize: 24,
        color: THEMES.red1,
        fontFamily: 'Karla-Med'
    }
});

export default ForecastBlock;