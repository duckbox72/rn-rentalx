import React, { useEffect } from 'react';

import BrandSvg from '../../assets/brand.svg'
import LogoSvg from '../../assets/logo.svg'

// useSharedValue works similar to 'useState' for animations
import 
  Animated, { 
    useSharedValue, 
    useAnimatedStyle,
    withTiming, // promotes a 'smooth' transition
    Easing, // controls animation behavior within duration
    interpolate,
    Extrapolate,
  } from 'react-native-reanimated';

import {
  Container,
} from './styles';


export function Splash() {
  const splashAnimation = useSharedValue(0)

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value,
        [0, 50], // STEPS
        [1, 0],  // OPACITY
      ),
      transform: [
        {
          translateX: interpolate(splashAnimation.value, 
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, .3, 1],),
      transform: [
        {
          translateX: interpolate(splashAnimation.value, 
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  });

  useEffect(() => {
    splashAnimation.value = withTiming(
      50,
      { duration: 1000}
    );
  }, [])

  return (
    <Container>
      <Animated.View style={[brandStyle, {position: 'absolute'}]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyle, {position: 'absolute'}]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}
