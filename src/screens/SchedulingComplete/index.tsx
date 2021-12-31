import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {
  Container,
  Contents,
  Title,
  Message,
  Footer,
  
} from './styles';
import { OkButton } from '../../components/OkButton';

export function SchedulingComplete() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>();

  function handleBackHome() {
    navigation.navigate('Home')
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
        <Title>Carro Alugado!</Title>

        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel.
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