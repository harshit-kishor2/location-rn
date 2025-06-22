import React, {ReactNode} from 'react';
import {
  DimensionValue,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface ContainerProps {
  useSafeArea?: boolean;
  children: ReactNode;
  backgroundColor?: string;
  statusBarColor?: string;
  padding?: DimensionValue;
  paddingHorizontal?: DimensionValue;
  margin?: DimensionValue;
  style?: ViewStyle;
}
const Container: React.FC<ContainerProps> = ({
  useSafeArea = true,
  children,
  statusBarColor,
  padding = 0,
  backgroundColor = '#fff',
  paddingHorizontal,
  margin = 0,
  style,
}: ContainerProps) => {
  // Change bar style according to theme
  const ContainerTag = useSafeArea ? SafeAreaView : View;
  return (
    <ContainerTag
      style={StyleSheet.flatten([
        styles.container,
        {
          backgroundColor,
          padding,
          margin,
          paddingHorizontal: paddingHorizontal,
        },
        style,
      ])}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={statusBarColor}
      />
      {children}
    </ContainerTag>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
