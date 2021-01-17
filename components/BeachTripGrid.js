import React from 'react'
import { StyleSheet, Text, View, Pressable, FlatList, Linking, Dimensions } from 'react-native'

import { useSelector } from 'react-redux';
import { THEMES } from '../assets/styles/themes';
import { timeConverter } from '../utilities/utilities';


import ForecastBlock from './ForecastBlock';


const BeachTripGrid = props => {

    const beachTrips = useSelector(state => state.reducer.beaches);
    const { latitude, longitude } = useSelector(state => state.reducer);

    const renderGridItem = (itemData) => {

        return (
            <View style={styles.gridItemContainer} >
                <Pressable onPress={() => { Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${itemData.item.name}&travelmode=driving`)}}>
                    <View style={styles.topContainer}>
                        <Text style={styles.beachName}>{itemData.item.name}</Text>
                        <Text style={styles.duration}>{timeConverter(itemData.item.dur)}</Text>
                    </View>
                </Pressable>
                <View style={styles.bottomContainer}>
                    <ForecastBlock useKey={itemData.index}/>
                </View>
            </View>
            );
    };
    

    return (
        <FlatList
        style={styles.flatlist}
        data={beachTrips}
        renderItem={renderGridItem}
        keyExtractor={item => (item.dur).toString()}
        />
    )
}



const styles = StyleSheet.create({
    gridItemContainer: {
        alignItems: 'center',
        flex: 1,
        margin: 17,
        height: 300,
        shadowColor: THEMES.blue1,
        shadowOpacity: 0.27,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 10,
        elevation: 4,
        backgroundColor: THEMES.sand1,        
    },
    flatlist: {
        flex: 1,
        backgroundColor: THEMES.mauve2,
        width: Dimensions.get('window').width,
    },
    topContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    beachName: {
        fontSize: 28,
        fontFamily: 'Karla-Reg',
        color: THEMES.blue2
    },
    duration: {
        fontSize: 22,
        fontFamily: 'Raleway-SemiBold',
        color: THEMES.blue2
    },
    bottomContainer: {
        marginTop: 30,
        flexDirection: 'row',
        shadowColor: THEMES.sadle,
        shadowOffset: { width: 1, height: 1},
        shadowRadius: 10,
        shadowOpacity: 0.5,
    }
})

export default BeachTripGrid;
