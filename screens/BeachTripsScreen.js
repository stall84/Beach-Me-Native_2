import React from 'react'
import { StyleSheet, Text, View, Button, ActivityIndicator, FlatList, Pressable, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { resetApp } from '../store/actions/appActions';

import BeachTripsComponent from '../components/BeachTripsComponent';

const BeachTripsScreen = props => {

    const beachTrips = useSelector(state => state.reducer.beaches);
    const forecasts = useSelector(state => state.reducer.forecasts);

    let content = <BeachTripsComponent {...props} />

    if (!forecasts) {
        content = <View style={styles.loadingMsg}>
                    <ActivityIndicator size="large" color="#00ff00"/>
                    <Text style={styles.title}>One sec while we grab your escape routes! ...</Text>
                  </View> 
    }

    return (
        <View style={styles.screen}>
        {content}
        </View>
    )
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      loadingMsg: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: '#fff',     
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: {
        fontFamily: 'Raleway-Med',
        fontSize: 26,
        textAlign: 'center',
      },
})

export default BeachTripsScreen;
