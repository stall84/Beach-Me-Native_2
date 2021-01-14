import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'



const Header = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/beach-me-app-header.jpeg')} />
        </View>
    );
};



const styles = StyleSheet.create({

    container: {
        height: 150,
        width: Dimensions.get('window').width,
    }
});

export default Header;
