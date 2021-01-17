import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Modal, Dimensions } from 'react-native'
import * as Location from 'expo-location';

import { THEMES } from '../assets/styles/themes';

/*****  Custom Components  *****/
import Card from '../components/Card';
import MainButton from '../components/MainButton';
/*****  React-Redux and Application Redux Dependencies *****/
import { useDispatch } from 'react-redux';
import { addCords, setDay } from '../store/actions/appActions';






const MainScreen = props => {

    /*****  State Hooks  *****/
    const [location, setLocation] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [validatedInput, setValidatedInput] = useState('');
    const [enteredText, setEnteredText] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [validateMsg, setValidateMsg] = useState(null);
    /*****  Redux Hooks  *****/
    const dispatch = useDispatch();

    
    // Setting Date to Store for Weather Forecasts
    const today = new Date();
    useEffect(() => {
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
        if (location) {
            dispatch(addCords(userLat, userLng));
            props.onDisplayBeaches(true);
        } else {
            props.onDisplayBeaches(false);
            setModalVisible(true);
        }
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
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

    useEffect(() => {
    
        ( async () => {
            let geoLoc = await Location.geocodeAsync(validatedInput);
            if (!geoLoc[0].latitude) {
                return;
            }
            dispatch(addCords(geoLoc[0].latitude, geoLoc[0].longitude));
            props.onDisplayBeaches(true);
        })();
    }, [validatedInput]);

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
                <Card style={styles.modalCard}>
                <Text style={styles.displayText}> Off-the-Grid? No prob, We've got you covered! 
                        Just enter any U.S. City, State combo OR Zipcode to get Beached</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input}
                            blurOnSubmit
                            placeholder="e.g. Atlanta, GA"
                            autoCorrect={false}
                            onChangeText={setEnteredText}
                            value={enteredText}  />
                </View>
                </Card>
                
                <Text style={styles.modalMsg}>{validateMsg}</Text>
                <MainButton onPress={modalInputHandler}>
                    Let's Go!
                </MainButton>
            </View>
            </Modal>


            {/* <Text style={styles.title}>BEACH-ME!</Text> */}
            <Card style={styles.mainCard}>
                <Text style={styles.mainText}>
                    Once your location is attained from your phone's location services, or from the geocode-input form (if you disallowed location services).
                    A list of the 5 closest beaches by driving time and their associated 3-day weather forecast will be rendered for you.
                    Simply click on the beach-name of your choice to be taken to detailed directions!
                </Text>
            </Card>
            <View>
                <Text style={styles.btnDesc}>
                    Ready to get away?
                </Text>
                <MainButton onPress={onPressHandler}>
                    Go To Escape Plans
                </MainButton>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEMES.sand2a,
        alignItems: 'center',
        justifyContent: 'space-evenly',
      },
      title: {
        color: THEMES.blue2,
        fontFamily: 'Rubik-Mono',
        fontSize: 45,
        textShadowColor: THEMES.mauve2,
        textShadowOffset: {width: 3, height: 3},
        textShadowRadius: 6,
      },
      btnDesc: {
          textAlign: 'center',
          fontFamily: 'Karla-Reg',
          fontSize: 20,
          marginBottom: 10,
      },
      modalScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEMES.sand1
    },
    mainCard: {
        backgroundColor: THEMES.sand1, 
        marginHorizontal: 5,
    },
    mainText: {
        fontSize: 18,
        fontFamily: 'Karla-XLite',
        textAlign: 'center'
    },
    modalCard: {
        backgroundColor: THEMES.sand2,
        justifyContent: 'space-evenly',
        height: 350,
    },
    displayText: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 24,
        color: THEMES.smaltBlue,
        textAlign: 'center',
        padding: 15,
    },
    modalMsg: {
        padding: 15,
        fontFamily: 'Raleway-SemiBold',
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
        backgroundColor: THEMES.lightGrey,
        borderWidth: 0.7,
        fontFamily: 'Raleway-Med',
        fontSize: 18,
        color: THEMES.red1,
        width: 300,
        height: 44,
        textAlign: 'center'
    },
    modalBtnContainer: {
        height: 74,
    },
    modalBtn: {
        fontFamily: 'Raleway-BoldItalic',
    }
})

export default MainScreen;
