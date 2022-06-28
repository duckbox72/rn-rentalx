import React, { useState } from 'react';  
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { BorderlessButton } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';

import { 
  Container,
  IconContainer,
  InputText,
} from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export function PasswordInput({
  iconName,
  ...rest
}: Props) {

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const theme = useTheme();

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <Container>
      <IconContainer>
        <Feather 
          name={iconName}
          size={24}
          color={theme.colors.text_detail}
        />
      </IconContainer>

      <InputText  
        {...rest}
        secureTextEntry={isPasswordVisible}
      />
      
      <TouchableOpacity onPress={handlePasswordVisibilityChange}>
        <IconContainer>
          <Feather 
            name={isPasswordVisible? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </TouchableOpacity>
    </Container>
  );
}