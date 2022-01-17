import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native'; 
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns/esm';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar';
import ArrowSvg from '../../assets/arrow.svg'

import { getPlatformDate } from '../../utils/getPlatformDate';
import { CarDTO } from '../../dtos/CarDTO';

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


interface RentalPeriodDisplayInfo {
  startFormatted: string;
  endFormatted: string;
}

interface Params { 
  car: CarDTO;
}

export function Scheduling() {
  const theme = useTheme();
  const navigation = useNavigation<any>();

  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps)
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
  const [rentalPeriodDisplayInfo, setRentalPeriodDisplayInfo] = useState<RentalPeriodDisplayInfo>({} as RentalPeriodDisplayInfo)

  // useRoute is responsible to retrieve params 
  const route = useRoute();
  const { car } = route.params as Params;

  function handleSchedulingDetails() {
    if ( !rentalPeriodDisplayInfo.startFormatted || !rentalPeriodDisplayInfo.endFormatted) {
      Alert.alert('Selecione o intervalo do aluguel.');
    } else {
      navigation.navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDates),
      });
    }
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

    const firstDate = Object.keys(interval)[0];
    const lastDate = Object.keys(interval)[Object.keys(interval).length -1];

    setRentalPeriodDisplayInfo({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(lastDate)), 'dd/MM/yyyy'),
    })
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
            <DateValue selected={!!rentalPeriodDisplayInfo.startFormatted}>
              {rentalPeriodDisplayInfo.startFormatted}
            </DateValue>
          </DateInfo>
      
          <ArrowSvg />
        
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriodDisplayInfo.endFormatted}>
              {rentalPeriodDisplayInfo.endFormatted}
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