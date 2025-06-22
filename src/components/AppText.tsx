import React from 'react';
import {Text, TextStyle} from 'react-native';

interface AppTextProps {
  children: React.ReactNode;
  size?: number;
  weight?: 'normal' | 'bold' | '600' | '400' | '500' | '700';
  color?: string;
  style?: TextStyle;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  numberOfLines?: number;
}

const AppText: React.FC<AppTextProps> = ({
  children,
  size = 16,
  weight = 'normal',
  color = '#000',
  style,
  align = 'left',
  numberOfLines,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          fontSize: size,
          fontWeight: weight,
          color,
          textAlign: align,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default AppText;
