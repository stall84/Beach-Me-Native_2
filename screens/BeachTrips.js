import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const BeachTrips = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>BEACH-TRIPS!</Text>
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
