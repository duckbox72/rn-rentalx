import React from 'react';
import { StatusBar } from 'react-native'; 
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg'

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Contents,
  Footer,

} from './styles';


export function Scheduling() {
  const theme = useTheme();

  return (
    <Container>
      <StatusBar 
        barStyle='light-content' // ANDROID
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <BackButton 
          onPress={() => {}} 
          color={theme.colors.shape} 
        />
    
        <Title>
          Escolha uma {'\n'}
          data de inicio e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}>
              29/12/2021
            </DateValue>
          </DateInfo>
      
          <ArrowSvg />
        
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}>
              31/12/2021
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      
      </Header>

      <Contents>
        <Calendar />
      </Contents>

      <Footer>
        <Button 
          title="Confirmar"
        />
      </Footer>
    </Container>
  );
}