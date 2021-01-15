import React from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'



const Header = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/beach-me-app-header-1.png')} />
        </View>
    );
};



const styles = StyleSheet.create({

    container: {
        height: 160,
        width: Dimensions.get('window').width,
    }
});

export default Header;
