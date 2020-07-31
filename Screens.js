import * as React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { colors } from './utils';

const Screen = ({ label, backgroundColor, navigation }) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <OpenDrawerButton navigation={navigation} />
      <Text style={{ fontSize: 42 }}>{label}</Text>
    </SafeAreaView>
  );
};

const OpenDrawerButton = ({ navigation }) => (
  <AntDesign
    hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
    onPress={() => navigation.openDrawer()}
    name='menufold'
    size={32}
    color='#222'
    style={{ position: 'absolute', top: 20, right: 0, padding: 20 }}
  />
);

export function GetStartedScreen({ navigation }) {
  return (
    <Screen
      backgroundColor={colors[0]}
      label={'GetStarted Screen'}
      navigation={navigation}
    />
  );
}
export function FeaturesScreen({ navigation }) {
  return (
    <Screen
      backgroundColor={colors[1]}
      label={'Features Screen'}
      navigation={navigation}
    />
  );
}
export function ToolsScreen({ navigation }) {
  return (
    <Screen
      backgroundColor={colors[2]}
      label={'Tools Screen'}
      navigation={navigation}
    />
  );
}
export function ServicesScreen({ navigation }) {
  return (
    <Screen
      backgroundColor={colors[3]}
      label={'Services Screen'}
      navigation={navigation}
    />
  );
}
export function PortfolioScreen({ navigation }) {
  return (
    <Screen
      backgroundColor={colors[4]}
      label={'Portfolio Screen'}
      navigation={navigation}
    />
  );
}
export function CareersScreen({ navigation }) {
  return (
    <Screen
      backgroundColor={colors[5]}
      label={'Careers Screen'}
      navigation={navigation}
    />
  );
}
export function ContactScreen({ navigation }) {
  return (
    <Screen
      backgroundColor={colors[6]}
      label={'Contact Screen'}
      navigation={navigation}
    />
  );
}
