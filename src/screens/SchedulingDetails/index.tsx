import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import SpeedSvg from '../../assets/speed.svg';
import AccelerationSvg from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';

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
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { SchedulingComplete } from '../SchedulingComplete';


export function SchedulingDetails() {
  const theme = useTheme();
  const navigation = useNavigation<any>();

  function handleSchedulingComplete() {
    navigation.navigate('SchedulingComplete')
  }

  return (
    <Container>
      
      <Header>
        <BackButton onPress={() => navigation.goBack()} />
      </Header>
      <CarImages>
        <ImageSlider 
            imageUrls={['https://www.pnglib.com/wp-content/uploads/2020/01/lamborghini-huracan-download_5e136d1510ee4.png'] }
        />
      </CarImages>

      <Contents>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory 
            name="380Km/h"
            icon={SpeedSvg}
          />
          <Accessory 
            name="3.2s"
            icon={AccelerationSvg}
          />
          <Accessory 
            name="800 HP"
            icon={ForceSvg}
          />
          <Accessory 
            name="Gasolina"
            icon={GasolineSvg}
          />
          <Accessory 
            name="Auto"
            icon={ExchangeSvg}
          />
          <Accessory 
            name="2 pessoas"
            icon={PeopleSvg}
          />
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
            <DateValue>29/12/2021</DateValue>
          </DateInfo>

          <Feather 
              name="chevron-right"
              size={RFValue(24)}
              color={theme.colors.shape}
          />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>30/12/2021</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$580 x 2 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 1160</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Contents>

      <Footer>
        <Button 
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleSchedulingComplete}
        />
      </Footer>

    </Container>
  );
}