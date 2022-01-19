import React, { useEffect, useState } from 'react';
import { useNavigation} from '@react-navigation/native';

import { FlatList, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Logo from '../../assets/logo.svg';

import { api } from '../../services/api';
import { Car } from '../../components/Car';

import {
  CarList,
  Container,
  Header,
  HeaderContent,
  TotalCars,
  MyCarsButton,
  MyCarsButtonWrapper,
} from './styles';
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';
import { useTheme } from 'styled-components';


export function Home() {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  
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
          <TotalCars>
            Total 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      {/* <CarList
        data={cars}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => 
          <Car data={item}  onPress={handleCarDetails} />}
        /> */}
        
      {isLoading ? <Load /> :
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

      <MyCarsButtonWrapper>
        <GestureHandlerRootView>
          <MyCarsButton onPress={handleMyCars}>
            <Ionicons 
              name="ios-car-sport" 
              size={32}
              color={theme.colors.shape}
            />
          </MyCarsButton>
        </GestureHandlerRootView>  
      </MyCarsButtonWrapper>
    </Container>
  );
}