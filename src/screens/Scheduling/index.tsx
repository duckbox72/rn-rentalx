import React, { useState } from 'react';
import { StatusBar } from 'react-native'; 
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar';

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
  const navigation = useNavigation<any>();

  const [lastSelectedDate, setLastSelectedDate] = useState({} as DayProps)
  const [markedDates, setMarkedDates] = useState({} as MarkedDateProps)


  function handleSchedulingDetails() {
    navigation.navigate('SchedulingDetails');
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);
  }

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
        <Calendar 
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Contents>

      <Footer>
        <Button 
          title="Confirmar"
          onPress={handleSchedulingDetails}
        />
      </Footer>
    </Container>
  );
}