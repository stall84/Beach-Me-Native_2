import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

import { useSelector, useDispatch } from 'react-redux';

import { addCords, addSearchBeaches } from '../store/actions/appActions';





const Main = props => {

    const dispatch = useDispatch();

    const lat = useSelector(state => state.reducer.latitude);
    const lng = useSelector(state => state.reducer.longitude);
    // const searchBeach = useSelector(state => state.reducer.searchBeaches)

    useEffect(() => {
    if (lat & lng) {
        dispatch(addSearchBeaches(lat, lng))
    }
    }, [lat, lng])
    
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>BEACH-ME!!</Text>
            <View>
                <Button title="Add Cords" 
                        onPress={() => {
                            dispatch(
                                addCords(33.5555, -88.3253)
                            )}
                            }/>
                <Text style={styles.display}>
                    Lat: {lat}, Lng: {lng}
                </Text>
            </View>
            <View>
                {/* <Button title="Add SearchBeaches" 
                        onPress={() => {dispatch(addSearchBeaches)}} /> */}

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

export default Main
