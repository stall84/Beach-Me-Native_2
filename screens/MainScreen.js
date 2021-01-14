import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

/*****  Custom Components  *****/


/*****  React-Redux and Application Redux Dependencies *****/
import { useSelector, useDispatch } from 'react-redux';
import { addCords, setDay } from '../store/actions/appActions';






const MainScreen = props => {

    /*****  State Hooks  *****/
    const [appReset, setAppReset] = useState(false);
    /*****  Redux Hooks  *****/
    const dispatch = useDispatch();
    const lat = useSelector(state => state.reducer.latitude);
    const lng = useSelector(state => state.reducer.longitude);
    
    // Setting Date to Store for Weather Forecasts
    const today = new Date();
    useEffect(() => {
        let day = today.getDay();
        dispatch(
            setDay(day)
        );
    }, [today]);
    
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>BEACH-ME!!</Text>
            <View>
                <Button title="Add Cords" 
                        onPress={() => {
                            dispatch(
                                addCords(38.5629, -81.4817)
                            )
                            props.onDisplayBeaches()}
                            }/>
                <Text style={styles.display}>
                    Lat: {lat}, Lng: {lng}
                </Text>
            </View>
            <View>
                

            </View>
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
      display: {
          fontFamily: 'Karla-Reg',
          fontSize: 20
      }
})

export default MainScreen;
