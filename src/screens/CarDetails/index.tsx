import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';


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
  About,
  Accessories,
  Footer,
} from './styles';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface Params { 
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation<any>();
  // useRoute is responsible to retrieve params 
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car });
  }

  return (
    <Container>

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

        <About>{car.about}</About>
      </Contents>

      <Footer>
        <Button 
          title="Escolher período do aluguel" 
          onPress={handleConfirmRental}
        />
      </Footer>

    </Container>
  );
}