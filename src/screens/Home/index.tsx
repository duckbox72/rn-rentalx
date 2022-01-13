import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { api } from '../../services/api';

import { FlatList, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import {
  CarList,
  Container,
  Header,
  HeaderContent,
  TotalCars,
} from './styles';
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';


export function Home() {
  const navigation = useNavigation<any>();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCarDetails = () => {
    navigation.navigate('CarDetails')
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
            <Car data={item}  onPress={handleCarDetails} />}

          contentContainerStyle={{
            padding: 24,
          }}
          showsVerticalScrollIndicator={false}
        />
      }
    </Container>
  );
}