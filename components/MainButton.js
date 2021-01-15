import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { THEMES } from '../assets/styles/themes';

const MainButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>      
    );
};



const styles = StyleSheet.create({

    button: {
        backgroundColor: THEMES.teal1,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        color: 'black',
        fontFamily: 'Karla-Med',
        fontSize: 18,
    },
});


export default MainButton