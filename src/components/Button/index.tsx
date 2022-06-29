import React from 'react';
import { ActivityIndicator } from 'react-native';
import { GestureHandlerRootView, RectButtonProps } from 'react-native-gesture-handler';
import theme from '../../styles/theme';

import {
  Container,
  Title,
} from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  isLoading?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  isLoading = false,
  light = false,
  ...rest
}: Props) {
  return (
    <GestureHandlerRootView>
      <Container 
        {...rest} 
        color={color? color : theme.colors.main}
        enabled={enabled}
        style={{ opacity: !enabled || isLoading ? .5 : 1}}
      >
        { isLoading 
          ? <ActivityIndicator color={theme.colors.shape}/>
          : <Title light={light}>{title}</Title>
        }
      </Container>
    </GestureHandlerRootView>
  );
}