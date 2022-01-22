import React, { useEffect, useState } from 'react';
import { useNavigation} from '@react-navigation/native';

import { FlatList, StatusBar, StyleSheet, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { GestureHandlerRootView, RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler, // hook for PangestureHandler
  withSpring, 
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import Logo from '../../assets/logo.svg';

import { api } from '../../services/api';
import { Car } from '../../components/Car';

import { CarDTO } from '../../dtos/CarDTO';
import { LoadAnimation } from '../../components/LoadAnimation';
import { useTheme } from 'styled-components';


import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
} from './styles';


export function Home() {

  const navigation = useNavigation<any>();
  const theme = useTheme();

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value},
        { translateY: positionY.value},
      ],
    }
  })

  // hadles users drag and drop event (animated button)
  const onGestureEvent = useAnimatedGestureHandler({
    onStart(event, ctx: any) {
      ctx.positionX = positionX.value
      ctx.positionY = positionY.value
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX
      positionY.value = ctx.positionY + event.translationY
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });
  
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const handleCarDetails = (car: CarDTO) => {
    navigation.navigate('CarDetails', { car })
  }
  
  const handleMyCars = () => {
    navigation.navigate('MyCars');
  }
  
  useEffect(() => {
    
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCars();
  }, []);

  useEffect(() => {
    // Will prevent back button press on ANDROID
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

  return (
    <Container>
      <StatusBar 
        barStyle='light-content' // ANDROID
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />
          {!isLoading && 
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          }
        </HeaderContent>
      </Header>
        
      {isLoading ? <LoadAnimation /> :
        <FlatList 
          data={cars}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => 
            <Car data={item}  onPress={() => handleCarDetails(item)} />}

          contentContainerStyle={{
            padding: 24,
          }}
          showsVerticalScrollIndicator={false}
        />
      }

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22,
            }
          ]}
        >
          <GestureHandlerRootView>
            <ButtonAnimated 
              onPress={handleMyCars}
              style={[styles.button, { backgroundColor: theme.colors.main }]}
            >
              <Ionicons 
                name="ios-car-sport" 
                size={32}
                color={theme.colors.shape}
              />
            </ButtonAnimated>
          </GestureHandlerRootView>  
        </Animated.View>
      </PanGestureHandler>


    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});