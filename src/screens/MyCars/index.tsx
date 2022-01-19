import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import {
  Container, 
  Header, 
  Title,
  SubTitle,
  Contents,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
} from './styles';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO
}


export function MyCars() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [cars, setCars] = useState<CarProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get(`schedules_byuser?user_id=1`);
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCars();
  }, [])

  return (
    <Container>
      <StatusBar 
        barStyle='light-content' // ANDROID
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <BackButton 
          onPress={() => navigation.goBack()} 
          color={theme.colors.shape} 
        />
    
        <Title>
          Seus agendamentos estão aqui.
        </Title>
        <SubTitle>
          Conforto, segurança e praticidade
        </SubTitle>
      </Header>

      <Contents>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>05</AppointmentsQuantity>
        </Appointments>

        <FlatList 
          data={cars}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Car data={item.car} />
          )}
        />

      </Contents>

    </Container>
  );
}