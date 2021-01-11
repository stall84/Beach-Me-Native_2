import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const LoadingScreen = () => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>LOADING BEACH ME!!!</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 42,
        color: 'red'
    }
})

export default LoadingScreen;