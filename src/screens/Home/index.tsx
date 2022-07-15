import React, { useEffect, useState } from 'react';
import { useNavigation} from '@react-navigation/native';

import { FlatList, StatusBar, BackHandler } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { api } from '../../services/api';
import { Car } from '../../components/Car';

import { CarDTO } from '../../dtos/CarDTO';
import { LoadAnimation } from '../../components/LoadAnimation';


import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
} from './styles';


export function Home() {

  const navigation = useNavigation<any>();
  
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const handleCarDetails = (car: CarDTO) => {
    navigation.navigate('CarDetails', { car })
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
    </Container>
  );
}
