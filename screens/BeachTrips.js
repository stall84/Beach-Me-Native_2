import React from 'react'
import { StyleSheet, Text, View, Button, ActivityIndicator, FlatList, Pressable } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { resetApp } from '../store/actions/appActions';



const BeachTripsComponent = props => {

    const dispatch = useDispatch();
    const beachTrips = useSelector(state => state.reducer.beaches);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>BEACH-TRIPS!</Text>
            <Button title="Start Over" onPress={() => {
                                        dispatch(resetApp())
                                        props.resetHandler()} }/>
        </View>
    )
}

const BeachTrips = props => {

    const beachTrips = useSelector(state => state.reducer.beaches);
    const forecasts = useSelector(state => state.reducer.forecasts);

    let content = <BeachTripsComponent {...props} />

    if (!forecasts) {
        content = <ActivityIndicator size="large" color="#00ff00"/>
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
      title: {
        fontFamily: 'Rubik-Mono',
        fontSize: 35,
      },
})

export default BeachTrips
