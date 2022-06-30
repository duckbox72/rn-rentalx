import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { OkButton } from '../../components/OkButton';

import {
  Container,
  Contents,
  Title,
  Message,
  Footer,
  
} from './styles';

interface Params{
  title: string;
  message: string;
  nextScreen: string;
}

export function Confirmation() {
  const { width } = useWindowDimensions();

  const navigation = useNavigation<any>();
  const route = useRoute();
  const { title, message, nextScreen } = route.params as Params;

  function handleBackHome() {
    navigation.navigate(nextScreen)
  }

  return (
    <Container>
      <StatusBar 
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
      />

      <LogoSvg width={width}  />

      <Contents>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>
          {message}
        </Message>
      </Contents>

      <Footer>
        <OkButton 
          title='OK'
          onPress={handleBackHome}
        />
      </Footer>

    </Container>
  );
}