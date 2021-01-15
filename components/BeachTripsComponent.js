import React from 'react'
import { StyleSheet, Text, View, Button, FlatList, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { resetApp } from '../store/actions/appActions';

import BeachTripGrid from './BeachTripGrid';


const BeachTripsComponent = props => {



    const dispatch = useDispatch();
    const beachTrips = useSelector(state => state.reducer.beaches);

    

    return (
        <View>
            <View style={styles.screen}>
                <BeachTripGrid />       
            </View>
            <View style={styles.buttonContainer}>
            <Button title="Start Over" onPress={() => {
                                        dispatch(resetApp())
                                        props.resetHandler()} }/>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        width: Dimensions.get('window').width,
        flex: 1,
      },
      buttonContainer: {
          borderWidth: 1,
          height: 50,
      },
      title: {
        fontFamily: 'Rubik-Mono',
        fontSize: 35,
      },
});

export default BeachTripsComponent;
