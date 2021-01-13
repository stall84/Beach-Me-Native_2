/*****  BASE IMPORTS  *****/
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
/*************************************/

/*****  EXPO COMPONENTS *****/
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
/*************************************/

/*****  REDUX COMPONENTS/CONFIG  *****/
import appReducer from './store/reducers/appReducers';


const rootReducer = combineReducers({
  reducer: appReducer,
})
const store = createStore(rootReducer, 
  compose(
    applyMiddleware(ReduxThunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);
/*************************************/

/*****  APP COMPONENTS  *****/
import LoadingScreen from './screens/LoadingScreen';
import MainScreen from './screens/MainScreen';
import BeachTripsScreen from './screens/BeachTripsScreen';
/*************************************/

const fetchFonts = () => {
  return Font.loadAsync({
    'Rubik-Mono': require('./assets/fonts/RubikMonoOne-Regular.ttf'),
    'Karla-Reg': require('./assets/fonts/Karla-Regular.ttf'),
    'Raleway-SemiBold': require('./assets/fonts/Raleway-SemiBold.ttf'),
    'Raleway-Med': require('./assets/fonts/Raleway-Medium.ttf')
  });
}


const App = () => {

  const [isAppLoaded, setAppLoaded] = useState(false);
  const [displayBeachTrips, setDisplayBeachTrips] = useState(false);

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
  };

  useEffect(() => {
    appLoading();
  }, []);

  const beachTripsHandler = () => {
    setDisplayBeachTrips(true);
  };

  const resetHandler = () => {
    setDisplayBeachTrips(false);
  };

  let content = <MainScreen onDisplayBeaches={beachTripsHandler} />;

  if (displayBeachTrips) {
    content = <BeachTripsScreen resetHandler={resetHandler} />
  }

  return isAppLoaded ? ( 
    <View style={styles.appContainer}>
      <Provider store={store}>
        {content}
      </Provider>
    </View>
    ) : <LoadingScreen />
    

}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,

  }
});

export default App;