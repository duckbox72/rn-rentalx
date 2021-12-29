import React from 'react';
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
  About,
  Accessories,
  Footer,
} from './styles';

export function CarDetails() {
  return (
    <Container>
      
      <Header>
        <BackButton onPress={() => {}} />
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

        <About>
          Este é automóvel desportivo. Surgiu do lendário
          touro de lide indultado na praça Real Maestranza de Sevilla. 
          É um belíssimo carro para quem gosta de acelerar.
        </About>
      </Contents>

      <Footer>
        <Button title="Confirmar"/>
      </Footer>

    </Container>
  );
}