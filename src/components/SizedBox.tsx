import React from 'react';
import {View} from 'react-native';

const SizedBox = ({
  height,
  width,
}: {
  height?: number;
  width?: number;

}) => {
  return (
    <View style={{height, width}} />
  );
};

export default SizedBox;

