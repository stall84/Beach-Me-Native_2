import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

/*****  Custom Components  *****/


/*****  React-Redux and Application Redux Dependencies *****/
import { useSelector, useDispatch } from 'react-redux';
import { addCords } from '../store/actions/appActions';






const Main = props => {

    /*****  State Hooks  *****/
    const [appReset, setAppReset] = useState(false);
    /*****  Redux Hooks  *****/
    const dispatch = useDispatch();
    const lat = useSelector(state => state.reducer.latitude);
    const lng = useSelector(state => state.reducer.longitude);
    
    
    
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>BEACH-ME!!</Text>
            <View>
                <Button title="Add Cords" 
                        onPress={() => {
                            dispatch(
                                addCords(33.5555, -88.3253)
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

export default Main
