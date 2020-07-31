/*
Inspiration: https://dribbble.com/shots/4275765-Realweb-3
Twitter: http://twitter.com/mironcatalin
YouTube: http://youtube.com/c/CatalinMironDev
☕️ BuyMeACoffee: https://www.buymeacoffee.com/catalinmiron
*/

import * as React from 'react';
import {
  StatusBar,
  Animated,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';
import MaskedView from '@react-native-community/masked-view';
import { colors, links } from './utils';
import { useIsDrawerOpen } from '@react-navigation/drawer';

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);
const AnimatedMaskedView = Animated.createAnimatedComponent(MaskedView);

const { width, height } = Dimensions.get('window');
const fromCoords = { x: 0, y: height };
const toCoords = { x: width, y: 0 };

const Button = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Text style={style}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function CustomDrawer({ navigation, selectedRoute, routes }) {
  const isDrawerOpened = useIsDrawerOpen();
  const polygonRef = React.useRef();
  const animatedWidth = React.useRef(new Animated.Value(0)).current;
  const animation = React.useRef(new Animated.ValueXY(fromCoords)).current;
  const animate = (toValue) => {
    const animations = [
      Animated.spring(animation, {
        toValue: toValue === 1 ? toCoords : fromCoords,
        useNativeDriver: true,
        bounciness: 2,
        speed: 10,
      }),
      Animated.timing(animatedWidth, {
        toValue: toValue === 1 ? width : 0,
        duration: 0,
        useNativeDriver: false,
      }),
    ];

    return Animated.sequence(toValue === 1 ? animations.reverse() : animations);
  };

  React.useEffect(() => {
    const listener = animation.addListener((v) => {
      if (polygonRef?.current) {
        polygonRef.current.setNativeProps({
          points: `0,0 ${v.x}, ${v.y} ${width}, ${height} 0, ${height}`,
        });
      }
    });

    return () => {
      animation.removeListener(listener);
    };
  });

  React.useEffect(() => {
    animate(isDrawerOpened ? 1 : 0).start();
  }, [isDrawerOpened]);

  const opacity = animation.x.interpolate({
    inputRange: [0, width],
    outputRange: [0, 1],
  });

  const translateX = animation.x.interpolate({
    inputRange: [0, width],
    outputRange: [-50, 0],
  });

  const onRoutePress = React.useCallback((route) => {
    navigation.navigate(route);
  }, []);

  const onCloseDrawer = React.useCallback((route) => {
    navigation.closeDrawer();
  }, []);

  return (
    <AnimatedMaskedView
      style={[styles.maskedContainer, { width: animatedWidth }]}
      maskElement={
        <Svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ backgroundColor: 'transparent' }}
        >
          <AnimatedPolygon
            ref={polygonRef}
            points={`0,0 ${fromCoords.x}, ${fromCoords.y} ${width}, ${height} 0, ${height}`}
            // points={`0,0 ${toCoords.x}, ${toCoords.y} ${width}, ${height} 0, ${height}`}
            fill='blue'
          />
        </Svg>
      }
    >
      <View style={styles.menuContainer}>
        <AntDesign
          onPress={onCloseDrawer}
          name='close'
          size={32}
          color='white'
          style={{ position: 'absolute', top: 40, right: 30 }}
        />
        <Animated.View
          style={[styles.menu, { opacity, transform: [{ translateX }] }]}
        >
          <View>
            {routes.map((route, index) => {
              return (
                <Button
                  key={route}
                  title={route}
                  style={[
                    styles.button,
                    {
                      textDecorationLine:
                        route === selectedRoute ? 'line-through' : 'none',
                      color: colors[index],
                    },
                  ]}
                  onPress={() => onRoutePress(route)}
                />
              );
            })}
          </View>

          <View>
            {links.map((link, index) => {
              return (
                <Button
                  key={link}
                  title={link}
                  style={[
                    styles.buttonSmall,
                    { color: colors[index + routes.length + 1] },
                  ]}
                  onPress={onCloseDrawer}
                />
              );
            })}
          </View>
        </Animated.View>
      </View>
    </AnimatedMaskedView>
  );
}

const styles = StyleSheet.create({
  maskedContainer: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: '#222',
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  menu: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  button: {
    fontSize: 32,
    color: '#fdfdfd',
    lineHeight: 32 * 1.5,
  },
  buttonSmall: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fdfdfd',
  },
});
