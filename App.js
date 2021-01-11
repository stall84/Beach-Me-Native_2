import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

/****  EXPO COMPONENTS ****/
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

/****  REDUX COMPONENTS/CONFIG  ****/
import beachReducer from './store/reducers/beachReducer';
import { loadAsync } from 'expo-font';

const rootReducer = combineReducers({
  beach: beachReducer,
})
const store = createStore(rootReducer);
/************************************/

import LoadingScreen from './screens/LoadingScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'Rubik-Mono': require('./assets/fonts/RubikMonoOne-Regular.ttf'),
    'Karla-Reg': require('./assets/fonts/Karla-Regular.ttf'),
    'Raleway-Med': require('./assets/fonts/Raleway-Medium.ttf')
  });
}


const App = () => {

  const [isAppLoaded, setAppLoaded] = useState(false);

  const appLoading = async () => {
    try {
      // Continue displaying splash-screen until all resources are loaded
      await SplashScreen.preventAutoHideAsync();

      // ... load resources
      await fetchFonts();
    } catch (error) {
      console.log('Error on App Loading: ' + error);
    } finally {
      setAppLoaded(true);
      await SplashScreen.hideAsync();
    }
   
  }

  useEffect(() => {
    appLoading();
  }, []);


  return isAppLoaded ? (
    <View style={styles.container}>
      <Text style={styles.title}>BEACH-ME!!</Text>
    </View>
  ) : <LoadingScreen />;

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Rubik-Mono',
    fontSize: 35,
  }
});

export default App;