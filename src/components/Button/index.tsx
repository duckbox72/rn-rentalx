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
  enabled?: boolean;
  isLoading?: boolean;
}

export function Button({
  title,
  color,
  enabled = true,
  isLoading = false,
  ...rest
}: Props) {
  return (
    <GestureHandlerRootView>
      <Container 
        {...rest} 
        color={color? color : theme.colors.main}
        enabled={enabled}
        style={{ opacity: enabled || !isLoading ? 1 : 0.5}}
      >
        { isLoading 
          ? <ActivityIndicator color={theme.colors.shape}/>
          : <Title>{title}</Title>
        }
      </Container>
    </GestureHandlerRootView>
  );
}