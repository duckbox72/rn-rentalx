import React,  { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { Alert, StatusBar } from 'react-native';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Button } from '../../components/Button';

import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { getPlatformDate } from '../../utils/getPlatformDate';

import { format } from 'date-fns';
import { api } from '../../services/api';

import {
  Container,
  CarImages,
  Header,
  Contents,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';

interface Params { 
  car: CarDTO;
  dates: string[];
}

interface RentalPeriodDisplayInfo {
  startFormatted: string;
  endFormatted: string;
}

export function SchedulingDetails() {
  const theme = useTheme();
  const navigation = useNavigation<any>();

  const [isLoading, setIsLoading] = useState(false);
  const [rentalPeriodDisplayInfo, setRentalPeriodDisplayInfo] = useState<RentalPeriodDisplayInfo>({} as RentalPeriodDisplayInfo)

  // useRoute is responsible to retrieve params 
  const route = useRoute();
  const { car, dates } = route.params as Params;

  // Same-day rental means 1 day. Form today to tomorrow also means 1 day
  const rentTotal = Number(dates.length === 1 ? dates.length * car.rent.price : (dates.length -1) * car.rent.price)


  async function handleSchedulingComplete() {
    // setIsLoading(true)

    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ];

    await api.post(`/schedules_byuser`, {
      user_id: 1,
      car,
      startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })

    await api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    })
    .then(response => {
      setIsLoading(false);
      navigation.navigate('Confirmation', {
        nextScreen: 'Home',
        title: 'Carro alugado',
        message: `Agora você so precisa ir\naté a concecionaria da RENTALX\npegar o seu automóvel.`,
      });
    })
    .catch(() => {
      setIsLoading(false);
      Alert.alert('Nao foi possível confirmar a sua reserva.');
    })
  }

  useEffect(() => {
    setRentalPeriodDisplayInfo({
      startFormatted: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })
  }, [])

  return (
    <Container>
      <StatusBar 
        barStyle='dark-content'
        translucent
        backgroundColor='tranparent'
      />
      <Header>
        <BackButton onPress={() => navigation.goBack()} />
      </Header>
      <CarImages>
        <ImageSlider 
            imageUrls={car.photos}
        />
      </CarImages>

      <Contents>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory 
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather 
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{rentalPeriodDisplayInfo.startFormatted}</DateValue>
          </DateInfo>

          <Feather 
              name="chevron-right"
              size={RFValue(24)}
              color={theme.colors.shape}
          />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>{rentalPeriodDisplayInfo.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.rent.price} x {dates.length === 1 ? dates.length : dates.length -1}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Contents>

      <Footer>
        <Button 
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleSchedulingComplete}
          enabled={!isLoading}
          isLoading={isLoading}
        />
      </Footer>

    </Container>
  );
}