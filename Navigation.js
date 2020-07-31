import * as React from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {
  GetStartedScreen,
  FeaturesScreen,
  ToolsScreen,
  ServicesScreen,
  PortfolioScreen,
  CareersScreen,
  ContactScreen,
} from './Screens';
import CustomDrawer from './CustomDrawer';

const { width } = Dimensions.get('screen');
const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Drawer.Navigator
        initialRouteName={'GetStarted'}
        drawerStyle={{
          backgroundColor: 'transparent',
          width: 0,
        }}
        overlayColor='transparent'
        drawerType='permanent'
        drawerContent={(props) => {
          return (
            <CustomDrawer
              navigation={props.navigation}
              routes={props.state.routeNames}
              selectedRoute={props.state.routeNames[props.state.index]}
            />
          );
        }}
      >
        <Drawer.Screen name='GetStarted' component={GetStartedScreen} />
        <Drawer.Screen name='Features' component={FeaturesScreen} />
        <Drawer.Screen name='Tools' component={ToolsScreen} />
        <Drawer.Screen name='Services' component={ServicesScreen} />
        <Drawer.Screen name='Portfolio' component={PortfolioScreen} />
        <Drawer.Screen name='Careers' component={CareersScreen} />
        <Drawer.Screen name='Contact' component={ContactScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
