import React from 'react';
import { FlatList } from 'react-native';

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,

} from './styles';

interface Props {
  imageUrls: string[];
}

export function ImageSlider({ imageUrls }: Props) {
  return (
    <Container>
      <ImageIndexes>
        {
          imageUrls.map((_, index) => (  // SAME AS (item, index) when item is not required
            <ImageIndex 
              key={String(index)}
              active={true} 
            />
          ))
        }
      </ImageIndexes>
      
      <FlatList 
        data={imageUrls}
        keyExtractor={key => key}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage 
              source={{ uri: item }}
              resizeMode="contain"
            />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      
    </Container>
  );
}