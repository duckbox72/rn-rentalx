import React from 'react';
import { ActivityIndicator } from 'react-native';
import { GestureHandlerRootView, RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

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
  enabled = true,
  isLoading = false,
  light = false,
  ...rest
}: Props) {
  const theme = useTheme();

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