import React from 'react';
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
}

export function Button({
  title,
  color,
  enabled = true,
  ...rest
}: Props) {
  return (
    <GestureHandlerRootView>
      <Container 
        {...rest} 
        color={color? color : theme.colors.main}
        enabled={enabled}
        style={{ opacity: enabled ? 1 : 0.5}}
      >
        <Title>{title}</Title>
      </Container>
    </GestureHandlerRootView>
  );
}