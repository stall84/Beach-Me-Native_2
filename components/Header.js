import React from 'react'
import { StyleSheet, View, Image, Dimensions, Platform } from 'react-native'



const Header = () => {
    if (Platform.OS === 'ios') {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/images/beach-me-header-ios.png')} />
            </View>
        );
    } else if (Platform.OS === 'android') {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/images/beach-me-android-header.png')} />
            </View>
        );
    }
};



const styles = StyleSheet.create({

    container: {
        height: 160,
        width: Dimensions.get('window').width,
    }
});

export default Header;
