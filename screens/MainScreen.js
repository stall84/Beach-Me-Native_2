import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Modal, Dimensions } from 'react-native'
import * as Location from 'expo-location';

import { THEMES } from '../assets/styles/themes';

/*****  Custom Components  *****/

/*****  React-Redux and Application Redux Dependencies *****/
import { useSelector, useDispatch } from 'react-redux';
import { addCords, setDay } from '../store/actions/appActions';






const MainScreen = props => {

    /*****  State Hooks  *****/
    const [location, setLocation] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [validatedInput, setValidatedInput] = useState(null);
    const [enteredText, setEnteredText] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const [validateMsg, setValidateMsg] = useState(null);
    const [geoLocation, setGeoLocation] = useState(null);
    /*****  Redux Hooks  *****/
    const dispatch = useDispatch();
    const lat = useSelector(state => state.reducer.latitude);
    const lng = useSelector(state => state.reducer.longitude);
    
    // Setting Date to Store for Weather Forecasts
    const today = new Date();
    useEffect(() => {
        console.log('date useEffect ran');
        let day = today.getDay();
        dispatch(
            setDay(day)
        );
    }, []);

    const modalInputHandler = () => {
        const regex = /(^[\w\s]+,\s\w{2}$)|(^\d{5}$)/;
        if (regex.test(enteredText) == false) {
            setValidateMsg('Please make sure your input matches the format: City, ST like Reno, NV or a 5 digit U.S. ZipCode like 89501');
            setEnteredText('');
        } else {
            setValidatedInput(enteredText);
            setEnteredText('');
            setModalVisible(false);
        }
    };

    const onPressHandler = () => {
        console.log('PressHandler fired')
        if (location) {
            dispatch(addCords(userLat, userLng));
            props.onDisplayBeaches(true);
        } else {
            props.onDisplayBeaches(false);
            setModalVisible(true);
        }
    };


    useEffect(() => {
        console.log('geoLocation useEffect ran');
        ( async () => {
            console.log('geocodeLocation useCallback ran');
            let geoLoc = await Location.geocodeAsync(validatedInput);
            console.log(geoLoc);
            setGeoLocation(geoLoc);
            dispatch(addCords(geoLoc[0].latitude, geoLoc[0].longitude));
            props.onDisplayBeaches(true);
        }
    )();
    }, [validatedInput]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
            console.log('getCurrPosition useEffect ran');
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);
    
    let locationStatus = null;
    let userLat = null;
    let userLng = null;
    if (errorMsg) {
        locationStatus = errorMsg;
    } else if (location) {
        userLat = location.coords.latitude;
        userLng = location.coords.longitude;
    } 

    return (
        <View style={styles.screen}>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Close This?', 'Cool?', [{text: 'Cool', style: 'default' }])
                }}
             >
            <View style={styles.modalScreen}>
                <Text style={styles.displayText}> Off-the-Grid?? .. No prob, We've got you covered! 
                        Just enter any U.S. City, State combo OR Zipcode to get Beached</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input}
                            blurOnSubmit
                            autoCorrect={false}
                            onChangeText={setEnteredText}
                            value={enteredText}  />
                </View>
                <Text style={styles.modalMsg}>{validateMsg}</Text>
            </View>
            <View style={styles.modalBtnContainer}>
                <Button style={styles.modalBtn} title="Let's Go!" 
                    onPress={modalInputHandler}
                    />
            </View>
            </Modal>

            <Text style={styles.title}>BEACH-ME!</Text>
            <View>
                <Button title="Go To Escape Plans" 
                        onPress={() => {
                            onPressHandler()}
                            }/>
                <Text style={styles.display}>
                    Ready to get away?
                </Text>
            </View>
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
        marginBottom: 20,
      },
      display: {
          fontFamily: 'Karla-Reg',
          fontSize: 20
      },
      modalScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    displayText: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 24,
        color: THEMES.thistle,
        textAlign: 'center',
        padding: 15,
    },
    modalMsg: {
        padding: 15,
        fontFamily: 'Raleway-BoldItalic',
        textAlign: 'center',
        fontSize: 20,
        color: THEMES.red1,
    },
    inputContainer: {
        flexDirection: 'row',
        width: Dimensions.get('window').width / 1.05,
        justifyContent: 'center',
    },
    input: {
        backgroundColor: 'grey',
        width: 300,
        height: 80,
        textAlign: 'center'
    },
    modalBtnContainer: {
        height: 70,
    },
    modalBtn: {
        fontFamily: 'Raleway-BoldItalic',
    }
})

export default MainScreen;
