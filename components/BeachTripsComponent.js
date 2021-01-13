import React from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { resetApp } from '../store/actions/appActions';

import BeachTripItem from './BeachTripItem';
import WeatherItem from './WeatherItem';



const BeachTripsComponent = props => {



    const dispatch = useDispatch();
    const beachTrips = useSelector(state => state.reducer.beaches);

    

    return (
        <View style={styles.screen}>
            <BeachTripItem />
            
            <Button title="Start Over" onPress={() => {
                                        dispatch(resetApp())
                                        props.resetHandler()} }/>
        
        </View>
    );
};



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
      listView: {
          flex: 1,
          marginTop: 30,
      }
});

export default BeachTripsComponent;
