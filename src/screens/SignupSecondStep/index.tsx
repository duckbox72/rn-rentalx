import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
 } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { api } from '../../services/api';
import { BackButton } from '../../components/BackButton';
import { Bullet } from '../../components/Bullet';
import { Button } from '../../components/Button';
import { PasswordInput } from '../../components/PasswordInput';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export function SignupSecondStep() {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation<any>();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if(!password || !confirmPassword) {
      return Alert.alert('Opa', 'Preencha os campos de senha');
    }

    if(password !== confirmPassword) {
      return Alert.alert('Opa', 'As senhas não conferem');
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password,
    })
    .then(() => {
      navigation.navigate('Confirmation', {
        nextScreen: 'SignIn',
        title: 'Cadastro concluído',
        message: `Agora é só fazer login\ne aproveitar.`,
      }); 
    })
    .catch((error) => {
      console.log(error)
      Alert.alert('Opa', 'Erro no cadastro, tente novamente.');
    }); 
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack}/>
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>
          
          <Title>
            Crie sua {'\n'}conta
          </Title>
          <SubTitle>
            Faça seu cadastro de {'\n'}
            forma rápida e fácil.
          </SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput 
              iconName='lock'
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput 
              iconName='lock'
              placeholder="Repita a senha"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </Form>
          <Button 
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}