import React from 'react';
import AppRoutes from './routes';
import AuthProvider from './auth';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

const createFonts = {
  CastoroTitling: require('./assets/fonts/CastoroTitling-Regular.ttf'),
  DancingScript: require('./assets/fonts/DancingScript-Medium.ttf'),
  Foldit: require('./assets/fonts/Foldit-Black.ttf'),
  PoppinsBold: require('./assets/fonts/Poppins-Black.ttf'),
  Ysabeau: require('./assets/fonts/Ysabeau-Black.ttf'),
  Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
};
const Index = () => {
  const [isLoaded] = useFonts(createFonts);
  if (isLoaded) {
    return (
      <Provider store={store}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Provider>
    );
  } else {
    return <StatusBar />;
  }
};
export default Index;
