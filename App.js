/*****  BASE IMPORTS  *****/
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
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
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
/*************************************/

/*****  APP COMPONENTS  *****/
import LoadingScreen from './screens/LoadingScreen';
import Main from './screens/Main';
/*************************************/

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
    <Provider store={store}>
        <Main />
    </Provider> 
    ) : <LoadingScreen />
    

}

const styles = StyleSheet.create({
  
});

export default App;