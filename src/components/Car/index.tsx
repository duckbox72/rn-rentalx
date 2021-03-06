import React from 'react';
import { GestureHandlerRootView, RectButtonProps } from 'react-native-gesture-handler';

import GasolineSvg from '../../assets/gasoline.svg';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,

} from './styles';



interface Props extends RectButtonProps {
  data: CarDTO;
}

export function Car({ data, ...rest }: Props) {
  const MotorIcon = getAccessoryIcon(data.fuel_type) 

  return (
    <GestureHandlerRootView>
      <Container {...rest}>
        <Details>
          <Brand>{data.brand}</Brand>
          <Name>{data.name}</Name>

          <About>
            <Rent>
              <Period>{data.period}</Period>
              <Price>{`RS${data.price}`}</Price>
            </Rent>

            <Type>
              <MotorIcon />
            </Type>
          </About>
        </Details>

        <CarImage 
          source={{ uri: data.thumbnail }}
          resizeMode='contain'
        /> 
      </Container>
    </GestureHandlerRootView>
  );
}